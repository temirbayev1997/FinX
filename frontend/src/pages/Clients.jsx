import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Card,
  Row,
  Col,
  Statistic,
  Tag,
  Popconfirm,
  message
} from "antd";

import {
  PlusOutlined,
  DeleteOutlined
} from "@ant-design/icons";

import {
  getClients,
  createClient,
  deleteClient
} from "../serv/api";

export default function Clients() {
  const [data, setData] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form] = Form.useForm();

  const fetchData =
    async () => {
      setLoading(true);

      const res =
        await getClients();

      setData(res);

      setLoading(false);
    };

  useEffect(() => {
    fetchData();
  }, []);

  const addClient =
    async () => {
      const values =
        await form.validateFields();

      await createClient(values);

      message.success(
        "Клиент добавлен"
      );

      setOpen(false);
      form.resetFields();

      fetchData();
    };

  const removeClient =
    async (id) => {
      await deleteClient(id);

      message.success(
        "Удалено"
      );

      fetchData();
    };

  const stats =
    useMemo(() => {
      let total = 0;
      let debt = 0;

      data.forEach(
        (item) => {
          total += Number(
            item.total || 0
          );

          debt += Number(
            item.debt || 0
          );
        }
      );

      return {
        count: data.length,
        total,
        debt
      };
    }, [data]);

  const columns = [
    {
      title: "Клиент/Контрагент",
      dataIndex: "name"
    },
    {
      title: "Компания",
      dataIndex:
        "company"
    },
    {
      title: "Телефон",
      dataIndex: "phone"
    },
    {
      title: "Оплачено",
      dataIndex: "total"
    },
    {
      title: "Долг",
      dataIndex: "debt",
      render: (v) =>
        Number(v) > 0 ? (
          <Tag color="red">
            {v}
          </Tag>
        ) : (
          <Tag color="green">
            Нет
          </Tag>
        )
    },
    {
      title:
        "Последняя сделка",
      dataIndex:
        "lastDeal"
    },
    {
      title: "",
      render: (_, r) => (
        <Popconfirm
          title="Удалить?"
          onConfirm={() =>
            removeClient(
              r.id
            )
          }
        >
          <Button danger>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      )
    }
  ];

  return (
    <div>
      <Row
        justify="space-between"
        style={{
          marginBottom: 20
        }}
      >
        <h1>
          Клиенты/Контрагенты
        </h1>

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
      </Row>

      <Row
        gutter={16}
        style={{
          marginBottom: 20
        }}
      >
        <Col span={8}>
          <Card>
            <Statistic
              title="Клиентов/Контрагентов"
              value={
                stats.count
              }
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="Оборот"
              value={
                stats.total
              }
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="Долги"
              value={
                stats.debt
              }
            />
          </Card>
        </Col>
      </Row>

      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={data}
      />

      <Modal
        title="Новый клиент/контрагент"
        open={open}
        onOk={addClient}
        onCancel={() =>
          setOpen(false)
        }
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Имя"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="company"
            label="Компания"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Телефон"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="total"
            label="Оплачено"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="debt"
            label="Долг"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}