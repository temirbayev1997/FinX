import { Card, Button, Select } from "antd";
import { useRef, useEffect, useState } from "react";
import { generateReportAPI, downloadExcelAPI, askAI } from "../serv/api";

export default function AI() {
  const [mode, setMode] = useState("200");
  const [report, setReport] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);

  const generate = async () => {
    setReportLoading(true);
    const res = await generateReportAPI({ mode });
    setReport(res.report);
    setReportLoading(false);
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

    setLoading(true);

    const userMsg = { role: "user", text: message };
    setChat((prev) => [...prev, userMsg]);

    try {
      const res = await askAI(message);

      const aiMsg = { role: "ai", text: res.reply };
      setChat((prev) => [...prev, aiMsg]);
    } catch {
      setChat((prev) => [
        ...prev,
        { role: "ai", text: "Ошибка AI 😢" },
      ]);
    }

    setLoading(false);
    setMessage("");
  };

  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [chat]);

  return (
    <div>
      <h1>AI Отчёты</h1>
        <Card style={{ marginBottom: 20 }}>
      <h3>AI Помощник</h3>
      <div style={{ maxHeight: 300, overflowY: "auto", marginBottom: 10 }} ref={chatRef}>
{chat.map((msg, i) => (
  <div
    key={i}
    style={{
      textAlign: msg.role === "user" ? "right" : "left",
      marginBottom: 10,
    }}
  >
    <div
      style={{
        display: "inline-block",
        background: msg.role === "user" ? "#1677ff" : "#1f1f1f",
        color: "white",
        padding: "8px 12px",
        borderRadius: 10,
        maxWidth: "70%",
      }}
    >
      {msg.text}
    </div>
  </div>
))}
      </div>
  <div style={{ marginBottom: 10 }}>
    <Button onClick={() => {
  setMessage("Как снизить расходы?");
  setTimeout(send, 100);
}}  >
      Снизить расходы
    </Button>

    <Button
      style={{ marginLeft: 10 }}
      onClick={() => setMessage("Как увеличить прибыль?")}
    >
      Увеличить прибыль
    </Button>
  </div>

<input
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && send()}
  placeholder="Спроси что-нибудь..."
  style={{ width: "100%", padding: 8 }}
/>

  <Button type="primary" onClick={send} style={{ marginTop: 10 }} loading={loading} >
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
        <Button type="primary" onClick={generate} loading={reportLoading}>
          Сформировать отчёт
        </Button>

        <Button style={{ marginLeft: 10 }} onClick={download}>
          Excel
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