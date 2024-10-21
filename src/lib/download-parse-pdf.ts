import axios from "axios";
import fs from "fs";
import os from "os";
import path from "path";
import pdf from "pdf-parse";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

// async function downloadAndParsePDF(url: string): Promise<string> {
//   const tempDir = os.tmpdir();
//   const tempFilePath = path.join(tempDir, `temp-${Date.now()}.pdf`);

//   try {
//     const response = await axios.get(url, { responseType: "arraybuffer" });
//     await writeFile(tempFilePath, response.data);

//     const dataBuffer = await fs.promises.readFile(tempFilePath);
//     const pdfData = await pdf(dataBuffer);
//     return pdfData.text;
//   } finally {
//     await unlink(tempFilePath).catch(() => {}); // Ignore error if file doesn't exist
//   }
// }

export const downloadAndParsePDF = async (url: string): Promise<string> => {
  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, `temp-${Date.now()}.pdf`);

  console.log(`Attempting to download PDF from URL: ${url}`);

  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    await writeFile(tempFilePath, response.data);
    console.log(`PDF successfully downloaded to ${tempFilePath}`);

    const dataBuffer = await fs.promises.readFile(tempFilePath);
    const pdfData = await pdf(dataBuffer);
    console.log(
      `PDF successfully parsed, extracted text length: ${pdfData.text.length}`
    );

    return pdfData.text;
  } catch (error) {
    console.error("Error in downloadAndParsePDF:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
    }
    throw error; // Re-throw the error to be handled by the caller
  } finally {
    try {
      await unlink(tempFilePath);
      console.log(`Temporary file ${tempFilePath} deleted`);
    } catch (unlinkError) {
      console.error(
        `Failed to delete temporary file ${tempFilePath}:`,
        unlinkError
      );
    }
  }
};
