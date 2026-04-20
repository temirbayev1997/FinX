import {
  Card,
  Input,
  Button,
  message
} from "antd";

import {
  UserOutlined,
  LockOutlined
} from "@ant-design/icons";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../serv/api";

export default function Login() {
  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const login =
    async () => {
      try {
        const res =
          await loginUser({
            email,
            password
          });

        if (res.token) {
          localStorage.setItem(
            "token",
            res.token
          );

          message.success(
            "Добро пожаловать"
          );

          navigate("/app/");
        } else {
          message.error(
            res.message ||
            "Ошибка входа"
          );
        }

      } catch {
        message.error(
          "Ошибка входа"
        );
      }
    };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex justify-center items-center px-4">

      {/* фоновые круги */}
      <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl bottom-10 right-10"></div>
      <div className="absolute w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      <Card className="relative z-10 w-full max-w-md rounded-3xl shadow-2xl border-0 bg-white/95 backdrop-blur-md">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Вход
          </h1>

          <p className="text-slate-500 mt-2">
            Добро пожаловать обратно
          </p>
        </div>

        <div className="space-y-4">

          <Input
            size="large"
            placeholder="Email"
            prefix={<UserOutlined className="text-slate-400" />}
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="rounded-xl h-12"
          />

          <Input.Password
            size="large"
            placeholder="Пароль"
            prefix={<LockOutlined className="text-slate-400" />}
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="rounded-xl h-12"
          />

          <Button
            block
            size="large"
            onClick={login}
            className="!h-12 !rounded-xl !bg-slate-900 hover:!bg-blue-900 !text-white !font-semibold !border-none"
          >
            Войти
          </Button>

          <Button
            type="link"
            block
            onClick={() =>
              navigate("/register")
            }
            className="!text-slate-700"
          >
            Нет аккаунта?
          </Button>

        </div>
      </Card>
    </div>
  );
}