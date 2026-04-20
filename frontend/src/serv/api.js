const BASE_URL = "http://localhost:5000/api";

export const generateReportAPI = async (data) => {
  const res = await fetch(`${BASE_URL}/ai/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const downloadExcel =
  async () => {
    const res = await fetch(
      `${BASE_URL}/excel/download`
    );

    const blob =
      await res.blob();

    const url =
      window.URL.createObjectURL(
        blob
      );

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "report.xlsx";

    link.click();
  };

export const getTransactions = async () => {
  const res = await fetch(`${BASE_URL}/transactions`);
  return res.json();
};

export const createTransaction = async (data) => {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const deleteTransaction = async (id) => {
  await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "DELETE",
  });
};

export const getTaxData = async () => {
  const res = await fetch(`${BASE_URL}/tax`);
  return res.json();
};

export const getAnalytics = async (period) => {
  const res = await fetch(`${BASE_URL}/analytics?period=${period}`);
  return res.json();
};

export const getInsights = async () => {
  const res = await fetch(`${BASE_URL}/ai/insights`);
  return res.json();
};

export const getForecast = async () => {
  const res = await fetch(`${BASE_URL}/analytics/forecast`);
  return res.json();
};

export const askAI = async (message) => {
  const res = await fetch(`${BASE_URL}/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  return res.json();
};

export const getClients =
  async () => {
    const res = await fetch(
      `${BASE_URL}/clients`
    );

    return res.json();
};

export const createClient =
  async (data) => {
    const res = await fetch(
      `${BASE_URL}/clients`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    return res.json();
};

export const deleteClient =
  async (id) => {
    await fetch(
      `${BASE_URL}/clients/${id}`,
      {
        method: "DELETE"
      }
    );
};

export const registerUser =
  async (data) => {
    const res = await fetch(
      `${BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    return res.json();
};

export const loginUser =
  async (data) => {
    const res = await fetch(
      `${BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    return res.json();
};

export const getProfile =
  async () => {
    const token =
      localStorage.getItem(
        "token"
      );

    const res = await fetch(
      `${BASE_URL}/auth/me`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    return res.json();
};

export const logoutUser =
  () => {
    localStorage.removeItem(
      "token"
    );
};