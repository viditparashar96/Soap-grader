"use client";

import { FileTextTwoTone, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Input, message, Tabs, Typography, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import axios from "axios";
import React, { useState } from "react";

const { TextArea } = Input;
const { Title } = Typography;
const { TabPane } = Tabs;

const MAX_FILE_COUNT = 5;

export default function GradeSOAPNotes() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [soapText, setSoapText] = useState("");
  const [currentTab, setCurrentTab] = useState("1");
  const [publicUrls, setPublicUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const handleFileUpload: UploadProps["customRequest"] = async ({
    file,
    onProgress,
    onSuccess,
    onError,
  }) => {
    const formData = new FormData();
    formData.append("file", file as Blob);

    try {
      const response = await axios.post("/api/upload-file", formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total ?? 100)
          );
          onProgress?.({ percent });
        },
      });
      onSuccess?.(response.data, response as any);
      message.success(`${(file as any).name} file uploaded successfully.`);
      if (response.data.public_url) {
        console.log("Public URL: ", response.data.public_url);
        setPublicUrls((urls) => [...urls, response.data.public_url]);
      }
    } catch (error) {
      onError?.(error as any);
      message.error(`${(file as any).name} file upload failed.`);
    }
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    let newFileList = [...info.fileList];

    // Limit the number of files to MAX_FILE_COUNT
    newFileList = newFileList.slice(-MAX_FILE_COUNT);

    setFileList(newFileList);
  };

  // const beforeUpload = (file: UploadFile, fileList: UploadFile[]) => {
  //   if (fileList.length + fileList.length > MAX_FILE_COUNT) {
  //     message.error(
  //       `You can only upload up to ${MAX_FILE_COUNT} files at a time.`
  //     );
  //     return Upload.LIST_IGNORE;
  //   }
  //   return true;
  // };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSoapText(e.target.value);
  };

  const handleStartGrading = async () => {
    try {
      setLoading(true);

      if (currentTab === "1" && fileList.length === 0) {
        message.error("Please upload a file to grade");
        return;
      }
      if (currentTab === "2" && soapText.trim() === "") {
        message.error("Please enter SOAP notes to grade");
        return;
      }

      let type;
      if (currentTab === "1") {
        type = "file";
      } else {
        type = "text";
      }

      const payload: any = {};
      if (type === "file") {
        payload["fileUrls"] = publicUrls;
        payload["type"] = type;
      } else {
        payload["soapText"] = soapText;
        payload["type"] = type;
      }
      const response = await axios.post("/api/grade-notes", payload);
      if (response.data.error) {
        message.error(response.data.error);
      } else {
        message.success("Grading completed successfully");
      }
    } catch (error: any) {
      console.error(error);
      setLoading(false);
      message.error(error.response.data.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (key: string) => {
    setCurrentTab(key);
  };

  console.log("Current Tab: ", currentTab);

  return (
    <>
      <Title level={2}>Grade SOAP Notes</Title>
      <Card>
        <Tabs defaultActiveKey="1" onChange={handleTabChange}>
          <TabPane tab="Upload File" key="1">
            <Upload.Dragger
              accept=".docx,.pdf"
              fileList={fileList}
              multiple
              maxCount={MAX_FILE_COUNT}
              customRequest={handleFileUpload}
              onChange={handleChange}
              // beforeUpload={beforeUpload}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text text-clip">
                Click or drag file to this area to upload (max 1 files)
              </p>
            </Upload.Dragger>
            <Typography.Text
              type="secondary"
              style={{ display: "block", marginTop: 8 }}
            >
              Support for up to 1 files at a time. Strictly prohibit from
              uploading company data or other sensitive files.
            </Typography.Text>
          </TabPane>
          <TabPane tab="Enter Text" key="2">
            <TextArea
              rows={10}
              placeholder="Enter SOAP notes here..."
              value={soapText}
              onChange={handleTextChange}
            />
          </TabPane>
        </Tabs>
        <Button
          type="primary"
          loading={loading}
          icon={<FileTextTwoTone />}
          onClick={handleStartGrading}
          style={{ marginTop: 16 }}
        >
          Start Grading
        </Button>
      </Card>
    </>
  );
}
