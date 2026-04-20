import {
  Card,
  Input,
  Button,
  Select,
  message
} from "antd";

import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  IdcardOutlined,
  ShopOutlined
} from "@ant-design/icons";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../serv/api";

const { Option } = Select;

export default function Register() {
  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      full_name: "",
      bin_iin: "",
      phone: "",
      email: "",
      password: "",
      business_name: "",
      category: ""
    });

  const changeValue = (
    key,
    value
  ) => {
    setForm({
      ...form,
      [key]: value
    });
  };

  const register =
    async () => {
      try {
        const res =
          await registerUser(
            form
          );

        if (res.message) {
          message.success(
            res.message
          );
        }

        navigate("/login");

      } catch {
        message.error(
          "Ошибка регистрации"
        );
      }
    };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex justify-center items-center px-4 py-8">

      {/* фон */}
      <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl bottom-10 right-10"></div>
      <div className="absolute w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      <Card className="relative z-10 w-full max-w-xl rounded-3xl shadow-2xl border-0 bg-white/95 backdrop-blur-md">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Регистрация
          </h1>

          <p className="text-slate-500 mt-2">
            Создайте аккаунт предпринимателя
          </p>
        </div>

        <div className="space-y-4">

          <Input
            size="large"
            placeholder="ФИО"
            prefix={<UserOutlined className="text-slate-400" />}
            value={form.full_name}
            onChange={(e) =>
              changeValue(
                "full_name",
                e.target.value
              )
            }
            className="rounded-xl h-12"
          />

          <Input
            size="large"
            placeholder="БИН / ИИН"
            prefix={<IdcardOutlined className="text-slate-400" />}
            value={form.bin_iin}
            onChange={(e) =>
              changeValue(
                "bin_iin",
                e.target.value
              )
            }
            className="rounded-xl h-12"
          />

          <Input
            size="large"
            placeholder="Телефон"
            prefix={<PhoneOutlined className="text-slate-400" />}
            value={form.phone}
            onChange={(e) =>
              changeValue(
                "phone",
                e.target.value
              )
            }
            className="rounded-xl h-12"
          />

          <Input
            size="large"
            placeholder="Email"
            prefix={<MailOutlined className="text-slate-400" />}
            value={form.email}
            onChange={(e) =>
              changeValue(
                "email",
                e.target.value
              )
            }
            className="rounded-xl h-12"
          />

          <Input
            size="large"
            placeholder="Юридический адрес"
            value={form.legal_address}
            onChange={(e)=>
              changeValue(
              "legal_address",
              e.target.value
              )
            }
          />

          <Input.Password
            size="large"
            placeholder="Пароль"
            prefix={<LockOutlined className="text-slate-400" />}
            value={form.password}
            onChange={(e) =>
              changeValue(
                "password",
                e.target.value
              )
            }
            className="rounded-xl h-12"
          />

          <Input
            size="large"
            placeholder="Название ИП"
            prefix={<ShopOutlined className="text-slate-400" />}
            value={form.business_name}
            onChange={(e) =>
              changeValue(
                "business_name",
                e.target.value
              )
            }
            className="rounded-xl h-12"
          />

          <Select
            size="large"
            placeholder="Категория бизнеса"
            className="w-full"
            onChange={(value) =>
              changeValue(
                "category",
                value
              )
            }
          >
            <Option value="retail">
              Розничная торговля
            </Option>

            <Option value="services">
              Услуги
            </Option>

            <Option value="food">
              Общепит
            </Option>

            <Option value="it">
              IT / Digital
            </Option>

            <Option value="other">
              Другое
            </Option>
          </Select>

          <Select
            size="large"
            placeholder="Налоговый режим"
            disabled
            className="w-full"
          >
            <Option>
              В разработке
            </Option>
          </Select>

          <Input
            size="large"
            placeholder="Лицензии (в разработке)"
            disabled
            className="rounded-xl h-12"
          />

          <Button
            block
            size="large"
            onClick={register}
            className="!h-12 !rounded-xl !bg-slate-900 hover:!bg-blue-900 !text-white !font-semibold !border-none"
          >
            Зарегистрироваться
          </Button>

          <Button
            type="link"
            block
            onClick={() =>
              navigate("/login")
            }
            className="!text-slate-700"
          >
            Уже есть аккаунт?
          </Button>

        </div>
      </Card>
    </div>
  );
}