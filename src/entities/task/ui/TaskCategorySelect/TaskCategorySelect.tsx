import { useTranslation } from 'react-i18next';

import { i18Namespace, Marketplace } from '@/shared/config';
import { EntitySelect, type EntitySelectProps } from '@/shared/ui/EntitySelect';

import { useGetTaskCategoriesQuery } from '../../api/taskApi';
import { taskCategories } from '../../model/constants/task';

export type TaskCategorySelectProps = Pick<
	EntitySelectProps<string>,
	'value' | 'onChange' | 'hasMultiple' | 'disabled'
>;

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

	return (
		<EntitySelect
			items={categories || []}
			value={value}
			onChange={onChange}
			hasMultiple={hasMultiple}
			disabled={disabled}
			chooseTranslationKey={t(Marketplace.SELECT_CHOOSE)}
			emptyTranslationKey={t(Marketplace.SELECT_EMPTY)}
			selectedTranslationKey={t(Marketplace.SELECT_SELECTED)}
		/>
	);
};
