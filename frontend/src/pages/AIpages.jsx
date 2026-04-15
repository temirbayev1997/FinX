import { Card, Button, Select } from "antd";
import { useState } from "react";
import { generateReportAPI, downloadExcelAPI, askAI } from "../serv/api";

export default function AI() {
  const [mode, setMode] = useState("200");
  const [report, setReport] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

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

  const send = async () => {
    if (!message) return;

    const userMsg = { role: "user", text: message };
    setChat((prev) => [...prev, userMsg]);

    const res = await askAI(message);

    const aiMsg = { role: "ai", text: res.reply };
    setChat((prev) => [...prev, aiMsg]);

    setMessage("");
  };

  return (
    <div>

      <h1>AI Отчёты</h1>
      <Card style={{ marginBottom: 20 }}>
  <h3>🤖 AI Помощник</h3>

  {/* чат */}
  <div style={{ maxHeight: 300, overflowY: "auto", marginBottom: 10 }}>
    {chat.map((msg, i) => (
      <div key={i} style={{ marginBottom: 10 }}>
        <b>{msg.role === "user" ? "Ты" : "AI"}:</b>
        <div>{msg.text}</div>
      </div>
    ))}
  </div>

  {/* быстрые кнопки */}
  <div style={{ marginBottom: 10 }}>
    <Button onClick={() => setMessage("Как снизить расходы?")}>
      💸 Снизить расходы
    </Button>

    <Button
      style={{ marginLeft: 10 }}
      onClick={() => setMessage("Как увеличить прибыль?")}
    >
      📈 Увеличить прибыль
    </Button>
  </div>

  <input
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Спроси что-нибудь..."
    style={{ width: "100%", padding: 8 }}
  />

  <Button type="primary" onClick={send} style={{ marginTop: 10 }}>
    Отправить
  </Button>
</Card>
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