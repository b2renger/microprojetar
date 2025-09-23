🇫🇷 [French translation](README.md)

# Introduction
In this tutorial, we will guide you step by step through creating a simple augmented reality (AR) web application.

https://github.com/user-attachments/assets/f4b1f979-b22c-443c-ae03-740b0111a7f0

The goal is to see together the entire technical chain that allows a project to exist as a web page. We will also see how to write information on RFID chips.

We will use A-Frame, an open-source web framework for creating VR/AR experiences, and AR.js, a JavaScript library that allows integrating AR functionality into web applications.

Our objective will be to display the text "Hello" on a barcode-type AR marker. Then customize the content.

This small project also includes creating a "tag" / "keychain".
<div align="center">
  <img src="ressources/markup_1000019121.png" alt="text disaplyed in ar" width="45%" height="400"/>
  <img src="ressources/markup_1000019122.png" alt="3d model displayed in ar" width="45%" height="400"/>
</div>

We will use different free tools:
- github: to version your code and host your project for free.
- Firebase Studio: which is an IDE (integrated development environment) that allows writing code and connects to github to hierarchize changes in our code.
- nfctools: which is an application for android or iOS that will allow us to write information on our RFID sticker.

# Prerequisites

- have a Github account
- have a Gmail account

- A computer
- A code editor our tool will be: [Firebase Studio](https://studio.firebase.google.com)
- A web browser (Chrome, Firefox ...)
- A smartphone with a web browser (Chrome, Firefox ...)



# Materials at your disposal
- a small square of wood cardboard with rounded edges
- a sticker cut on matte vinyl
- a small metal cord with a clip
- a small RFID chip

<div align="center"> 
  <img src="ressources/PXL_20240912_065600761.jpg" alt="photo of all the elements" width="75%" />
</div>




For assembly, nothing could be simpler:
- stick the sticker on the wooden cardboard square in the location delimited by the engraving.
- stick the RFID chip, centered, on the back of this square.
- unscrew the clip and pass it through the hole.

and there you go! we are ready to move on to the digital part!

If you want more information on this part:
- [Sticker cutting explanations](https://github.com/LucieMrc/SilhouetteCameo_2spi)
- [Laser cutting explanations](https://github.com/b2renger/Introduction_Laser_Beambox)


📽️Speedrun video: 
- this tutorial seems long...
- actually no, it takes less than 10 minutes!
  
https://github.com/user-attachments/assets/0d7ed300-bff6-4171-a3a7-28d8e4be6978 


# Step 1: Create a GitHub account and repository
- Create a GitHub account: If you don't already have one, go to https://github.com/signup?source=login and create an account.

**☢️ The username you choose will be used for the address you need to type to see your project. <u>Choose a short name! without spaces, without special characters (accents, cedilla, etc.)</u>**

<div align="center"> 
  <img src="ressources/Capture_signup_github.png" alt="signup github page" width="49%" height="400"/>
  <img src="ressources/Capture_login_github.png" alt="login github page" width="49%" height="400"/>
</div>

- Create a new repository: Once logged in, click the "New repository" button.
- Give your repository a name (for example, "microProjetAr"),
- (Add an optional description),
- **Enable** the Add README option.
- and click "Create repository".

<div align="center"> 
<img src="ressources/Capture_github_newRepo.png" alt="menu to create new repo" width="75%" />
</div>
</br>
<div align="center"> 
<img src="ressources/Capture_github_newRepoCreation..png " alt="menu to create new repo" width="75%" />
</div>



# Step 2: Enable GitHub Pages
We will now configure GitHub Pages, to allow our project to be served by github servers when we enter the address:

 https://*[your-username]*.github.io/*[your-repo]*


- Access settings: In your repository, click on the "Settings" tab, then on the "Pages" tab

<div align="center"> 
<img src="ressources/Capture_github_settings.png" alt="menu to access gh-pages settings" width="75%" />
</div>
</br>
<div align="center"> 
<img src="ressources/Capture_github_settings_pages.png" alt="Pages menu to access gh-pages settings" width="75%" />
</div>

- Select the branch: In the "GitHub Pages" section, select the "main" branch (or the main branch of your repository).
- Save changes: Click the "Save" button. Your GitHub Pages site will now be accessible at https://[your-username].github.io/[microprojetAr].

<div align="center"> 
<img src="ressources/Capture_github_settings_pages_activate.png" alt="activate gh-pages" width="75%" />
</div>

If you return to your project's home page, you will notice after a few minutes that some elements have changed. A deployment is now available!

<div align="center"> 
<img src="ressources/Capture_github_settings_pages_done.png" alt="gh-pages settings done" width="75%" />
</div>

All the infrastructure needed to host your project is therefore in place, now you just need to add content.


# Step 3: Use Firebase Studio

Go to [Firebase Studio](https://studio.firebase.google.com) and log in.

<blockquote id="parental">
<details>
<summary>Parental control problem? Or age restriction?</summary>

<img src="ressources/parental_1.png" alt="import repo in Firebase Studio" loading="lazy" />
<img src="ressources/parental_2.png" alt="import repo in Firebase Studio" loading="lazy" />
<img src="ressources/parental_3.png" alt="import repo in Firebase Studio" loading="lazy" />

And from this one, you have to go back (but it's important to visit this page)

<img src="ressources/parental_4.png" alt="import repo in Firebase Studio" loading="lazy" />
<img src="ressources/parental_5.png" alt="import repo in Firebase Studio" loading="lazy" />
<img src="ressources/parental_6.png" alt="import repo in Firebase Studio" loading="lazy" />
<img src="ressources/parental_7.png" alt="import repo in Firebase Studio" loading="lazy" />
<img src="ressources/parental_8.png" alt="import repo in Firebase Studio" loading="lazy" />
<img src="ressources/parental_9.png" alt="import repo in Firebase Studio" loading="lazy" />
<img src="ressources/parental_10.png" alt="import repo in Firebase Studio" loading="lazy" />

</details>
</blockquote>

Import the repository: Use the option to import your GitHub repository.

<div align="center"> 
<img src="ressources/fbs_home.JPG" alt="import repo in Firebase Studio" width="75%" />
</div>

Copy the address of the repository created previously.
<div align="center"> 
<img src="ressources/fbs_import.JPG" alt="import repo in Firebase Studio" width="75%" />
<img src="ressources/fbs_import_gh.JPG" alt="import repo in Firebase Studio" width="75%" />
</div>

Configure the project for web development use.

- Create a ".idx" folder:
  <div align="center"> 
  <img src="ressources/fbs_new_folder.JPG" alt="create a new file in Firebase Studio" width="75%" />
  </div>

- In this folder, create a file named "dev.nix"
  <div align="center"> 
  <img src="ressources/fbs_new_file.JPG" alt="create a new file in Firebase Studio" width="75%" />
  </div>
  To achieve this result:
   <div align="center"> 
  <img src="ressources/fbs_dev_nix.JPG" alt="create a new file in Firebase Studio" width="75%" />
  </div>

- Copy the development environment configuration code into the "dev.nix" file you just created. (This file will allow us to test our code directly in Firebase Studio and also test on our phone).

  ```nix
    # To learn more about how to use Nix to configure your environment
  # see: https://developers.google.com/idx/guides/customize-idx-env
  { pkgs, ... }: {
    # Which nixpkgs channel to use.
    channel = "stable-23.11"; # or "unstable"
    # Use https://search.nixos.org/packages to find packages
    packages = [
      pkgs.nodejs_20
      pkgs.python3
    ];
    # Sets environment variables in the workspace
    env = {};
    idx = {
      # Search for the extensions you want on https://open-vsx.org/ and use   "publisher.id"
      extensions = [
        # "vscodevim.vim"
      ];
      # Enable previews and customize configuration
      previews = {
        enable = true;
        previews = {
          web = {
            command = ["python3" "-m" "http.server" "$PORT" "--bind" "0.0.0.0"];
            manager = "web";
          };
        };
      };
      # Workspace lifecycle hooks
      workspace = {
        # Runs when a workspace is first created
        onCreate = {
          # Example: install JS dependencies from NPM
          # npm-install = "npm install";
          # Open editors for the following files by default, if they exist:
          default.openFiles = [ "style.css" "main.js" "index.html" ];
        };
        # Runs when the workspace is (re)started
        onStart = {
          # Example: start a background task to watch and re-build backend code
          # watch-backend = "npm run watch-backend";
        };
      };
    };
  }
  ```

After a few seconds, you should have a preview available.

<div align="center"> 
<img src="ressources/fbs_preview.JPG" alt="preview" width="75%" />
</div>

But there's nothing in it because we haven't added any content to our index.html. That's the next step!


# Step 4: Create the HTML page

We are going to replace the content of the index.html file (which only contained the word "hello") with code that configures our augmented reality experience.

<div align="center"> 
<img src="ressources/fbs_index_html.JPG" alt="index.html file creation" width="75%" />
</div>

Replace the entire content of the file with the code below:

```html
<!doctype html>
<html>

<head>
    <title>My first AR app</title>
    <script src="https://aframe.io/releases/1.6.0/aframe.min.js">

    </script>
    <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js">

    </script>

</head>


<body style="margin : 0px; overflow: hidden;">
    <a-scene embedded
        arjs="sourceType: webcam; detectionMode: mono_and_matrix; matrixCodeType: 3x3; trackingMethod: best ; changeMatrixMode: modelViewMatrix;"
        vr-mode-ui="enabled: false"
        renderer="sortObjects: true; antialias: true; colorManagement: true; physicallyCorrectLights; logarithmicDepthBuffer: true;"
        smooth=" true" smoothCount="5" smoothTolerance=".05" smoothThreshold="5" sourceWidth="800" sourceHeight="600"
        displayWidth="1280" displayHeight="720">



        <a-marker type='barcode' value='0'>
            <a-text value="Hello !" side="double" position="0 0 -1" rotation="270 0 0" width="8" color="red"
                align="center">
            </a-text>
        </a-marker>

        <a-entity camera></a-entity>

    </a-scene>


</body>

</html>
```

Once the code is pasted and the file saved, your preview should refresh automatically. We now have our first augmented reality application!

# Step 5: Understanding the code
This code creates a simple augmented reality (AR) experience using A-Frame and AR.js. Let's break down what each part does:

If you are not comfortable and don't know at all how html code works, click on the small triangle to unfold an explanation of the basics of html syntax

<details > <summary> <b>&#128161 html basics</b> </summary>

An HTML page is like a sandwich. It needs bread on top and bread on bottom to contain the filling!

The top and bottom bread are the ```<html>``` and ```</html>``` tags. They tell the browser that the content between these tags is HTML code.

Two main parts: Inside the "HTML sandwich", we find two parts:

- The head: ```<head> ... </head>``` (this is where we put information about the page, but which is not displayed directly. Like the page title, links to styles or libraries).
- The body: ```<body> ... </body>``` (this is where we put the content that will be displayed on the page).

Tags work in pairs (most of the time): A tag is opened with ```<tag>``` and closed with ```</tag>```. What is between the two is the content of this tag.

For example:
- ```<body>``` opens the body of the page and ```</body>``` closes it.
- ```<h1>``` opens a level 1 title and ```</h1>``` closes it.
- ```<p>``` opens a paragraph and ```</p>``` closes it.

</details>
</br>

Here we have a classic HTML structure: The code sets up a basic HTML page with the <head> and <body> sections.


In the ```<head>``` part, we add:

- the title of the experience
  ```html
  <title>My first AR app</title>
  ```

- the *A-Frame Library*: It includes the A-Frame library (aframe.min.js) which is a JavaScript framework for creating virtual reality (VR) and AR experiences using HTML.
  ```html
  <script src="https://aframe.io/releases/1.6.0/aframe.min.js"></script>
  ```

- the *AR.js Library*: It also includes the AR.js library (aframe-ar.js) which adds AR capabilities to A-Frame.
  ```html
  <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
  ```

In the ```<body>``` part we create our 3D AR scene:

- *a-scene*: This is the main container for the AR scene.
  ```html
  <a-scene embedded arjs="..." renderer="..." vr-mode-ui="enabled: false" ...>
  ```

  Notice that in the opening ```<a-scene>``` tag we add many options (called attributes in html) to configure how the scene will display.

  <details > <summary> <b>&#128161 details of the arjs attribute configuration options</b> </summary>
  - *embedded* : This attribute tells A-Frame to embed the scene in the HTML page.

  - *arjs* : This attribute configures AR.js
    - *sourceType: webcam* : Uses the device's webcam as video source.
    - *detectionMode: mono_and_matrix* : Detects both target images and barcode type markers.
    - *matrixCodeType: 3x3* : Specifies that the barcode type used is a 3x3 matrix barcode.
    - *trackingMethod: best* : Uses the best tracking method available.

  - *renderer* : This attribute configures how the 3D scene is rendered 
    - *sortObjects: true* : Sorts 3D objects by depth for better rendering.
    - *antialias: true* : Enables antialiasing to smooth the edges of 3D objects.
    - *colorManagement: true* : Enables color management for better colors.
    - *logarithmicDepthBuffer: true* : Uses a logarithmic depth buffer for better depth precision.

  - *vr-mode-ui="enabled: false"* : Disables the VR mode button interface.

  - *smooth, smoothCount, smoothTolerance, smoothThreshold* : Configuration options to smooth marker tracking and reduce jitter.

  - *sourceWidth, sourceHeight, displayWidth, displayHeight* : Configuration options for video source and display resolution.

  </details>
  </br>

- *a-marker*: This defines a marker (in this case a barcode marker with value '0') that the AR system will look for.
  ```html
  <a-marker type='barcode' value='0'>
  ```

- *a-text*: This is the 3D text that will appear on the marker when detected.
  ```html
  <a-text value="Hello !" side="double" position="0 0 -1" rotation="270 0 0" width="8" color="red" align="center">
  ```

  The different parameters/attributes control the appearance and position of the text:
  - *value="Hello !"* : The text to display.
  - *side="double"* : Makes the text visible from both sides.
  - *position="0 0 -1"* : 3D position of the text (x, y, z).
  - *rotation="270 0 0"* : Rotation of the text in degrees (x, y, z).
  - *width="8"* : Size of the text.
  - *color="red"* : Color of the text.
  - *align="center"* : Text alignment.

- *a-entity camera*: This represents the camera/viewpoint of the user.
  ```html
  <a-entity camera></a-entity>
  ```

When you run this code in a web browser on a device with a camera, it will:
1. Access the device's camera
2. Analyze the video stream to look for barcode markers
3. When it detects a marker with value '0', it will display the red "Hello !" text above the marker
4. The text will follow the marker as you move it around

This creates a simple but functional AR experience where digital content (the text) is overlaid on the real world (via the camera) and anchored to physical markers.

# Step 6: Testing

That's it! Our application is functional.

For a 3D object model rendering test, you can replace the content with:

```html
<!doctype html>
<html>

<head>
    <script src="https://aframe.io/releases/1.3.0/aframe.min.js">

    </script>
    <script src="https://raw.githack.com/AR-js-org/AR.js/3.4.5/aframe/build/aframe-ar.js">

    </script>
   
</head>


<body style="margin : 0px; overflow: hidden;">
    <a-scene embedded
        arjs="sourceType: webcam; detectionMode: mono_and_matrix; matrixCodeType: 3x3; trackingMethod: best ; changeMatrixMode: modelViewMatrix;"
        vr-mode-ui="enabled: false"
        renderer="sortObjects: true; antialias: true; colorManagement: true; physicallyCorrectLights; logarithmicDepthBuffer: true;"
        smooth=" true" smoothCount="5" smoothTolerance=".05" smoothThreshold="5" sourceWidth="800" sourceHeight="600"
        displayWidth="1280" displayHeight="720">

        <a-assets>
            <a-asset-item id="glbTest" src="https://github.com/b2renger/microprojetar/raw/refs/heads/main/assets/plant_modelling.glb"></a-asset-item>
          </a-assets>


        <a-marker type='barcode' value='2'>
            <a-entity scale=".2 .2 .2" gltf-model="#glbTest"></a-entity>
        </a-marker>

        <a-entity camera></a-entity>

    </a-scene>


</body>

</html>
```

This displays a 3D plant model instead of text.

Now we need to test our application.

To test, we will need to print barcodes. You can print them by accessing this link: [barcode markers](https://jeromeetienne.github.io/AR.js/data/images/)

<div align="center"> 
<img src="ressources/barcodes.JPG" alt="marker barcodes" width="75%" />
</div>

Print the barcodes for the values 0 and 2.

Now you can test your application by accessing the preview of your project by clicking on the preview (top right of Firebase Studio).

A window with your application will open, you will need to authorize the use of the camera. Then point your camera at the printed barcodes!

<div align="center"> 
<img src="ressources/preview_phone.JPG" alt="preview on phone" width="75%" />
</div>

You can also test directly on your phone by scanning the QR code that appears at the bottom left of the preview window. This QR code contains the address to access your application.

Your phone will connect to the same application via the web!

# Step 7: Publish the application

To publish, there are several steps, and it's actually very simple.

We must first tell Firebase that we have made changes and that we want them to be saved to our Github repository. This is done via git and we will "commit" and "push" the changes.

This is done simply by going to the "Source Control" menu.

<div align="center"> 
<img src="ressources/fbs_commit.JPG" alt="commit in Firebase Studio" width="75%" />
</div>

Add a message describing what you've just done and click the commit button.

<div align="center"> 
<img src="ressources/fbs_commit_message.JPG" alt="commit with message in Firebase Studio" width="75%" />
</div>

Then click the "Sync Changes" button to send these changes to Github.

<div align="center"> 
<img src="ressources/fbs_sync.JPG" alt="sync in Firebase Studio" width="75%" />
</div>

Now if you go back to your github repository and wait a few minutes, you should see that your files have been updated, and in the top right part of the github page you will see a green checkmark indicating that your site has been updated!

<div align="center"> 
<img src="ressources/Capture_github_settings_pages_done.png" alt="gh-pages settings done" width="75%" />
</div>

Your application is now accessible to everyone at the address:

https://*[your-username]*.github.io/*[your-repo]*

You can therefore send this link to anyone and they will be able to test your creation!

#  Step 8: Encode the RFID sticker

We can add an RFID sticker to our keychain so that when someone approaches their phone to the keychain, it automatically opens our application.

For this we will use the NFC Tools application, available on Android and iOS:
- [Android](https://play.google.com/store/apps/details?id=com.wakdev.wdnfc&hl=en&gl=US)
- [iOS](https://apps.apple.com/us/app/nfc-tools/id1252962749)

Install the application and then:
- click on "Write"
- then on "Add a record"
- Choose "URL / URI"
- Copy and paste the link to your project
- Then "OK"
- Then "Write / XX Bytes" (number may vary)
- Then approach the keychain (the round sticker side) to the back of your phone and wait for the vibration.

  <div align="center"> 
  <img src="ressources/nfc1.png" alt="nfc steps" width="19%" height="400"/>
  <img src="ressources/nfc2.png" alt="nfc steps" width="19%" height="400"/>
  <img src="ressources/nfc3.png" alt="nfc steps" width="19%" height="400"/>
  <img src="ressources/nfc4.png" alt="nfc steps" width="19%" height="400"/>
  <img src="ressources/nfc5.png" alt="nfc steps" width="19%" height="400"/>
  </div>

That should be it!
You can close NFCTools and test!



# Going further...

A complete course in English is available on [the ateliernum site](http://ateliernum.github.io) at this address: https://github.com/b2renger/Introduction_A-frame#introduction_a-frame

Customize the appearance: Add other elements, modify colors, sizes and positions of elements.

Add 3D models: Import 3D models into your scene.

Use other types of markers: Explore different types of AR markers.

Create interactions: Add events and interactions to your application.

But if you got here quickly you deserve a little help with templates to add an image, a 3D model or a video.

## Loading assets

You can download a zip with: an image, a 3D model and a video [at this address](https://github.com/b2renger/microprojetar/releases/download/v1.1/assets.zip).



### Asset formats

Assets are files that can be used in your application, these can be: images, 3D models, sounds, videos.

We are in a web context so these files need to be lightweight to load quickly and optimized.
- plan for images and videos in a maximum resolution of 1920x1080 pixels
  - for videos encoded in H.264 and in mp4 format
  - for images in png or jpeg format.

- for 3D this will be 3D models in glb format (the web format), exportable from blender.

Your files should not be larger than 5MB (even though for an image that's already huge).

You can find an asset pack at this address:

### Adding files in firebase

It's good practice to put our asset files in a separate folder.

We will therefore create an 'assets' folder in firebase. It's the same thing as when we created a folder for our configuration file.
<div align="center"> 
  <img src="ressources/assets_create_folder.png" alt=" " width="75%"/>
</div>

Then we can click and drag our files to upload them to the assets folder.

<div align="center"> 
  <img src="ressources/assets_upload.png" alt=" " width="75%"/>
</div>

### Loading them in our scene

Each file type has a different loading mode. This is done between the <a-scene> ... and </a-scene> tags

Note that you must adapt these new elements to the name of our files

- In the "src" parameter, we load the file named "filename.png" which is stored in the asset folder.
- In the id parameter we choose an alias that will allow us to reference this file without having to retype its name.

For images:
We load the file logo_ecole_1_coul_defonce_noir.png which is stored in the asset folder.
```html
<a-assets>
  <img id="img1" src="./assets/logo_ecole_1_coul_defonce_noir.png">
</a-assets> 

```

For 3D models:
We load the file plant_modelling.glb which is stored in the asset folder.
```html
<a-assets>
  <a-asset-item id="glb1" src="./assets/plant_modelling.glb"></a-asset-item>
</a-assets>
```

For videos:
We load the file video.mp4 which is stored in the asset folder.
```html
<a-assets>
  <video id="vid" src="assets/video.mp4" autoplay="true" loop="true" preload="auto" controls="true" muted="true" playsinline="" webkit-playsinline=""></video>
</a-assets>
```

## Code examples
The examples provided below are complete and functional, you can copy/paste them directly into your index.html file

### Images
You will need to adapt the "width" and "height" of the image according to the aspect ratio of your image so that it is not distorted.

```html
<!DOCTYPE html>
<html>

<head>
  <title>My first AR app</title>
  <script src="https://aframe.io/releases/1.6.0/aframe.min.js"></script>
  <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
</head>

<body>
  <a-scene embedded
    arjs="sourceType: webcam; detectionMode: mono_and_matrix; matrixCodeType: 3x3; trackingMethod: best ; changeMatrixMode: modelViewMatrix;"
    renderer="sortObjects: true; antialias: true; colorManagement: true; logarithmicDepthBuffer: true;"
    vr-mode-ui="enabled: false" smooth=" true" smoothCount="5" smoothTolerance=".05" smoothThreshold="5"
    sourceWidth="800" sourceHeight="600" displayWidth="1280" displayHeight="720">

    <a-assets>
      <img id="img1" src="./assets/logo_ecole_1_coul_defonce_noir.png">
    </a-assets>


    <a-marker type='barcode' value='0'>
      <a-image src="#img1" rotation="270 0 0" width="1" height="2"></a-image>
    </a-marker>

    <a-entity camera></a-entity>
  </a-scene>
</body>

</html>
```

### 3D
Remember to adapt the scale parameter according to the export units of your model.

```html
<!DOCTYPE html>
<html>

<head>
  <title>My first AR app</title>
  <script src="https://aframe.io/releases/1.6.0/aframe.min.js"></script>
  <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
</head>

<body>
  <a-scene embedded
    arjs="sourceType: webcam; detectionMode: mono_and_matrix; matrixCodeType: 3x3; trackingMethod: best ; changeMatrixMode: modelViewMatrix;"
    renderer="sortObjects: true; antialias: true; colorManagement: true; logarithmicDepthBuffer: true;"
    vr-mode-ui="enabled: false" smooth=" true" smoothCount="5" smoothTolerance=".05" smoothThreshold="5"
    sourceWidth="800" sourceHeight="600" displayWidth="1280" displayHeight="720">

    <a-assets>
      <a-asset-item id="glb1" src="./assets/plant_modelling.glb"></a-asset-item>
    </a-assets>


    <a-marker type='barcode' value='0'>
      <a-entity scale=".2 .2 .2" gltf-model="#glb1"></a-entity>
    </a-marker>

    <a-entity camera></a-entity>
  </a-scene>
</body>

</html>
```

### Video (the most complicated)
For video this is more complex because we need to handle the play/pause of the video when the marker appears or disappears from the camera field of view.

```html
<!DOCTYPE html>
<html>

<head>
  <title>My first AR app</title>
  <script src="https://aframe.io/releases/1.6.0/aframe.min.js"></script>
  <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>

  <script>
    AFRAME.registerShader("chromakey", {
      schema: {
        src: { type: "map" },
        color: { type: "color", default: "green" },
        transparent: { type: "boolean", default: false },
      },

      init: function (data) {
        var videoTexture = new THREE.VideoTexture(data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        this.material = new THREE.ShaderMaterial({
          uniforms: {
            myTexture: { value: videoTexture },
            color: { value: new THREE.Color(data.color) },
            chroma: { value: data.transparent },
          },
          vertexShader: `
            varying vec2 vUv;
            void main(void)
            {
              vUv = uv;
              vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
              uniform sampler2D myTexture;
              uniform vec3 color;
              uniform bool chroma;
              varying vec2 vUv;

              void main(void)
              {
                vec3 tColor = texture2D( myTexture, vUv ).rgb;
                float a;
                if(chroma == true){
                   a = (length(tColor - color) - 0.5) * 7.0;
                }
                else {
                  a = 1.0;
                }

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
      trackedElements: null,

      init: function () {
        this.trackedElements = document.querySelectorAll(
          "a-marker[vidhandler]"
        );
       // console.log(this.trackedElements);
      },
      tick: function () {
        // if(!userConsent){
        //   return;
        // }

        this.trackedElements.forEach((marker) => {
          if (marker.object3D.visible) {
            const vid = document.querySelector(
              marker.attributes.vidreference.value
            );
           // console.log(vid)        
            if (vid.paused) {
              vid.play();
            }
          } else {
            const vid = document.querySelector(
              marker.attributes.vidreference.value
            );
          }
        });
      },
    });
  </script>

</head>

<body>
  <a-scene embedded
    arjs="sourceType: webcam; detectionMode: mono_and_matrix; matrixCodeType: 3x3; trackingMethod: best ; changeMatrixMode: modelViewMatrix;"
    renderer="sortObjects: true; antialias: true; colorManagement: true; logarithmicDepthBuffer: true;"
    vr-mode-ui="enabled: false" smooth=" true" smoothCount="5" smoothTolerance=".05" smoothThreshold="5"
    sourceWidth="800" sourceHeight="600" displayWidth="1280" displayHeight="720">

    <a-assets>
      <video id="vid" src="assets/video.mp4" autoplay="true" loop="true" preload="auto" controls="true"
      muted="true" playsinline="" webkit-playsinline=""></video>
    </a-assets>

    <a-marker vidhandler vidreference="#vid" type="barcode" value="0">
      <a-entity material="shader: chromakey; src: #vid; chroma:false; color: 0. 0. 0."
        geometry="primitive: plane; width:  1.05; height:  1.05" position="0  0  0" rotation="270  0  0" side="double">
      </a-entity>
    </a-marker>

    <a-entity camera></a-entity>
  </a-scene>
</body>

</html>
```