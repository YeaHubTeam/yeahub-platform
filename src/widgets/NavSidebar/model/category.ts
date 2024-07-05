interface CategoryCounts {
	[key: string]: number;
}

export const categoryTitles = {
	'': 'Главная',
	profile: 'Мой профиль',
	interview: 'Собеседование',
	edit: 'Редактирование',
	// ToDo: temporary link
};

export const categoryCounts: CategoryCounts = {
	profile: 0,
};
