import {
  Card,
  Row,
  Col,
  Statistic,
  Select
} from "antd";

import { Line } from "@ant-design/charts";
import { useEffect, useState } from "react";
import { getTaxData, getAnalytics, getInsights } from "../serv/api";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [chart, setChart] = useState([]);
  const [period, setPeriod] = useState("month");
  const [insights, setInsights] = useState("");
  const [forecast, setForecast] = useState(0);

  const fetchAll = async () => {
    const tax = await getTaxData();
    const analytics = await getAnalytics(period);

    // 🔥 трансформируем данные под AntCharts
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
  };

  const fetchInsights = async () => {
    const res = await getInsights();
    setInsights(res.insights);
  };

  const fetchForecast = async () => {
    const res = await getForecast();
    setForecast(res.forecast);
  };

  useEffect(() => {
    fetchAll();
    fetchInsights();
    fetchForecast();
  }, [period]);

  const config = {
    data: chart,
    xField: "date",
    yField: "value",
    seriesField: "type",
    smooth: true,
    height: 300,
    color: ["#52c41a", "#ff4d4f"], // зелёный / красный
  };

  return (
    <div>

      <h1 style={{ marginBottom: 20 }}>Главная</h1>

      {/* 🔹 Фильтр */}
      <Select
        value={period}
        onChange={setPeriod}
        style={{ marginBottom: 20, width: 200 }}
        options={[
          { value: "day", label: "День" },
          { value: "week", label: "Неделя" },
          { value: "month", label: "Месяц" },
          { value: "quarter", label: "Квартал" },
          { value: "year", label: "Год" },
        ]}
      />

      {/* 🔹 Статистика */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Баланс" value={data.profit} suffix="₸" />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="Доход" value={data.income} suffix="₸" />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="Расход" value={data.expense} suffix="₸" />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="Налог" value={data.tax} suffix="₸" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Прогноз (30 дней)"
              value={forecast}
              suffix="₸"
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>  
      </Row>

      {/* 🔥 ГРАФИК */}
      <Card style={{ marginTop: 20 }}>
        <h3>🤖 AI Рекомендации</h3>

        {insights ? (
          <p>{insights}</p>
        ) : (
          <p>Загрузка...</p>
        )}
      </Card>
    </div>
  );
}