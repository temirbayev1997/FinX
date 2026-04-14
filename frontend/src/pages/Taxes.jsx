import { useState } from "react";
import { Card, Select, Row, Col, Button, Typography } from "antd";
import { generateReportAPI, downloadExcelAPI } from "../serv/api";

const { Title, Paragraph } = Typography;

export default function Taxes() {
  const [mode, setMode] = useState("200");
  const [report, setReport] = useState("");

  const data = {
    income: 1000000,
    expense: 300000,
    mode,
  };

  const generateReport = async () => {
    const res = await generateReportAPI(data);
    setReport(res.report);
  };

  const downloadExcel = async () => {
    const blob = await downloadExcelAPI(data);

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "report.xlsx";
    a.click();
  };

  return (
    <div>

      <Title level={2}>Налоги</Title>

      {/* Выбор режима */}
      <Select
        value={mode}
        onChange={setMode}
        style={{ width: 200, marginBottom: 20 }}
        options={[
          { value: "200", label: "Форма 200" },
          { value: "220", label: "Форма 220" },
        ]}
      />

      {/* Карточки */}
      <Row gutter={16}>

        <Col span={6}>
          <Card>
            <b>Доход:</b> 1 000 000 ₸
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <b>Расход:</b> 300 000 ₸
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <b>Прибыль:</b> 700 000 ₸
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <b>Налог:</b> {mode === "200" ? "30 000 ₸" : "70 000 ₸"}
          </Card>
        </Col>

      </Row>

      {/* Кнопки */}
      <div style={{ marginTop: 20 }}>

        <Button type="primary" onClick={generateReport}>
          🤖 Сформировать отчёт
        </Button>

        <Button
          style={{ marginLeft: 10 }}
          type="default"
          onClick={downloadExcel}
        >
          📊 Скачать Excel
        </Button>

      </div>

      {/* AI отчёт */}
      {report && (
        <Card style={{ marginTop: 20 }}>
          <Title level={4}>AI анализ</Title>
          <Paragraph>{report}</Paragraph>
        </Card>
      )}

    </div>
  );
}