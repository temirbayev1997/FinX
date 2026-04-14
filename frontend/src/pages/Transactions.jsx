import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Tag,
  Modal,
  Form,
  Input,
  Select,
} from "antd";

import {
  getTransactions,
  createTransaction,
  deleteTransaction,
} from "../serv/api";

export default function Transactions() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async () => {
    const res = await getTransactions();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const values = await form.validateFields();

    await createTransaction(values);

    setOpen(false);
    form.resetFields();
    fetchData();
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    fetchData();
  };

  const columns = [
    {
      title: "Дата",
      dataIndex: "created_at",
    },
    {
      title: "Тип",
      dataIndex: "type",
      render: (type) =>
        type === "income" ? (
          <Tag color="green">Доход</Tag>
        ) : (
          <Tag color="red">Расход</Tag>
        ),
    },
    {
      title: "Категория",
      dataIndex: "category",
    },
    {
      title: "Сумма",
      dataIndex: "amount",
    },
    {
      title: "Действия",
      render: (_, record) => (
        <Button danger onClick={() => handleDelete(record.id)}>
          Удалить
        </Button>
      ),
    },
  ];

  return (
    <div>

      <h1 style={{ marginBottom: 20 }}>Операции</h1>

      <Button type="primary" onClick={() => setOpen(true)}>
        + Добавить
      </Button>

      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={data}
        rowKey="id"
      />

      {/* Модалка */}
      <Modal
        title="Добавить операцию"
        open={open}
        onOk={handleSubmit}
        onCancel={() => setOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="type" label="Тип" required>
            <Select
              options={[
                { value: "income", label: "Доход" },
                { value: "expense", label: "Расход" },
              ]}
            />
          </Form.Item>

          <Form.Item name="amount" label="Сумма" required>
            <Input />
          </Form.Item>

          <Form.Item name="category" label="Категория">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
}