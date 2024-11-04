"use client";

import {
  CalendarTwoTone,
  FileTextTwoTone,
  SearchOutlined,
  TrophyTwoTone,
} from "@ant-design/icons";
import {
  Card,
  Col,
  DatePicker,
  Input,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd";
import type { Dayjs } from "dayjs";
import { useState } from "react";

const { RangePicker } = DatePicker;
const { Title } = Typography;
const { Option } = Select;

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<string>("This Week");
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const gradedNotes = [
    {
      key: 1,
      student: "John Doe",
      date: "2023-06-01",
      previousScore: 75,
      finalScore: 85,
      improvement: 10,
    },
    {
      key: 2,
      student: "Jane Smith",
      date: "2023-06-02",
      previousScore: 68,
      finalScore: 82,
      improvement: 14,
    },
    {
      key: 3,
      student: "Bob Johnson",
      date: "2023-06-03",
      previousScore: 90,
      finalScore: 95,
      improvement: 5,
    },
    {
      key: 4,
      student: "Alice Brown",
      date: "2023-06-04",
      previousScore: 82,
      finalScore: 88,
      improvement: 6,
    },
    {
      key: 5,
      student: "Charlie Davis",
      date: "2023-06-05",
      previousScore: 70,
      finalScore: 80,
      improvement: 10,
    },
  ];

  const filteredNotes = gradedNotes.filter((note) =>
    note.student.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Previous Score",
      dataIndex: "previousScore",
      key: "previousScore",
      render: (score: number) => `${score}%`,
    },
    {
      title: "Final Score",
      dataIndex: "finalScore",
      key: "finalScore",
      render: (score: number) => `${score}%`,
    },
    {
      title: "Improvement",
      dataIndex: "improvement",
      key: "improvement",
      render: (improvement: number) => (
        <Tag color={improvement >= 10 ? "green" : "blue"}>+{improvement}%</Tag>
      ),
    },
  ];

  return (
    <>
      <Title level={2}>Grade Dashboard</Title>
      <Space
        direction="vertical"
        size="middle"
        style={{ display: "flex", width: "100%", marginBottom: 16 }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Select
              style={{ width: "100%" }}
              value={timeRange}
              onChange={(value) => setTimeRange(value)}
            >
              <Option value="Today">Today</Option>
              <Option value="This Week">This Week</Option>
              <Option value="This Month">This Month</Option>
              <Option value="This Year">This Year</Option>
              <Option value="Custom">Custom Range</Option>
            </Select>
          </Col>
          {timeRange === "Custom" && (
            <Col xs={24} sm={12} md={8}>
              <RangePicker
                style={{ width: "100%" }}
                value={dateRange}
                onChange={(dates) => setDateRange(dates)}
              />
            </Col>
          )}
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Search students"
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
        </Row>
      </Space>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Graded"
              value={127}
              prefix={<FileTextTwoTone twoToneColor="#1890ff" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Pending"
              value={3}
              prefix={<CalendarTwoTone twoToneColor="#eb2f96" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Average Score"
              value={85}
              suffix="%"
              prefix={<TrophyTwoTone twoToneColor="#faad14" />}
            />
          </Card>
        </Col>
      </Row>
      <Card style={{ marginTop: 16 }}>
        <Table
          columns={columns}
          dataSource={filteredNotes}
          pagination={{ pageSize: 5 }}
          scroll={{ x: true }}
        />
      </Card>
    </>
  );
}
