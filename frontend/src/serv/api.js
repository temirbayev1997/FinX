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

export const downloadExcelAPI = async (data) => {
  const res = await fetch(`${BASE_URL}/excel/download`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.blob();
};