import {
  Card,
  Button,
  Input,
  Typography,
  Space,
  Spin,
  message
} from "antd";

import {
  SendOutlined,
  FileExcelOutlined,
  RobotOutlined
} from "@ant-design/icons";

import { useState, useRef, useEffect } from "react";

import {
  generateReportAPI,
  downloadExcel,
  askAI
} from "../serv/api";

const { Title, Text } = Typography;

export default function AI() {
  const [report, setReport] = useState("");
  const [messageText, setMessageText] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reportLoading, setReportLoading] =
    useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [chat]);

  const generate = async () => {
    try {
      setReportLoading(true);

      const res = await generateReportAPI({
        mode: "220"
      });

      setReport(res.report);
    } catch {
      message.error("Ошибка отчёта");
    } finally {
      setReportLoading(false);
    }
  };

  const download = async () => {
    try {
      await downloadExcel();
    } catch {
      message.error("Ошибка Excel");
    }
  };




  const send = async (
    text = messageText
  ) => {
    if (!text.trim()) return;

    const userMsg = {
      role: "user",
      text
    };

    setChat((prev) => [
      ...prev,
      userMsg
    ]);

    setMessageText("");
    setLoading(true);

    try {
      const res = await askAI(text);

      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text: res.reply
        }
      ]);
    } catch {
      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Ошибка AI 😢"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const download220 = () => {
    window.open(
      "http://localhost:5000/api/forms/220-ai",
      "_blank"
    );
  };

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 24 }}>
        <Title
          level={2}
          style={{ marginBottom: 4 }}
        >
          AI Центр бизнеса
        </Title>

        <Text type="secondary">
          Аналитика, отчёты и формы
        </Text>
      </div>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: 20,
    alignItems: "start"
  }}
>
        {/* LEFT */}
        <div
  style={{
    display: "grid",
    gap: 20,
    position: "sticky",
    top: 20
  }}
>
          {/* CHAT */}
          <Card
            title="AI Помощник"
            extra={
              <Text
                style={{
                  color: "#16a34a"
                }}
              >
                ● online
              </Text>
            }
            bordered={false}
          >
            <div
              ref={chatRef}
              style={{
                height: 420,
                overflowY: "auto",
                marginBottom: 15
              }}
            >
              {chat.map(
                (msg, i) => (
                  <div
                    key={i}
                    style={{
                      textAlign:
                        msg.role ===
                        "user"
                          ? "right"
                          : "left",
                      marginBottom: 12
                    }}
                  >
                    <div
                      style={{
                        display:
                          "inline-block",
                        padding:
                          "10px 14px",
                        borderRadius: 16,
                        maxWidth:
                          "75%",
                        background:
                          msg.role ===
                          "user"
                            ? "#1677ff"
                            : "#f3f4f6",
                        color:
                          msg.role ===
                          "user"
                            ? "#fff"
                            : "#111"
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                )
              )}

              {loading && <Spin />}
            </div>

            <Space
  wrap
  style={{
    marginBottom: 12
  }}
>
  <Button
    onClick={() =>
      send("Как снизить расходы?")
    }
  >
    Расходы
  </Button>

  <Button
    onClick={() =>
      send("Как увеличить прибыль?")
    }
  >
    Прибыль
  </Button>

  <Button
    onClick={() =>
      send("Какие риски у бизнеса?")
    }
  >
    Риски
  </Button>

  <Button
    onClick={() =>
      send("Проанализируй мои расходы")
    }
  >
    Анализ расходов
  </Button>

  <Button
    onClick={() =>
      send("Как увеличить доход?")
    }
  >
    Рост прибыли
  </Button>

  <Button
    onClick={() =>
      send("Дай налоговые советы")
    }
  >
    Налоги
  </Button>
</Space>

            <Input.Search
              value={messageText}
              onChange={(e) =>
                setMessageText(
                  e.target.value
                )
              }
              onSearch={() => send()}
              placeholder="Спроси AI..."
              enterButton={
                <SendOutlined />
              }
            />
          </Card>

        </div>

        {/* RIGHT */}
        <div
          style={{
            display: "grid",
            gap: 20
          }}
        >
          {/* REPORT */}
          <Card
            title="AI Отчёты"
            bordered={false}
          >
            <Space
              direction="vertical"
              style={{
                width: "100%"
              }}
            >
              <Button
                type="primary"
                block
                icon={
                  <RobotOutlined />
                }
                loading={
                  reportLoading
                }
                onClick={generate}
              >
                Создать отчёт
              </Button>

              <Button
                block
                icon={
                  <FileExcelOutlined />
                }
                onClick={download}
              >
                Скачать Excel
              </Button>

              <Card
                size="small"
                style={{
                  minHeight: 260,
                  whiteSpace:
                    "pre-wrap",
                  background:
                    "#fafafa"
                }}
              >
                {reportLoading
                  ? "AI анализирует..."
                  : report ||
                    "Отчёт появится здесь"}
              </Card>
            </Space>
          </Card>

          {/* FORMS */}
          <Card
            title="Налоговые формы"
            bordered={false}
          >
            <Space
              direction="vertical"
              style={{
                width: "100%"
              }}
            >
              <Button
                block
                type="primary"
                onClick={
                  download220
                }
              >
                AI заполнить форму 220
              </Button>

              <Button
                block
                disabled
              >
                Форма 200 (скоро)
              </Button>

              <Text type="secondary">
                AI подставит данные
                из ваших операций.
              </Text>
            </Space>
          </Card>
        </div>
      </div>
    </div>
  );
}