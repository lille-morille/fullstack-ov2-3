export default function calculate(input: string): Output {
  let value = "";
  let isValid = true;
  try {
    if (input.includes("/0")) {
      value = "DIV BY ZERO";
      isValid = false;
    } else {
      const result: number = eval(input);
      value = result.toString();
    }
  } catch (error) {
    value = "ERROR";
    isValid = false;
  } finally {
    return {
      isValid,
      value,
    };
  }
}

interface Output {
  value: string;
  isValid: boolean;
}
