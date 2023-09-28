import axios from "axios";
import fsPromises from "fs/promises";
import path from "path";
import { URL, fileURLToPath } from "url";

export async function downloadImage(imageUrl) {
  try {
    // Extract the file extension from the URL
    const url = new URL(imageUrl);
    const fileExtension = path.extname(url.pathname).toLowerCase();

    // Get the current directory
    const currentDir = path.dirname(fileURLToPath(import.meta.url));

    // Construct the output path using path.join
    const outputPath = path.join(
      currentDir,
      `downloaded_image${fileExtension}`
    );

    // Make an HTTP GET request to the URL
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer", // Set the response type to arraybuffer
    });

    if (response.status === 200) {
      // Write the image data to the file directly
      await fsPromises.writeFile(outputPath, response.data, "binary");

      console.log("Image downloaded successfully.");
      return `downloaded_image${fileExtension}`; // Return the path to the downloaded image
    } else {
      console.error(
        `Failed to download image. HTTP status code: ${response.status}`
      );
      return null; // Return null to indicate failure
    }
  } catch (error) {
    console.error("Error downloading image:", error);
    return null; // Return null to indicate failure
  }
}
