import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { Translation, ROUTES } from '@/shared/config';
import { route } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';

interface TaskEditButtonProps {
	taskId: string;
}

export const TaskEditButton = ({ taskId }: TaskEditButtonProps) => {
	const { t } = useTranslation();

	return (
		<NavLink style={{ marginLeft: 'auto' }} to={route(ROUTES.admin.tasks.edit.page, taskId)}>
			<Button>{t(Translation.EDIT)}</Button>
		</NavLink>
	);
};
