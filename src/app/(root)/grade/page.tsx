"use client";

import { FileTextTwoTone, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Input, message, Tabs, Typography, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import React, { useState } from "react";

const { TextArea } = Input;
const { Title } = Typography;
const { TabPane } = Tabs;

export default function GradeSOAPNotes() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [soapText, setSoapText] = useState("");

  const handleUpload = (info: any) => {
    const { status } = info.file;
    console.log("Handle upload", info);
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
    setFileList(info.fileList);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSoapText(e.target.value);
  };

  const handleStartGrading = () => {
    // Implement grading logic here
    message.info("Starting grading process...");
  };

  return (
    <>
      <Title level={2}>Grade SOAP Notes</Title>
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Upload File" key="1">
            <Upload.Dragger
              accept=".docx,.pdf"
              fileList={fileList}
              multiple
              style={{ padding: 16 }}
              onChange={handleUpload}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text text-clip">
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
            <Typography.Text
              type="secondary"
              style={{ display: "block", marginTop: 8 }}
            >
              Support for a single or bulk upload. Strictly prohibit from
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
