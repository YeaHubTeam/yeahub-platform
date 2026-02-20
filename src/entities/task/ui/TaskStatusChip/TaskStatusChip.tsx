import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { StatusChip, StatusChipItem, StatusChipSize } from '@/shared/ui/StatusChip';

import type { TaskStatus } from '../../model/types/task';

interface TaskStatusChipProps {
	status: TaskStatus;
	size?: StatusChipSize;
}

export const TaskStatusChip = ({ status, size = 'small' }: TaskStatusChipProps) => {
	const { t } = useTranslation(i18Namespace.task);

	const statuses: Record<TaskStatus, StatusChipItem> = {
		attempted: {
			text: t(Tasks.STATUS_ATTEMPTED),
			variant: 'yellow',
		},
		not_started: {
			text: t(Tasks.STATUS_NOT_STARTED),
			variant: 'purple',
		},
		solved: {
			text: t(Tasks.STATUS_SOLVED),
			variant: 'green',
		},
	};

	return <StatusChip status={statuses[status]} size={size} />;
};
