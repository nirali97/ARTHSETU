export async function evaluateCredit(data) {
  const response = await fetch("http://127.0.0.1:8000/api/v1/evaluate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Failed to get prediction from backend");
  }

  return await response.json();
}