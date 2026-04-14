import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  DollarOutlined,
  RobotOutlined,
} from "@ant-design/icons";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Taxes from "./pages/Taxes";

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
            if (e.key === "2") navigate("/taxes");
          }}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: "Главная",
            },
            {
              key: "2",
              icon: <DollarOutlined />,
              label: "Налоги",
            },
            {
              key: "3",
              icon: <RobotOutlined />,
              label: "AI отчёты",
            },
          ]}
        />
      </Sider>

      {/* Контент */}
      <Layout>
        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/taxes" element={<Taxes />} />
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