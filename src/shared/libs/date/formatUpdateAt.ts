export const formatUpdatedAt = (updatedAt: string): string =>
	new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		timeZone: 'UTC',
	}).format(new Date(updatedAt));
