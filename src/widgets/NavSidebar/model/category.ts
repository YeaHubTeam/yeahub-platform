interface CategoryCounts {
	[key: string]: number;
}

export const categoryTitles = {
	'': 'Главная',
	profile: 'Мой профиль',
	editProfile: 'Редактирование',
	// ToDo: temporary link
};

export const categoryCounts: CategoryCounts = {
	profile: 0,
};
