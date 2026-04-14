import { Card, Button, Select } from "antd";
import { useState } from "react";
import { generateReportAPI, downloadExcelAPI } from "../serv/api";

export default function AI() {
  const [mode, setMode] = useState("200");
  const [report, setReport] = useState("");

  const generate = async () => {
    const res = await generateReportAPI({ mode });
    setReport(res.report);
  };

  const download = async () => {
    const blob = await downloadExcelAPI({ mode });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.xlsx";
    a.click();
  };

  return (
    <div>

      <h1>AI Отчёты</h1>

      <Select
        value={mode}
        onChange={setMode}
        style={{ width: 200, marginBottom: 20 }}
        options={[
          { value: "200", label: "Форма 200" },
          { value: "220", label: "Форма 220" },
        ]}
      />

      <Card>
        <Button type="primary" onClick={generate}>
          🤖 Сформировать отчёт
        </Button>

        <Button style={{ marginLeft: 10 }} onClick={download}>
          📊 Excel
        </Button>

        {report && (
          <div style={{ marginTop: 20 }}>
            <pre>{report}</pre>
          </div>
        )}
      </Card>

    </div>
  );
}