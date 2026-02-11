import { ComponentProps, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Marketplace, Tasks } from '@/shared/config';
import { Dropdown, Option } from '@/shared/ui/Dropdown';
import { SelectWithChips } from '@/shared/ui/SelectWithChips';

import { useGetTaskCategoriesQuery } from '../../api/taskApi';
import { taskCategories } from '../../model/constants/task';

type TaskCategorySelectProps = Omit<
	ComponentProps<typeof Dropdown>,
	'options' | 'type' | 'value' | 'onChange' | 'children'
> & {
	value: string | string[];
	onChange: (value: string[] | string) => void;
	hasMultiple?: boolean;
	disabled?: boolean;
};

type TaskCategoryType = {
	id: string;
	title: string;
};

export const TaskCategorySelect = ({
	onChange,
	value,
	hasMultiple,
	disabled,
}: TaskCategorySelectProps) => {
	const { t } = useTranslation(i18Namespace.task);

	const { data } = useGetTaskCategoriesQuery();

	const categories = data?.map((category) => ({
		id: category.code,
		title: t(taskCategories[category.code]),
	}));

	const [selectedCategories, setSelectedCategories] = useState<string[]>(
		Array.isArray(value) ? value : value !== undefined ? [value] : [],
	);

	const handleChangeCategory = (newValue: string | undefined) => {
		if (disabled || !newValue) return;
		const strValue = newValue;

		if (hasMultiple) {
			const updates = [...selectedCategories, strValue];
			setSelectedCategories(updates);
			onChange(updates);
		} else {
			setSelectedCategories([strValue]);
			onChange(strValue);
		}
	};

	const handleDeleteCategory = (id: string) => () => {
		if (disabled) return;
		const updates = selectedCategories.filter((categoryId) => categoryId !== id);
		setSelectedCategories(updates);
		onChange(updates);
	};

	const options = useMemo(() => {
		if (hasMultiple) {
			return (categories || [])
				.map((category) => ({
					label: category.title,
					value: category.id,
					limit: 100,
				}))
				.filter((category) => !selectedCategories?.includes(category.value));
		} else {
			return (categories || []).map((category) => ({
				label: category.title,
				value: category.id,
				limit: 100,
			}));
		}
	}, [selectedCategories, categories]);

	const categoriesDictionary = useMemo(() => {
		const emptyCategory: TaskCategoryType = {
			id: '0',
			title: t(Tasks.SELECT_CHOOSE),
		};
		return (categories || []).reduce(
			(acc, category) => {
				acc[category.id] = category;
				return acc;
			},
			{ '0': emptyCategory } as Record<string, TaskCategoryType>,
		);
	}, [categories]);

	if (!hasMultiple) {
		return (
			<>
				<Dropdown
					label={options.length ? t(Marketplace.SELECT_CHOOSE) : t(Marketplace.SELECT_EMPTY)}
					disabled={disabled}
					value={categoriesDictionary[selectedCategories[0]]?.title ?? ''}
					onSelect={(val) => handleChangeCategory(String(val))}
				>
					{options.map((option) => (
						<Option value={option.value} label={option.label} key={option.label} />
					))}
				</Dropdown>
			</>
		);
	}

	return (
		<SelectWithChips
			title={t(Tasks.SELECT_SELECTED)}
			options={options}
			onChange={handleChangeCategory}
			selectedItems={selectedCategories}
			handleDeleteItem={handleDeleteCategory}
			itemsDictionary={categoriesDictionary}
			placeholder={options.length ? t(Tasks.SELECT_CHOOSE) : t(Tasks.SELECT_EMPTY)}
			disabled={disabled}
		/>
	);
};
