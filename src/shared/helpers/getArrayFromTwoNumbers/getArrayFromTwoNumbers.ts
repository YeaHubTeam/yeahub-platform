export const getArrayFromTwoNumbers = (num1: number, num2: number) =>
	Array.from({ length: num2 - num1 + 1 }, (_, i) => num1 + i);
