import {
  Layout,
  Menu
} from "antd";

import {
  DashboardOutlined,
  RobotOutlined,
  TableOutlined
} from "@ant-design/icons";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

const { Sider } = Layout;

export default function Sidebar({
  collapsed
}) {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const getSelectedKey = () => {
      if (location.pathname === "/app/dashboard") return ["1"];
      if (location.pathname === "/app/ai") return ["2"];
      if (location.pathname === "/app/transactions") return ["3"];
      if (location.pathname === "/app/clients") return ["4"];
    return ["1"];
  };

  return (
    <Sider
      collapsible
      trigger={null}
      collapsed={collapsed}
      width={230}
      collapsedWidth={80}
      theme="dark"
    >
      <div
        style={{
          height: 64,
          display:
            "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          color: "#fff",
          fontSize: 22,
          fontWeight: 700,
          borderBottom:
            "1px solid rgba(255,255,255,0.08)"
        }}
      >
        {collapsed
          ? "Ф"
          : "ФинХ"}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={getSelectedKey()}
        onClick={(e) => {
          if (
            e.key ===
            "1"
          )
            navigate("/app/dashboard");
            
          if (
            e.key ===
            "2"
          )
            navigate("/app/ai");

          if (
            e.key ===
            "3"
          )
            navigate("/app/transactions");

          if (
            e.key ===
            "4"
          )
            navigate("/app/clients");
        }}
        items={[
          {
            key: "1",
            icon: (
              <DashboardOutlined />
            ),
            label:
              "Главная"
          },
          {
            key: "2",
            icon: (
              <RobotOutlined />
            ),
            label:
              "AI отчёты"
          },
          {
            key: "3",
            icon: (
              <TableOutlined />
            ),
            label:
              "Операции"
          },
          {
            key: "4",
            icon: (
              <TableOutlined />
            ),
            label:
              "Клиенты"
          }
        ]}
      />
    </Sider>
  );
}