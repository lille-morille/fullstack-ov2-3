const baseUrl = "http://localhost:7878/api";

export async function register(args: {
  username: string;
  password: string;
}): Promise<string> {
  const response = await fetch(`${baseUrl}/user/register`, {
    method: "POST",
    body: JSON.stringify(args),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to register user + ${await response.text()}`);
  }

  const body = await response.json();
  return body.token;
}

export async function login(args: {
  username: string;
  password: string;
}): Promise<string> {
  const response = await fetch(`${baseUrl}/user/login`, {
    method: "POST",
    body: JSON.stringify(args),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to login user + ${await response.text()}`);
  }

  const body = await response.json();
  return body.token;
}

export async function saveCalculation(args: {
  expression: string;
  result: number;
  jwt: string;
}) {
  const response = await fetch(`${baseUrl}/calculation/save`, {
    method: "POST",
    body: JSON.stringify(args),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${args.jwt}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to save calculation + ${await response.text()}`);
  }
}

export async function getCalculationHistory(args: {
  size: number;
  page: number;
  jwt: string;
}): Promise<CalculationHistory> {
  const params = new URLSearchParams();
  params.append("page", args.page.toString());
  params.append("size", args.size.toString());
  const response = await fetch(`${baseUrl}/calculation/history?${params}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${args.jwt}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to get calculation history + ${await response.text()}`
    );
  }

  const body: CalculationHistoryResponse = await response.json();
  return {
    calculations: body.content,
    isLast: body.last,
    totalPages: body.totalPages,
  };
}

export interface CalculationHistory {
  calculations: Calculation[];
  isLast: boolean;
  totalPages: number;
}

interface CalculationHistoryResponse {
  content: Calculation[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export interface Calculation {
  expression: string;
  result: number;
}
