# Introduction

In this tutorial, we will guide you step by step to create a simple Augmented Reality (AR) web app.

https://github.com/user-attachments/assets/f4b1f979-b22c-443c-ae03-740b0111a7f0

The goal is to understand the full technical workflow to bring a web project to life. We will also see how to write data onto RFID chips.

We will use:
- **A-Frame**: an open-source web framework to create VR/AR experiences.
- **AR.js**: a JavaScript library to add AR features to web apps.

Our first goal is to display the text "Hello" above a barcode-type AR marker, and then customize the content.

This mini-project also includes making a physical tag / keychain.

<div align="center">
  <img src="ressources/markup_1000019121.png" alt="text displayed in ar" width="45%" height="400"/>
  <img src="ressources/markup_1000019122.png" alt="3d model displayed in ar" width="45%" height="400"/>
</div>

We will use several free tools:
- **GitHub**: to host your code and manage versions for free.
- **Visual Studio Code (VS Code)**: a code editor that connects to GitHub to track code changes.
- **NFC Tools**: a mobile app for Android/iOS to write data onto our RFID sticker.

---

# Prerequisites

- A GitHub account
- A Gmail account
- A computer
- A code editor: [Visual Studio Code](https://code.visualstudio.com/)
- A web browser (Chrome, Firefox, etc.) on both your computer and smartphone

---

# Provided Materials

- A small wooden cardboard square with rounded corners
- A matte vinyl cut-out sticker
- A small metal cable with a screw fastener
- A small RFID chip

<div align="center"> 
  <img src="ressources/PXL_20240912_065600761.jpg" alt="photo of all the elements" width="75%" />
</div>

### Assembly:
1. Stick the vinyl marker on the front of the wooden square (inside the engraved outline).
2. Stick the RFID chip centered on the back.
3. Unscrew the cable clasp and thread it through the hole.

That’s it! You are ready for the digital part.

More info on fabrication:
- [Vinyl sticker cutting guide](https://github.com/LucieMrc/SilhouetteCameo_2spi)
- [Laser cutting guide](https://github.com/b2renger/Introduction_Laser_Beambox)

📽️ **Speedrun video (under 10 minutes):**
https://github.com/user-attachments/assets/0d7ed300-bff6-4171-a3a7-28d8e4be6978

---

# Step 1: Create a GitHub Account and Repository

1. **Sign up**: Go to https://github.com/signup and create an account.
   > ⚠️ **Choose a short username** without spaces or special characters/accents. It will be part of your website URL!

<div align="center"> 
  <img src="ressources/Capture_signup_github.png" alt="signup github page" width="49%" height="400"/>
  <img src="ressources/Capture_login_github.png" alt="login github page" width="49%" height="400"/>
</div>

2. **Create a repository**:
   - Click **"New repository"**.
   - Name it (e.g., `microProjetAr`).
   - Check **"Add a README file"**.
   - Click **"Create repository"**.

<div align="center"> 
<img src="ressources/Capture_github_newRepo.png" alt="menu to create new repo" width="75%" />
</div>
<br/>
<div align="center"> 
<img src="ressources/Capture_github_newRepoCreation..png" alt="menu to create new repo" width="75%" />
</div>

---

# Step 2: Enable GitHub Pages

We will configure GitHub Pages so GitHub serves your website at:  
`https://[your-username].github.io/[your-repo-name]`

1. In your repository, go to **Settings** > **Pages**.
<div align="center"> 
<img src="ressources/Capture_github_settings.png" alt="menu to access gh-pages settings" width="75%" />
</div>
<br/>
<div align="center"> 
<img src="ressources/Capture_github_settings_pages.png" alt="Pages menu to access gh-pages settings" width="75%" />
</div>

2. Under **Branch**, select `main` (or root) and click **Save**.
<div align="center"> 
<img src="ressources/Capture_github_settings_pages_activate.png" alt="activate gh-pages" width="75%" />
</div>

After a few minutes, your site will be live!

<div align="center"> 
<img src="ressources/Capture_github_settings_pages_done.png" alt="gh-pages settings done" width="75%" />
</div>

---

# Step 3: Set up Visual Studio Code

1. Download and install [VS Code](https://code.visualstudio.com/).
2. Download your repository zip from GitHub:
<div align="center"> 
<img src="ressources/image-25.png" alt="download repo" width="75%" />
</div>

3. Unzip the folder. Make sure not to have a nested folder with the same name.
4. Open it in VS Code via **File > Open Folder**.
5. If VS Code asks if you trust the authors, select **Yes**.

> [!TIP]
> Keep your project in an organized folder rather than directly on your Desktop or in Downloads.

6. Install the **Live Server** extension from the Extensions tab in VS Code.

<div align="center"> 
<img src="ressources/image-7.png" alt="extension menu" width="75%" />
</div>
<div align="center"> 
<img src="ressources/image-8.png" alt="install live server" width="75%" />
</div>

---

# Step 4: Create the Webpage

1. In VS Code, create a file named **`index.html`**.
2. Paste the following code:

```html
<!doctype html>
<html>
<head>
    <title>MicroProjetAR</title>
    <script src="https://aframe.io/releases/1.3.0/aframe.min.js"></script>
    <script src="https://raw.githack.com/AR-js-org/AR.js/3.4.5/aframe/build/aframe-ar.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/eruda"></script>
    <script type="module" src="https://raw.githack.com/b2renger/microprojetar/main/lib/qrTunnel.js"></script>
</head>

<body style="margin: 0px; overflow: hidden;">
    <a-scene embedded
        arjs="sourceType: webcam; detectionMode: mono_and_matrix; matrixCodeType: 3x3; trackingMethod: best; changeMatrixMode: modelViewMatrix;"
        vr-mode-ui="enabled: false"
        renderer="sortObjects: true; antialias: true; colorManagement: true; physicallyCorrectLights; logarithmicDepthBuffer: true;"
        smooth="true" smoothCount="5" smoothTolerance=".05" smoothThreshold="5" sourceWidth="800" sourceHeight="600"
        displayWidth="1280" displayHeight="720">

        <a-marker type="barcode" value="0">
            <a-text value="Hello !" side="double" position="0 0 -1" rotation="270 0 0" width="8" color="red" align="center">
            </a-text>
        </a-marker>

        <a-entity camera></a-entity>
    </a-scene>
</body>
</html>
```

---

# Step 5: Understanding the Code

- `<head>`: Loads A-Frame (3D/AR engine), AR.js (marker tracking), Eruda (mobile console debugger), and qrTunnel.
- `<a-scene>`: Sets up the AR camera and scene properties.
- `<a-marker type='barcode' value='0'>`: Looks for the matrix barcode marker `0`. Anything inside this tag appears on top of the marker.
- `<a-text>`: Displays 3D text ("Hello !") over the marker with specified color, position, and rotation.
- `<a-entity camera>`: Represents the user's camera.

---

# Step 6: Test on Computer

1. Save `index.html`.
2. Press `Ctrl + Shift + P` (or `Cmd + Shift + P` on Mac).
3. Type `Live Server: Open with Live Server` and press Enter.
4. Your default browser will open displaying your AR web app.

---

# Step 7: Publish Online

1. Go to your GitHub repository page.
2. Click **Add file > Upload files**.
3. Drag and drop all your project files (including `index.html`).
4. Click **Commit changes**.

Your AR experience is now live at:  
`https://[your-username].github.io/[your-repo]`

---

# Step 8: Program the RFID Sticker

Use **NFC Tools** ([Android](https://play.google.com/store/apps/details?id=com.wakdev.wdnfc&hl=fr) / [iOS](https://apps.apple.com/fr/app/nfc-tools/id1252962749)):

1. Open the app and go to the **Write** tab.
2. Tap **Add a record** > **URL / URI**.
3. Paste your GitHub Pages URL and confirm.
4. Tap **Write** and bring your phone close to the RFID chip until confirmed.

Now scanning the keychain with a smartphone opens your AR page directly!

---

# Going Further: Custom Assets

Download sample assets (image, 3D model, video) here:  
[assets.zip](https://github.com/b2renger/microprojetar/releases/download/v1.1/assets.zip)

### Recommended Formats & Sizes:
- **Images**: PNG or JPEG (max 1920x1080, < 5 MB)
- **3D Models**: `.glb` (exported from Blender)
- **Videos**: MP4 (H.264 video codec)

Create an `assets/` folder in your project and place your files there.

---

### Example: Displaying an Image

```html
<!doctype html>
<html>
<head>
    <title>AR Image</title>
    <script src="https://aframe.io/releases/1.3.0/aframe.min.js"></script>
    <script src="https://raw.githack.com/AR-js-org/AR.js/3.4.5/aframe/build/aframe-ar.js"></script>
</head>
<body style="margin: 0px; overflow: hidden;">
    <a-scene embedded arjs="sourceType: webcam; detectionMode: mono_and_matrix; matrixCodeType: 3x3;">
        <a-marker type="barcode" value="0">
            <a-image src="./assets/your-image.png" width="1" height="1" rotation="270 0 0"></a-image>
        </a-marker>
        <a-entity camera></a-entity>
    </a-scene>
</body>
</html>
```

---

### Example: Displaying a 3D Model (.glb)

```html
<!DOCTYPE html>
<html>
<head>
    <title>AR 3D Model</title>
    <script src="https://aframe.io/releases/1.6.0/aframe.min.js"></script>
    <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
</head>
<body>
    <a-scene embedded arjs="sourceType: webcam; detectionMode: mono_and_matrix; matrixCodeType: 3x3;">
        <a-marker type="barcode" value="0">
            <a-entity scale="0.1 0.1 0.1" gltf-model="./assets/plant_modelling.glb"></a-entity>
        </a-marker>
        <a-entity camera></a-entity>
    </a-scene>
</body>
</html>
```

---

### Example: Playing a Video (with Chroma Key / Green Screen Support)

```html
<!DOCTYPE html>
<html>
<head>
    <title>AR Video</title>
    <script src="https://aframe.io/releases/1.6.0/aframe.min.js"></script>
    <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
    <script defer>
      AFRAME.registerShader("chromakey", {
        schema: {
          src: { type: "map" },
          color: { default: { x: 0.0, y: 1.0, z: 0.0 }, type: "vec3", is: "uniform" },
          chroma: { type: "bool", is: "uniform" },
          transparent: { default: true, is: "uniform" },
        },
        init: function (data) {
          const videoEl = data.src;
          document.addEventListener("click", () => { videoEl.play(); });

          var videoTexture = new THREE.VideoTexture(data.src);
          videoTexture.minFilter = THREE.LinearFilter;
          this.material = new THREE.ShaderMaterial({
            uniforms: {
              chroma: { type: "b", value: data.chroma },
              color: { type: "c", value: data.color },
              myTexture: { type: "t", value: videoTexture },
            },
            vertexShader: `
              varying vec2 vUv;
              void main(void) {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              uniform sampler2D myTexture;
              uniform vec3 color;
              uniform bool chroma;
              varying vec2 vUv;
              void main(void) {
                vec3 tColor = texture2D(myTexture, vUv).rgb;
                float a = chroma ? (length(tColor - color) - 0.5) * 7.0 : 1.0;
                gl_FragColor = vec4(tColor, a);
              }
            `,
          });
        },
        update: function (data) {
          this.material.color = data.color;
          this.material.src = data.src;
          this.material.transparent = data.transparent;
        },
      });

      AFRAME.registerComponent("vidhandler", {
        init: function () {
          this.trackedElements = document.querySelectorAll("a-marker[vidhandler]");
        },
        tick: function () {
          this.trackedElements.forEach((marker) => {
            const vid = document.querySelector(marker.attributes.vidreference.value);
            if (marker.object3D.visible) {
              if (vid && vid.paused) vid.play();
            }
          });
        },
      });
    </script>
</head>

<body>
    <a-scene embedded arjs="sourceType: webcam; detectionMode: mono_and_matrix; matrixCodeType: 3x3;">
      <a-assets>
        <video id="vid" src="assets/video.mp4" autoplay loop preload="auto" muted playsinline webkit-playsinline></video>
      </a-assets>

      <a-marker vidhandler vidreference="#vid" type="barcode" value="0">
        <a-entity
          material="shader: chromakey; src: #vid; chroma: false; color: 0. 0. 0."
          geometry="primitive: plane; width: 1.05; height: 1.05"
          position="0 0 0"
          rotation="270 0 0"
          side="double">
        </a-entity>
      </a-marker>

      <a-entity camera></a-entity>
    </a-scene>
</body>
</html>
```