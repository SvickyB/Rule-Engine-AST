const API_BASE_URL = 'http://localhost:3000/api';

export const fetchRules = async () => {
  const response = await fetch(`${API_BASE_URL}/rules`);
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data;
};

export const getRule = async (id) => {
  const response = await fetch(`${API_BASE_URL}/rules/${id}`);
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data;
};

export const createRule = async (ruleData) => {
  const response = await fetch(`${API_BASE_URL}/rules`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ruleData),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data;
};

export const updateRule = async (id, ruleData) => {
  const response = await fetch(`${API_BASE_URL}/rules/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ruleData),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data;
};

export const deleteRule = async (id) => {
  const response = await fetch(`${API_BASE_URL}/rules/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data;
};

export const evaluateRule = async (ruleId, data) => {
  const response = await fetch(`${API_BASE_URL}/rules/evaluate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rule_id: ruleId, data }),
  });
  const responseData = await response.json();
  if (!responseData.success) throw new Error(responseData.error);
  return responseData;
};

export const combineRules = async (rulesData) => {
  const response = await fetch(`${API_BASE_URL}/rules/combine`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rulesData),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data;
};