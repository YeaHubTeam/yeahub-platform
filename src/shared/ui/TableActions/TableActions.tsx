import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, ROUTES, Translation } from '@/shared/config';
import { route } from '@/shared/libs';
import { CopyButton } from '@/shared/ui/CopyButton';
import { DeleteButton } from '@/shared/ui/DeleteButton';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, type PopoverMenuItem } from '@/shared/ui/Popover';

import type { TableAction, TableActionsProps } from './types';

const getMenuActions = (actions: TableAction[]) => {
	return actions.filter((action): action is Exclude<TableAction, 'copy'> => action !== 'copy');
};

export const TableActions = ({
	actions = [],
	entity,
	id,
	disabled = false,
	onDelete,
}: TableActionsProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation(i18Namespace.translation);

	if (actions.length === 0) {
		return null;
	}

	const entityRoutes = ROUTES.admin[entity];
	const detailPath = route(entityRoutes.details.route, id);
	const editPath = route(entityRoutes.edit.route, id);
	const hasCopy = actions.includes('copy');
	const menuActions = getMenuActions(actions).filter((action) => action !== 'delete' || onDelete);

	const disabledTooltip = {
		color: 'red' as const,
		text: t(Translation.TOOLTIP_COLLECTION_DISABLED_INFO),
	};

	const menuItems = menuActions.flatMap((action): PopoverMenuItem[] => {
		if (action === 'detail') {
			return [
				{
					icon: <Icon icon="eye" size={24} />,
					title: t(Translation.SHOW),
					onClick: () => navigate(detailPath),
				},
			];
		}

		if (action === 'edit') {
			return [
				{
					icon: <Icon icon="pen" size={24} />,
					title: t(Translation.EDIT),
					disabled,
					tooltip: disabled ? disabledTooltip : undefined,
					onClick: () => navigate(editPath),
				},
			];
		}

		if (action === 'delete' && onDelete) {
			return [
				{
					renderComponent: () => <DeleteButton onDelete={onDelete} disabled={disabled} />,
				},
			];
		}

		return [];
	});

	const renderSingleMenuAction = (action: Exclude<TableAction, 'copy'>) => {
		if (action === 'detail') {
			return (
				<IconButton
					aria-label={t(Translation.SHOW)}
					form="square"
					icon={<Icon icon="eye" size={20} />}
					size="medium"
					variant="tertiary"
					onClick={() => navigate(detailPath)}
				/>
			);
		}

		if (action === 'edit') {
			return (
				<IconButton
					aria-label={t(Translation.EDIT)}
					disabled={disabled}
					form="square"
					icon={<Icon icon="pen" size={20} />}
					size="medium"
					variant="tertiary"
					onClick={() => navigate(editPath)}
				/>
			);
		}

		if (!onDelete) {
			return null;
		}

		return <DeleteButton onDelete={onDelete} disabled={disabled} />;
	};

	const renderMenu = () => {
		if (menuItems.length === 0) {
			return null;
		}

		if (menuItems.length === 1) {
			return renderSingleMenuAction(menuActions[0]);
		}

		return (
			<Popover menuItems={menuItems}>
				{({ onToggle }) => (
					<IconButton
						aria-label={t(Translation.MORE)}
						form="square"
						icon={<Icon icon="dotsThreeVertical" size={20} />}
						size="medium"
						variant="tertiary"
						onClick={onToggle}
					/>
				)}
			</Popover>
		);
	};

	return (
		<Flex gap="4">
			{renderMenu()}
			{hasCopy && <CopyButton text={id} />}
		</Flex>
	);
};
