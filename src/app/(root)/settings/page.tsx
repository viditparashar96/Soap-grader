"use client";

import { SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Switch,
  Typography,
  message,
} from "antd";

const { Title } = Typography;
const { Option } = Select;

export default function Settings() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    message.success("Settings saved successfully");
  };

  return (
    <>
      <Title level={2}>Settings</Title>
      <Card>
        <Form
          form={form}
          name="settings"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            notifications: true,
            language: "en",
            gradeScale: "100",
          }}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="notifications"
            label="Email Notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item name="language" label="Language">
            <Select>
              <Option value="en">English</Option>
              <Option value="es">Español</Option>
              <Option value="fr">Français</Option>
            </Select>
          </Form.Item>

          <Form.Item name="gradeScale" label="Grading Scale">
            <Select>
              <Option value="100">100-point scale</Option>
              <Option value="5">5-point scale</Option>
              <Option value="letter">Letter grade (A-F)</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Save Settings
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}
