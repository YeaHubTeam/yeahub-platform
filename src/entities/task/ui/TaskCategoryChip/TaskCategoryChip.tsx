import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { StatusChip } from '@/shared/ui/StatusChip';

import { taskCategories } from '../../model/constants/task';
import { TaskCategoryCode } from '../../model/types/task';

interface TaskCategoryChipProps {
	category: TaskCategoryCode;
}

export const TaskCategoryChip = ({ category }: TaskCategoryChipProps) => {
	const { t } = useTranslation(i18Namespace.task);

	return (
		<StatusChip
			status={{
				variant: 'green',
				text: t(taskCategories[category]),
			}}
			size="medium"
		/>
	);
};
