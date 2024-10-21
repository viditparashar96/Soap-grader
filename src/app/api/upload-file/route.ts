import { env_config } from "@/config/env-config";
import { BlobServiceClient } from "@azure/storage-blob";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // Get file and upload to azure blob storage
    const formData: FormData = await req.formData();
    const file: any = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "Please provide a file" },
        { status: 400 }
      );
    }
    console.log("Flile", file);
    // Implement grading logic here

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      env_config.azureBlobConnectionString
    );

    const containerClient =
      blobServiceClient.getContainerClient("student-notes");
    const blobName = `${new Date().getTime() + file.name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const buffer = await file.arrayBuffer();

    await blockBlobClient.upload(buffer, buffer.byteLength);

    const fileUrl = blockBlobClient.url;

    return NextResponse.json(
      { message: "File uploaded successfully", public_url: fileUrl },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
