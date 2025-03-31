// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite( bgImg, fgImg, fgOpac, fgPos ) {
 for (let y = 0; y < fgImg.height; y++) {
    for (let x = 0; x < fgImg.width; x++) {
        
      let fgPixelIndex = (y * fgImg.width + x) * 4;

      let bgX = fgPos.x + x;
      let bgY = fgPos.y + y;

      if (bgX >= 0 && bgX < bgImg.width && bgY >= 0 && bgY < bgImg.height) {
        let bgPixelIndex = (bgY * bgImg.width + bgX) * 4;

        //  alpha value of bgImg always fully opaque
        bgImg.data[bgPixelIndex + 3] = 255;

        for (let color = 0; color < 3; color++) {
          if (fgImg.data[fgPixelIndex + 3] > 0) {
            // alpha blending calculation
            let blendedValue =
              fgImg.data[fgPixelIndex + color] * fgOpac +
              (1 - fgOpac) * bgImg.data[bgPixelIndex + color];

            // alpha blending for (R,G,B)
            bgImg.data[bgPixelIndex + color] = blendedValue;
          }
        }
      }
    }
  }
}
