export default async function calculate(input: string): Promise<Output> {
  try {
    let response = await fetch(
      `http://localhost:8080/calculate?expression=${encodeURIComponent(input)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "x-www-form-urlencoded",
        },
      }
    );

    if (response.ok) {
      const payload = (await response.json()) as Response;
      return {
        isValid: true,
        value: payload.result.toString(),
      };
    }

    if (response.status === 400) {
      return {
        isValid: false,
        value: await response.text(),
      };
    } else {
      return {
        isValid: false,
        value: "UNKOWN ERROR",
      };
    }
  } catch (error) {
    // If the response is not OK and not a 400, throw an error
    throw new Error(`Error while sending calulcation request: ${error}`);
  }
}

interface Output {
  value: string;
  isValid: boolean;
}

export interface Response {
  expression: string;
  result: number;
}
