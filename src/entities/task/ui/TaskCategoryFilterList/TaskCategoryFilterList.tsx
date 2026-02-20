import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks, Translation } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Button } from '@/shared/ui/Button';

import { useGetTaskCategoriesQuery } from '../../api/taskApi';
import { taskCategories } from '../../model/constants/task';
import { TaskCategoryCode } from '../../model/types/task';

import styles from './TaskCategoryFilterList.module.css';

interface TaskCategoryFilterListProps {
	categoriesLimit?: number;
	selectedCategory?: TaskCategoryCode;
	onChooseCategory: (category: TaskCategoryCode) => void;
}

const MAX_LIMIT_CATEGORIES = 4;

export const TaskCategoryFilterList = ({
	categoriesLimit,
	selectedCategory,
	onChooseCategory,
}: TaskCategoryFilterListProps) => {
	const { t } = useTranslation([i18Namespace.task, i18Namespace.translation]);
	const [showAll, setShowAll] = useState(false);
	const limit = categoriesLimit || MAX_LIMIT_CATEGORIES;

	const { data } = useGetTaskCategoriesQuery();
	const categories = data?.map((item) => ({
		id: item.code,
		title: t(taskCategories[item.code]),
	}));

	const hasHiddenCategories = (categories?.length ?? 0) > (categoriesLimit ?? MAX_LIMIT_CATEGORIES);

	const toggleShowAll = () => {
		setShowAll((prev) => !prev);
	};

	const preparedData = (showAll ? categories : categories?.slice(0, limit))?.map((category) => ({
		...category,
		active: selectedCategory === category.id,
	}));

	const onChooseType = (id: TaskCategoryCode) => {
		onChooseCategory(id);
	};

	return (
		<div className={styles.wrapper}>
			<BaseFilterSection
				data={preparedData ?? []}
				title={t(Tasks.CATEGORY_TITLE)}
				onClick={onChooseType}
			/>
			{hasHiddenCategories && (
				<Button className={styles.button} variant="link" onClick={toggleShowAll}>
					{!showAll
						? t(Translation.SHOW_ALL, { ns: i18Namespace.translation })
						: t(Translation.HIDE, { ns: i18Namespace.translation })}
				</Button>
			)}
		</div>
	);
};
