import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  RobotOutlined,
  TableOutlined
} from "@ant-design/icons";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AIpages from "./pages/AIpages";

const { Sider, Content } = Layout;

function AppLayout() {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>

      {/* Sidebar */}
      <Sider theme="dark" width={220}>
        <h2 style={{ color: "white", padding: "20px" }}>ФинХ</h2>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={(e) => {
            if (e.key === "1") navigate("/");
            if (e.key === "2") navigate("/ai");
            if (e.key === "3") navigate("/transactions");
          }}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: "Главная",
            },
            {
              key: "2",
              icon: <RobotOutlined />,
              label: "AI отчёты",
            },
            {
              key: "3",
              icon: <TableOutlined />,
              label: "Операции",
            }
          ]}
        />
      </Sider>

      {/* Контент */}
      <Layout>
        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ai" element={<AIpages />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </Content>
      </Layout>

    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}