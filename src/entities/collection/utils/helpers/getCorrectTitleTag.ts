export const getCorrectTitleTag = (count: number): string => {
	if (count % 100 >= 11 && count % 100 <= 14) {
		return 'вопросов';
	}

	const lastDigit = count % 10;

	if (lastDigit === 1) {
		return 'вопрос';
	} else if (lastDigit >= 2 && lastDigit <= 4) {
		return 'вопроса';
	} else {
		return 'вопросов';
	}
};
