import React, { useRef, useEffect, useState } from "react";

const getImageDominantColor = async (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      // Get image data
      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;

      // Count colors
      const colorCounts = {};
      for (let i = 0; i < imageData.length; i += 4) {
        const rgb = `rgb(${imageData[i]}, ${imageData[i + 1]}, ${
          imageData[i + 2]
        })`;
        colorCounts[rgb] = (colorCounts[rgb] || 0) + 1;
      }

      // Find the most dominant color
      let maxCount = 0;
      let dominantColor = null;
      for (const color in colorCounts) {
        if (colorCounts[color] > maxCount) {
          maxCount = colorCounts[color];
          dominantColor = color;
        }
      }

      // Convert RGB to HEX
      dominantColor = rgbToHex(dominantColor);
      resolve(dominantColor);
    };
    image.onerror = () => {
      reject(new Error("Image loading failed"));
    };
    image.src = src;
  });
};

// Function to convert RGB to HEX
const rgbToHex = (rgb) => {
  const [r, g, b] = rgb.match(/\d+/g);
  return (
    "#" +
    ((1 << 24) + (parseInt(r) << 16) + (parseInt(g) << 8) + parseInt(b))
      .toString(16)
      .slice(1)
  );
};

export default getImageDominantColor;
