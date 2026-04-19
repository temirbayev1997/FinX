import { useState } from "react";
import { Layout, Button, Tooltip } from "antd";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";

import { Routes, Route } from "react-router-dom";

import Sidebar from "./Sidebar";

import Dashboard from "../../pages/Dashboard";
import Transactions from "../../pages/Transactions";
import AIpages from "../../pages/AIpages";
import Clients from "../../pages/Clients";

const {
  Header,
  Content
} = Layout;

export default function AppLayout() {
  const [collapsed, setCollapsed] =
    useState(false);

  return (
    <Layout
      style={{
        minHeight:
          "100vh"
      }}
    >
      <Sidebar
        collapsed={collapsed}
      />

      <Layout>
        {/* HEADER */}
        <Header
          style={{
            background:
              "#fff",
            padding:
              "0 16px",
            display:
              "flex",
            alignItems:
              "center",
            boxShadow:
              "0 1px 4px rgba(0,0,0,0.06)"
          }}
        >
          <Tooltip
            title={
              collapsed
                ? "Открыть меню"
                : "Скрыть меню"
            }
          >
            <Button
              type="text"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined />
                ) : (
                  <MenuFoldOutlined />
                )
              }
              onClick={() =>
                setCollapsed(
                  !collapsed
                )
              }
              style={{
                fontSize: 18
              }}
            />
          </Tooltip>

          <div
            style={{
              marginLeft: 12,
              fontWeight: 600
            }}
          >
            Финансовая система для ИП
          </div>
        </Header>

        {/* CONTENT */}
        <Content
          style={{
            margin: 16,
            padding: 20,
            background:
              "#fff",
            borderRadius: 12
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard />
              }
            />

            <Route
              path="/ai"
              element={
                <AIpages />
              }
            />

            <Route
              path="/transactions"
              element={
                <Transactions />
              }
            />

            <Route
              path="/clients"
              element={
                <Clients />
              }
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}