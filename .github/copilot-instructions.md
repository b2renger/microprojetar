# MicroProjetAR - WebAR Tutorial Project

MicroProjetAR is a French educational web application demonstrating augmented reality (AR) using A-Frame and AR.js. The project includes HTML files that create AR experiences with both text and 3D models triggered by barcode markers.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Run
- No build steps required - this is a static web application
- Start local development server:
  - `cd /home/runner/work/microprojetar/microprojetar`
  - `python3 -m http.server 8000 --bind 0.0.0.0` -- starts in under 5 seconds, NEVER CANCEL
- Access the application at `http://localhost:8000/`
- The server starts immediately and serves static files with no compilation time

### Project Structure
- `index.html` - Main AR experience with text display ("Hello !") on barcode marker 0
- `index3D.html` - 3D model AR experience with plant_modelling.glb on barcode marker 2  
- `assets/plant_modelling.glb` - 3D model file (264KB glTF binary)
- `ressources/` - Tutorial images and documentation assets
- `.idx/dev.nix` - Firebase Studio IDE configuration for Node.js 20 and Python 3
- `README.md` - Comprehensive French tutorial documentation

### Dependencies
- External CDN dependencies (no local installation required):
  - A-Frame 1.3.0: `https://aframe.io/releases/1.3.0/aframe.min.js`
  - AR.js 3.4.5: `https://raw.githack.com/AR-js-org/AR.js/3.4.5/aframe/build/aframe-ar.js`
- Both dependencies are publicly accessible and load in web browsers

## Validation

### Manual Testing Requirements
- ALWAYS test both AR experiences after making changes:
  1. Test `index.html`: Load in browser, should show camera feed and display "Hello !" text when barcode marker 0 is detected
  2. Test `index3D.html`: Load in browser, should show camera feed and display 3D plant model when barcode marker 2 is detected
- Test the HTTP server serves files correctly:
  - `curl -s http://localhost:8000/ | grep "<title>"` should return `<title>MicroProjetAR</title>`
  - `curl -s http://localhost:8000/assets/plant_modelling.glb | wc -c` should return `264588`
- ALWAYS verify external dependencies are properly referenced in HTML files:
  - `curl -s http://localhost:8000/index.html | grep -E "aframe|AR.js"` should show both CDN script tags
  - `curl -s http://localhost:8000/index3D.html | grep -E "aframe|AR.js"` should show both CDN script tags
  - Note: External CDN access may be blocked in some environments; functionality testing requires browser access

### Complete Validation Scenario
After making any changes, run this complete validation sequence:
```bash
# 1. Start development server
cd /home/runner/work/microprojetar/microprojetar
python3 -m http.server 8000 --bind 0.0.0.0 &

# 2. Wait for server to start
sleep 3

# 3. Test main page loads correctly
curl -s http://localhost:8000/ | grep "<title>"  # Should return: <title>MicroProjetAR</title>

# 4. Test 3D model is served correctly  
curl -s http://localhost:8000/assets/plant_modelling.glb | wc -c  # Should return: 264588

# 5. Verify CDN dependencies are referenced
curl -s http://localhost:8000/index.html | grep -E "aframe|AR.js" | wc -l  # Should return: 2

# 6. Test 3D page references same dependencies
curl -s http://localhost:8000/index3D.html | grep -E "aframe|AR.js" | wc -l  # Should return: 2

# 7. Stop server
pkill -f "python3 -m http.server"
```

### Required Tools Validation
- Verify required tools are available:
  - `python3 --version` should return Python 3.12.3 or compatible
  - `node --version` should return v20.19.5 or compatible (for Firebase Studio)
  - `git --version` should work for version control

## Common Tasks

### Running the Application
1. Start development server: `python3 -m http.server 8000 --bind 0.0.0.0`
2. Open browser to `http://localhost:8000/` for main experience
3. Open browser to `http://localhost:8000/index3D.html` for 3D experience
4. Stop server with `Ctrl+C` or `pkill -f "python3 -m http.server"`

### Making Changes
- Edit HTML files directly - no compilation required
- Refresh browser to see changes immediately
- Test both AR experiences when modifying AR functionality
- Validate external CDN dependencies remain accessible

### Firebase Studio Development
- The project is configured for Firebase Studio IDE
- `.idx/dev.nix` configures Node.js 20 and Python 3 environment  
- Use the "web" preview with Python HTTP server as configured
- All required files open by default: "style.css", "main.js", "index.html" (though only index.html exists)
- Validate Firebase Studio configuration:
  - `cat .idx/dev.nix | grep -E "nodejs_20|python3"` should show both packages
  - `cat .idx/dev.nix | grep "http.server"` should show the Python server command

## Important File Locations

### Core Application Files
```
/home/runner/work/microprojetar/microprojetar/index.html       # Main AR text experience
/home/runner/work/microprojetar/microprojetar/index3D.html     # 3D model AR experience
/home/runner/work/microprojetar/microprojetar/assets/          # 3D models and assets
```

### Documentation and Tutorial
```
/home/runner/work/microprojetar/microprojetar/README.md        # Complete French tutorial
/home/runner/work/microprojetar/microprojetar/ressources/      # Tutorial images and markers
```

### Development Configuration
```
/home/runner/work/microprojetar/microprojetar/.idx/dev.nix     # Firebase Studio environment
/home/runner/work/microprojetar/microprojetar/.vscode/         # VS Code settings
```

## Frequently Used Commands and Outputs

### Repository Root Contents
```bash
$ ls -la /home/runner/work/microprojetar/microprojetar/
total 60
drwxr-xr-x 7 runner runner  4096 Sep 13 20:26 .
drwxr-xr-x 3 runner runner  4096 Sep 13 20:26 ..
drwxrwxr-x 7 runner runner  4096 Sep 13 20:26 .git
drwxrwxr-x 2 runner runner  4096 Sep 13 20:26 .idx
drwxrwxr-x 2 runner runner  4096 Sep 13 20:26 .vscode
-rw-rw-r-- 1 runner runner 23405 Sep 13 20:26 README.md
drwxrwxr-x 2 runner runner  4096 Sep 13 20:26 assets
-rw-rw-r-- 1 runner runner  1115 Sep 13 20:26 index.html
-rw-rw-r-- 1 runner runner  1126 Sep 13 20:26 index3D.html
drwxrwxr-x 2 runner runner  4096 Sep 13 20:26 ressources
```

### Testing Server Status
```bash
$ python3 -m http.server 8000 --bind 0.0.0.0 &
$ curl -s http://localhost:8000/ | head -5
<!doctype html>
<html>

<head>
    <title>MicroProjetAR</title>
```

### Assets Directory
```bash
$ ls -la assets/
plant_modelling.glb  # 264KB glTF 3D model file
```

## Project Context
- This is an educational AR tutorial project written in French
- Target audience: students learning web AR development
- Uses barcode markers for AR tracking (markers 0 and 2)
- Designed for Firebase Studio IDE development environment  
- No server-side processing - purely client-side web application
- GitHub Pages compatible for easy deployment
- Includes complete tutorial for RFID/NFC integration with physical markers

## Troubleshooting
- If CDN dependencies are inaccessible, the AR functionality will not work
- Camera access required for AR experiences to function
- Barcode markers (ressources/0.png, ressources/2.png) needed for AR detection
- Modern web browser required for WebRTC camera access