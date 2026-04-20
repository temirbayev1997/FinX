import {
  Card,
  Button,
  Input,
  Divider,
  Spin,
  message
} from "antd";

import {
  EditOutlined,
  SaveOutlined,
  LockOutlined
} from "@ant-design/icons";

import {
  useEffect,
  useState
} from "react";

import {
  getProfile
} from "../../serv/api";

export default function Profile() {
  const [user, setUser] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  const [editMode,
    setEditMode] =
    useState(false);

  const [password,
    setPassword] =
    useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile =
    async () => {
      try {
        const res =
          await getProfile();

        setUser(res);

      } catch {
        message.error(
          "Ошибка загрузки профиля"
        );
      } finally {
        setLoading(false);
      }
    };

  const saveProfile =
    async () => {
      message.success(
        "Изменения сохранены"
      );

      setEditMode(false);
    };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spin size="large" />
      </div>
    );
  }

  const Row = ({
    label,
    value
  }) => (
    <div className="grid grid-cols-2 gap-4 py-2 border-b border-slate-100 last:border-0">
      <div className="text-slate-500 text-sm">
        {label}
      </div>

      <div className="text-slate-900 font-medium text-sm break-all text-right">
        {value || "-"}
      </div>
    </div>
  );

  return (
    <div className="p-6">

        {/* header */}
        <div className="flex justify-between items-start gap-4">

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Профиль
            </h1>

            <p className="text-slate-500 mt-1 text-sm">
              Личные и бизнес данные
            </p>
          </div>

          {!editMode ? (
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                setEditMode(true)
              }
              className="rounded-xl h-10"
            >
              Редактировать
            </Button>
          ) : (
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={saveProfile}
              className="rounded-xl h-10"
            >
              Сохранить
            </Button>
          )}

        </div>

        <Divider className="my-5" />

        {/* Основное */}
        <div>

          <h2 className="text-lg font-semibold text-slate-900 mb-3">
            Основная информация
          </h2>

          <div className="bg-slate-50 rounded-2xl px-4 py-2">

            <Row
              label="ФИО"
              value={user.full_name}
            />

            <Row
              label="Email"
              value={user.email}
            />

            <Row
              label="Телефон"
              value={user.phone}
            />

          </div>

        </div>

        <Divider className="my-5" />

        {/* Бизнес */}
        <div>

          <h2 className="text-lg font-semibold text-slate-900 mb-3">
            Бизнес информация
          </h2>

          <div className="bg-slate-50 rounded-2xl px-4 py-2">

            <Row
              label="БИН / ИИН"
              value={user.bin_iin}
            />

            <Row
              label="Название ИП"
              value={user.business_name}
            />

            <Row
              label="Категория"
              value={user.category}
            />

            <Row
              label="Юридический адрес"
              value={user.legal_address}
            />

            <Row
              label="Налоговый режим"
              value="В разработке"
            />

            <Row
              label="Лицензии"
              value="В разработке"
            />

          </div>

        </div>

        <Divider className="my-5" />

        {/* Безопасность */}
        <div>

          <h2 className="text-lg font-semibold text-slate-900 mb-3">
            Безопасность
          </h2>

          <div className="bg-slate-50 rounded-2xl px-4 py-4">

            {editMode ? (
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Новый пароль"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="h-10 rounded-xl max-w-md"
              />
            ) : (
              <p className="text-slate-500 text-sm">
                Для смены пароля нажмите
                "Редактировать"
              </p>
            )}

          </div>

        </div>

    </div>
  );
}