/**
 * xr8-three-bootstrap.js
 *
 * Shared bootstrap for raw Three.js r178 + XR8 image tracking.
 *
 * Architecture:
 *   - XR8 renders camera feed on the original <canvas>
 *   - Three.js renders 3D on a separate transparent canvas on top
 *   - XR8 pipeline provides camera pose + image-target data each frame
 */

import * as THREE from "three";

// ---------------------------------------------------------------------------
// Loading overlay
// ---------------------------------------------------------------------------

function createLoadingOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "xr8-loading";
  overlay.innerHTML = `
    <style>
      #xr8-loading {
        position: fixed; inset: 0; z-index: 9999;
        background: #000; color: #fff;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      }
      #xr8-loading .spinner {
        width: 40px; height: 40px; margin-bottom: 16px;
        border: 3px solid rgba(255,255,255,0.2);
        border-top-color: #fff; border-radius: 50%;
        animation: xr8spin 0.8s linear infinite;
      }
      @keyframes xr8spin { to { transform: rotate(360deg); } }
    </style>
    <div class="spinner"></div>
    <div>Loading AR&hellip;</div>
  `;
  document.body.appendChild(overlay);
  return overlay;
}

function removeLoadingOverlay() {
  const el = document.getElementById("xr8-loading");
  if (el) el.remove();
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Apply an XR8 image-target pose to a Three.js Object3D.
 */
export function applyTargetPose(obj, detail) {
  const { position, rotation, scale } = detail;
  obj.position.set(position.x, position.y, position.z);
  obj.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
  obj.scale.set(scale, scale, scale);
}

/**
 * Create a shadow-casting directional light meant to be added to a target group.
 * Because it lives inside the group, it transforms with the image target automatically.
 */
export function createShadowLight(opts = {}) {
  const {
    color = 0xfff5e0,
    intensity = 1.0,
    position = [2, 4, 2],
    mapSize = 1024,
    frustum = 10,
    bias = -0.002,
  } = opts;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(...position);
  light.castShadow = true;
  light.shadow.mapSize.set(mapSize, mapSize);
  light.shadow.camera.near = 0.01;
  light.shadow.camera.far = 50;
  light.shadow.camera.left = -frustum;
  light.shadow.camera.right = frustum;
  light.shadow.camera.top = frustum;
  light.shadow.camera.bottom = -frustum;
  light.shadow.bias = bias;
  return light;
}

// ---------------------------------------------------------------------------
// startXR8
// ---------------------------------------------------------------------------

export async function startXR8(config) {
  const {
    canvas,
    imageTargets = [],
    disableWorldTracking = true,
    onImageFound,
    onImageUpdated,
    onImageLost,
    onRenderLoop,
  } = config;

  createLoadingOverlay();

  const state = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.01,
      1000,
    ),
    renderer: null,
    clock: new THREE.Clock(),
    sun: null,
  };

  // Track active image targets for found/lost detection
  const activeTargets = new Set();
  const _vec3 = new THREE.Vector3();
  const _quat = new THREE.Quaternion();

  // ------ Three.js pipeline module ------
  const threejsModule = {
    name: "custom-threejs",

    onStart: () => {
      // Separate canvas for Three.js — avoids GL context conflicts with XR8
      const threeCanvas = document.createElement("canvas");
      threeCanvas.id = "three-canvas";
      threeCanvas.style.cssText =
        "position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:1;";
      document.body.appendChild(threeCanvas);

      state.renderer = new THREE.WebGLRenderer({
        canvas: threeCanvas,
        alpha: true,
        antialias: true,
      });
      state.renderer.setClearColor(0x000000, 0);
      state.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
      state.renderer.setSize(window.innerWidth, window.innerHeight, false);

      // Enable shadows
      state.renderer.shadowMap.enabled = true;
      state.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // Natural lighting: soft ambient + directional sun with shadows
      const hemi = new THREE.HemisphereLight(0xddeeff, 0x332211, 0.6);
      state.scene.add(hemi);

      // Shadow light lives at scene level (always visible, never toggled
      // by group.visible) so shadows survive lost/re-found cycles.
      state.sun = new THREE.DirectionalLight(0xfff5e0, 1.0);
      state.sun.position.set(2, 4, 2);
      state.sun.castShadow = true;
      state.sun.shadow.mapSize.set(1024, 1024);
      state.sun.shadow.camera.near = 0.01;
      state.sun.shadow.camera.far = 50;
      state.sun.shadow.camera.left = -5;
      state.sun.shadow.camera.right = 5;
      state.sun.shadow.camera.top = 5;
      state.sun.shadow.camera.bottom = -5;
      state.sun.shadow.bias = -0.005;
      state.scene.add(state.sun);
      state.scene.add(state.sun.target);

      removeLoadingOverlay();
    },

    onUpdate: ({ processCpuResult }) => {
      if (!processCpuResult) return;

      const realitySource = processCpuResult.reality;
      if (realitySource) {
        const { rotation, position, intrinsics } = realitySource;

        if (rotation) {
          state.camera.quaternion.set(
            rotation.x,
            rotation.y,
            rotation.z,
            rotation.w,
          );
        }
        if (position) {
          state.camera.position.set(position.x, position.y, position.z);
        }
        // Only apply intrinsics when all values are finite
        if (intrinsics && !intrinsics.some((v) => !Number.isFinite(v))) {
          state.camera.projectionMatrix.fromArray(intrinsics);
          state.camera.projectionMatrixInverse
            .copy(state.camera.projectionMatrix)
            .invert();
        }

        // --- Image targets from detectedImages (per-frame, continuous) ---
        const detected = realitySource.detectedImages;
        if (detected) {
          const currentNames = new Set();

          for (const img of detected) {
            currentNames.add(img.name);
            if (!activeTargets.has(img.name)) {
              // Newly found
              activeTargets.add(img.name);
              if (onImageFound) onImageFound(img);
            } else {
              // Still tracking
              if (onImageUpdated) onImageUpdated(img);
            }
          }

          // Check for lost targets
          for (const name of activeTargets) {
            if (!currentNames.has(name)) {
              activeTargets.delete(name);
              if (onImageLost) onImageLost({ name });
            }
          }

          // Move scene-level shadow light to follow first tracked target
          if (state.sun && detected.length > 0) {
            const img = detected[0];
            const p = img.position;
            const q = _quat.set(
              img.rotation.x,
              img.rotation.y,
              img.rotation.z,
              img.rotation.w,
            );
            const offset = _vec3
              .set(1, 3, 1)
              .applyQuaternion(q)
              .multiplyScalar(img.scale);
            state.sun.position.set(
              p.x + offset.x,
              p.y + offset.y,
              p.z + offset.z,
            );
            state.sun.target.position.set(p.x, p.y, p.z);
            state.sun.target.updateMatrixWorld();
          }
        }
      }

      if (onRenderLoop) {
        const delta = state.clock.getDelta();
        onRenderLoop(state, delta);
      }
    },

    onCanvasSizeChange: () => {
      if (!state.renderer) return;
      state.renderer.setSize(window.innerWidth, window.innerHeight, false);
      state.camera.aspect = window.innerWidth / window.innerHeight;
      state.camera.updateProjectionMatrix();
    },

    onRender: () => {
      state.renderer.render(state.scene, state.camera);
    },

    onException: (error) => {
      removeLoadingOverlay();
      console.error("[XR8] Exception:", error);
    },
  };

  // ------ Image target pipeline module (listener fallback) ------
  const imageTargetModule = {
    name: "image-target-events",
    listeners: [
      {
        event: "reality.imagefound",
        process: ({ detail }) => {
          if (detail && !activeTargets.has(detail.name)) {
            activeTargets.add(detail.name);
            if (onImageFound) onImageFound(detail);
          }
        },
      },
      {
        event: "reality.imageupdated",
        process: ({ detail }) => {
          if (detail && onImageUpdated) onImageUpdated(detail);
        },
      },
      {
        event: "reality.imagelost",
        process: ({ detail }) => {
          if (detail) {
            activeTargets.delete(detail.name);
            if (onImageLost) onImageLost(detail);
          }
        },
      },
    ],
  };

  // ------ Wait for XR8 engine ------
  await new Promise((resolve) => {
    if (window.XR8) return resolve();
    window.addEventListener("xrloaded", resolve);
  });

  // ------ Configure & run ------
  XR8.addCameraPipelineModule(XR8.GlTextureRenderer.pipelineModule());
  XR8.addCameraPipelineModule(threejsModule);
  XR8.addCameraPipelineModule(imageTargetModule);
  XR8.addCameraPipelineModule(XR8.XrController.pipelineModule());

  XR8.XrController.configure({
    disableWorldTracking,
    imageTargetData: imageTargets,
  });

  // Size the XR8 canvas before run() so intrinsics use the correct aspect ratio
  const dpr = Math.min(window.devicePixelRatio, 1);
  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);

  XR8.run({ canvas });

  return state;
}

export class XR83Image extends THREE.Mesh {
  constructor(texture, opts = {}) {
    super(
      new THREE.PlaneGeometry(1.5, 1.5),
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
      }),
    );

    this.position.set(0, 0.3, 0);
    this.visible = false;
  }

  onImageFound(detail) {
    applyTargetPose(detail.metadata.entity, detail);
    detail.metadata.entity.visible = true;
  }

  onImageUpdated(detail) {
    applyTargetPose(detail.metadata.entity, detail);
  }

  onImageLost(detail) {
    detail.metadata.visible = false;
  }
}

class XR83Video {
  constructor() {}
}
