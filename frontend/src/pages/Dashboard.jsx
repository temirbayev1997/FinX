import {
  Card,
  Row,
  Col,
  Statistic,
  Select,
  Tag,
  Progress,
  Spin
} from "antd";

import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  RiseOutlined,
  RobotOutlined
} from "@ant-design/icons";

import { Line } from "@ant-design/charts";
import { useEffect, useState } from "react";

import {
  getTaxData,
  getAnalytics,
  getInsights,
  getForecast
} from "../serv/api";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [chart, setChart] = useState([]);
  const [period, setPeriod] = useState("month");
  const [insights, setInsights] = useState("");
  const [forecast, setForecast] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      setLoading(true);

      const tax = await getTaxData();
      const analytics = await getAnalytics(period);
      const ai = await getInsights();
      const fc = await getForecast();

      const formatted = [];

      analytics.forEach((item) => {
        formatted.push({
          date: item.date,
          type: "Доход",
          value: Number(item.income),
        });

        formatted.push({
          date: item.date,
          type: "Расход",
          value: Number(item.expense),
        });
      });

      setData(tax);
      setChart(formatted);
      setInsights(ai.insights);
      setForecast(fc.forecast);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [period]);

  const income = Number(data.income || 0);
  const expense = Number(data.expense || 0);
  const profit = Number(data.profit || 0);
  const tax = Number(data.tax || 0);

  const margin =
    income > 0
      ? ((profit / income) * 100).toFixed(1)
      : 0;

  const growth =
    income > 0
      ? (((income - expense) / income) * 100).toFixed(1)
      : 0;

  const status =
    profit <= 0
      ? {
          text: "Риск",
          color: "red"
        }
      : margin < 20
      ? {
          text: "Стабильно",
          color: "orange"
        }
      : {
          text: "Рост",
          color: "green"
        };

  const config = {
    data: chart,
    xField: "date",
    yField: "value",
    seriesField: "type",
    smooth: true,
    height: 340,
    color: ["#52c41a", "#ff4d4f"],
    legend: {
      position: "top"
    },
    point: {
      size: 4
    }
  };

  return (
    <div style={{ padding: 10 }}>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: 20 }}
      >
        <Col>
          <h1 style={{ margin: 0 }}>
            Главная панель
          </h1>
        </Col>

        <Col>
          <Select
            value={period}
            onChange={setPeriod}
            style={{ width: 180 }}
            options={[
              { value: "day", label: "День" },
              { value: "week", label: "Неделя" },
              { value: "month", label: "Месяц" },
              { value: "quarter", label: "Квартал" },
              { value: "year", label: "Год" },
            ]}
          />
        </Col>
      </Row>

      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          {/* KPI */}
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card bordered={false}>
                <Statistic
                  title="Доход"
                  value={income}
                  suffix="₸"
                  valueStyle={{
                    color: "#3f8600"
                  }}
                  prefix={<ArrowUpOutlined />}
                />
              </Card>
            </Col>

            <Col span={6}>
              <Card bordered={false}>
                <Statistic
                  title="Расход"
                  value={expense}
                  suffix="₸"
                  valueStyle={{
                    color: "#cf1322"
                  }}
                  prefix={<ArrowDownOutlined />}
                />
              </Card>
            </Col>

            <Col span={6}>
              <Card bordered={false}>
                <Statistic
                  title="Прибыль"
                  value={profit}
                  suffix="₸"
                  prefix={<RiseOutlined />}
                />
              </Card>
            </Col>

            <Col span={6}>
              <Card bordered={false}>
                <Statistic
                  title="Налог"
                  value={tax}
                  suffix="₸"
                />
              </Card>
            </Col>
          </Row>

          {/* STATUS */}
          <Row
            gutter={[16, 16]}
            style={{ marginTop: 16 }}
          >
            <Col span={8}>
              <Card title="Статус бизнеса">
                <Tag color={status.color}>
                  {status.text}
                </Tag>

                <p
                  style={{
                    marginTop: 15
                  }}
                >
                  Маржинальность:
                  {" "}
                  {margin}%
                </p>

                <Progress
                  percent={Number(margin)}
                />
              </Card>
            </Col>

            <Col span={8}>
              <Card title="Рост">
                <Statistic
                  value={growth}
                  suffix="%"
                  valueStyle={{
                    color:
                      growth >= 0
                        ? "#3f8600"
                        : "#cf1322"
                  }}
                />
              </Card>
            </Col>

            <Col span={8}>
              <Card title="Прогноз 30 дней">
                <Statistic
                  value={forecast}
                  suffix="₸"
                  valueStyle={{
                    color: "#1890ff"
                  }}
                />
              </Card>
            </Col>
          </Row>

          {/* CHART */}
          <Card
            style={{ marginTop: 20 }}
            title="Доход / Расход"
          >
            <Line {...config} />
          </Card>

          {/* AI */}
          <Card
            style={{ marginTop: 20 }}
            title={
              <>
                <RobotOutlined />
                {" "}
                AI Инсайты
              </>
            }
          >
            {insights ? (
              <div
                style={{
                  whiteSpace:
                    "pre-line",
                  lineHeight: 1.8
                }}
              >
                {insights}
              </div>
            ) : (
              "Нет данных"
            )}
          </Card>
        </>
      )}
    </div>
  );
}