export const getReadingTime = (html?: string) => {
	if (!html) return '1 мин чтения';
	const text = html.replace(/<[^>]*>/g, '').trim();
	const words = text ? text.split(/\s+/).length : 0;
	const minutes = Math.max(1, Math.ceil(words / 180));

	const lastDigit = minutes % 10;
	const lastTwoDigits = minutes % 100;

	let unit = 'минут';
	if (lastTwoDigits < 11 || lastTwoDigits > 14) {
		if (lastDigit === 1) unit = 'минута';
		else if (lastDigit >= 2 && lastDigit <= 4) unit = 'минуты';
	}

	return `${minutes} ${unit} чтения`;
};
