"use client";

import {
  DashboardTwoTone,
  FileTextTwoTone,
  MenuOutlined,
  SettingTwoTone,
} from "@ant-design/icons";
import { Layout as AntLayout, Button, Menu, Typography } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const { Content, Sider } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        theme="light"
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography.Text strong style={{ color: "white" }}>
            {collapsed ? "SG" : "HSI SOAP Grader"}
          </Typography.Text>
        </div>
        <Menu mode="inline" style={{ borderRight: 0 }}>
          <Menu.Item
            key="1"
            icon={<DashboardTwoTone twoToneColor="#eb2f96" />}
            color="red"
          >
            <Link href="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextTwoTone twoToneColor="#1890ff" />}>
            <Link href="/grade">Grade SOAP Notes</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingTwoTone twoToneColor="#52c41a" />}>
            <Link href="/settings">Settings</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <AntLayout>
        <AntLayout.Header style={{ padding: 0, background: "#fff" }}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </AntLayout.Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, minHeight: 360, background: "#fff" }}>
            {children}
          </div>
        </Content>
        <AntLayout.Footer style={{ textAlign: "center" }}>
          SOAP Grader ©{new Date().getFullYear()} Created by HSI Labs
        </AntLayout.Footer>
      </AntLayout>
    </AntLayout>
  );
}
