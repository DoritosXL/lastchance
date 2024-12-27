import { EmojiDisplay } from "../components/CoverGrid";

export const downloadCover = (
  emojis: EmojiDisplay[],
  color: string = "#fff",
  isMobile: boolean = false // Flag for mobile optimization
) => {
  const scale = isMobile ? 4 : 8; // Adjust the scale based on the device
  const targetResolution = isMobile ? 1080 : 1920; // Target resolution for output

  const canvas = document.createElement("canvas");
  const width = 800;
  const height = 800;

  canvas.width = width * scale;
  canvas.height = height * scale;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Canvas context could not be created.");
    return;
  }

  ctx.scale(scale, scale);

  let hasEmojis = false;
  emojis.forEach((emoji) => {
    if (emoji.native) hasEmojis = true;
  });

  ctx.fillStyle = hasEmojis ? color : "#000000";
  ctx.fillRect(0, 0, width, height);

  const gridRows = 3;
  const gridCols = 4;
  const padding = 40;
  const cellWidth = (width - 2 * padding) / gridCols;
  const cellHeight = (height - 2 * padding) / gridRows;
  const emojiSize = Math.min(cellWidth, cellHeight) * 1;

  if (hasEmojis) {
    emojis.forEach((emoji, index) => {
      const col = index % gridCols;
      const row = Math.floor(index / gridCols);
      const x = padding + col * cellWidth + cellWidth * 0.5;
      const y = padding + row * cellHeight + cellHeight * 0.5;

      if (emoji.native) {
        ctx.font = `${emojiSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000";
        ctx.fillText(emoji.native, x, y);
      }
    });
  }

  // Create an offscreen canvas for resizing
  const outputCanvas = document.createElement("canvas");
  const aspectRatio = canvas.width / canvas.height;
  outputCanvas.width = targetResolution;
  outputCanvas.height = targetResolution / aspectRatio;

  const outputCtx = outputCanvas.getContext("2d");
  if (!outputCtx) {
    console.error("Output canvas context could not be created.");
    return;
  }

  // Draw scaled-down image
  outputCtx.drawImage(canvas, 0, 0, outputCanvas.width, outputCanvas.height);

  const quality = 0.85; // Compression quality (0 to 1, higher means better quality)
  const imageData = outputCanvas.toDataURL("image/jpeg", quality);

  const fileName = hasEmojis ? "CLB.jpg" : "DONDA.jpg";

  const downloadLink = document.createElement("a");
  downloadLink.href = imageData;
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
