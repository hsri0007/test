#### WEBGL CANVAS HERO

**Premise**: this hero was developed not 100% in the correct way. Sorry for that.
How does this work:

1. **Text:** All the "text" pieces are placed manually using exported images from Figma. "_Why images and not SDF textures?_" Because with SDF I wasn't able to blur them since to blur you need a texture and create custom SDF to support blur was too time-consuming.
   The blur animation has the limit that it blurs an image and atm images are perfectly squared with text (aka no whitespace), so if you need to pimp the blur // change timing you might need to re-exoprt images with more "white space" (but please <u>keep same ratio</u>) around so blur has room to grow without getting cut by edges.

2. **Responsiveness:** sorry my bad. I developed desktop first with some "hacks" for the **Blob** animation, that means the "scale" prop on mesh//parent doesn't really work since everything is meanted to be in world space (aka add them in a group just... break). Said so, the responsiveness is handled with a combination of two things, **a) config file**, **b) camera distance**.

   The camera distance (camera.position.z) is used to make the blobs responsive (because the issue before), and after updated the camera position all the text is moved in the Z, far from the camera to fit the space (see distanceFromCamera function).

   The config file for the texts is used to place every piece manually and compose the scene.

3. **Choreography:** the opening choreography is inside the `useEffect` of `Intro/index.tsx`, so timing, easing etc are handled there.
