import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { Translation, ROUTES } from '@/shared/config';
import { route } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Tooltip } from '@/shared/ui/Tooltip';

interface ResourceEditButtonProps {
	isDisabled: boolean;
	resourceId: string;
}

export const ResourceEditButton = ({ isDisabled, resourceId }: ResourceEditButtonProps) => {
	const { t } = useTranslation();

	return (
		<Tooltip
			title={t(Translation.TOOLTIP_COLLECTION_DISABLED_INFO)}
			placement="bottom-start"
			color="red"
			offsetTooltip={10}
			shouldShowTooltip={isDisabled}
		>
			<NavLink
				style={{ marginLeft: 'auto' }}
				to={route(ROUTES.admin.resources.edit.page, resourceId)}
			>
				<Button disabled={isDisabled}>{t(Translation.EDIT)}</Button>
			</NavLink>
		</Tooltip>
	);
};
