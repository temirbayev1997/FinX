import { useEffect, useMemo, useState } from "react";

import {
  Table,
  Button,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Card,
  Row,
  Col,
  Statistic,
  Popconfirm,
  message
} from "antd";

import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined
} from "@ant-design/icons";

import {
  getTransactions,
  createTransaction,
  deleteTransaction
} from "../serv/api";

export default function Transactions() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("all");

  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      setLoading(true);

      const res =
        await getTransactions();

      setData(
        Array.isArray(res)
          ? res
          : []
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit =
    async () => {
      const values =
        await form.validateFields();

      await createTransaction(
        values
      );

      message.success(
        "Операция добавлена"
      );

      setOpen(false);
      form.resetFields();

      fetchData();
    };

  const handleDelete =
    async (id) => {
      await deleteTransaction(id);

      message.success(
        "Удалено"
      );

      fetchData();
    };

  const filteredData =
    useMemo(() => {
      return data.filter(
        (item) => {
          const byType =
            typeFilter ===
              "all" ||
            item.type ===
              typeFilter;

          const bySearch =
            String(
              item.category || ""
            )
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            String(
              item.amount || ""
            ).includes(search);

          return (
            byType &&
            bySearch
          );
        }
      );
    }, [
      data,
      search,
      typeFilter
    ]);

  const totals =
    useMemo(() => {
      let income = 0;
      let expense = 0;

      filteredData.forEach(
        (item) => {
          const amount =
            Number(
              item.amount || 0
            );

          if (
            item.type ===
            "income"
          ) {
            income += amount;
          } else {
            expense += amount;
          }
        }
      );

      return {
        income,
        expense,
        profit:
          income - expense
      };
    }, [filteredData]);

  const columns = [
    {
      title: "Дата",
      dataIndex:
        "created_at",
      render: (value) =>
        value
          ? new Date(
              value
            ).toLocaleDateString(
              "ru-RU"
            )
          : "-"
    },

    {
      title: "Тип",
      dataIndex: "type",
      render: (type) =>
        type ===
        "income" ? (
          <Tag color="green">
            Доход
          </Tag>
        ) : (
          <Tag color="red">
            Расход
          </Tag>
        )
    },

    {
      title: "Категория",
      dataIndex:
        "category"
    },

    {
      title: "Сумма",
      dataIndex:
        "amount",
      render: (v) =>
        Number(v).toLocaleString(
          "ru-RU"
        ) + " ₸"
    },

    {
      title: "Действия",
      render: (_, record) => (
        <Popconfirm
          title="Удалить запись?"
          onConfirm={() =>
            handleDelete(
              record.id
            )
          }
        >
          <Button
            danger
            icon={
              <DeleteOutlined />
            }
          >
            Удалить
          </Button>
        </Popconfirm>
      )
    }
  ];

  return (
    <div>
      <Row
        justify="space-between"
        align="middle"
        style={{
          marginBottom: 20
        }}
      >
        <Col>
          <h1
            style={{
              margin: 0
            }}
          >
            Операции
          </h1>
        </Col>

        <Col>
          <Button
            type="primary"
            icon={
              <PlusOutlined />
            }
            onClick={() =>
              setOpen(true)
            }
          >
            Добавить
          </Button>
        </Col>
      </Row>

      {/* KPI */}
      <Row
        gutter={[16, 16]}
        style={{
          marginBottom: 20
        }}
      >
        <Col span={8}>
          <Card>
            <Statistic
              title="Доход"
              value={
                totals.income
              }
              suffix="₸"
              valueStyle={{
                color:
                  "#3f8600"
              }}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="Расход"
              value={
                totals.expense
              }
              suffix="₸"
              valueStyle={{
                color:
                  "#cf1322"
              }}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="Баланс"
              value={
                totals.profit
              }
              suffix="₸"
            />
          </Card>
        </Col>
      </Row>

      {/* FILTERS */}
      <Card
        style={{
          marginBottom: 20
        }}
      >
        <Space wrap>
          <Input
            allowClear
            prefix={
              <SearchOutlined />
            }
            placeholder="Поиск..."
            style={{
              width: 240
            }}
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <Select
            value={typeFilter}
            style={{
              width: 180
            }}
            onChange={
              setTypeFilter
            }
            options={[
              {
                value:
                  "all",
                label:
                  "Все типы"
              },
              {
                value:
                  "income",
                label:
                  "Доход"
              },
              {
                value:
                  "expense",
                label:
                  "Расход"
              }
            ]}
          />
        </Space>
      </Card>

      {/* TABLE */}
      <Table
        loading={loading}
        columns={columns}
        dataSource={
          filteredData
        }
        rowKey="id"
        pagination={{
          pageSize: 8
        }}
        scroll={{
          x: 800
        }}
      />

      {/* MODAL */}
      <Modal
        title="Добавить операцию"
        open={open}
        onOk={handleSubmit}
        onCancel={() =>
          setOpen(false)
        }
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="type"
            label="Тип"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Select
              options={[
                {
                  value:
                    "income",
                  label:
                    "Доход"
                },
                {
                  value:
                    "expense",
                  label:
                    "Расход"
                }
              ]}
            />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Сумма"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="Категория"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}