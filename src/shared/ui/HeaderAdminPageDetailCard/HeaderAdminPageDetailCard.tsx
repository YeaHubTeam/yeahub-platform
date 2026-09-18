import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { i18Namespace, ROUTES, Translation } from '@/shared/config';
import { route } from '@/shared/libs';

import { BackHeader } from '../BackHeader';
import { Button } from '../Button';
import { DeleteButton, DeleteButtonProps } from '../DeleteButton';
import { Tooltip } from '../Tooltip';

type AdminEntity = keyof typeof ROUTES.admin;

type EntityRouteConfig = {
	readonly edit: {
		readonly page: string;
	};
};

interface HeaderAdminPageDetailCardProps {
	entity?: AdminEntity | EntityRouteConfig;
	onDelete?: () => void;
	isDisabled?: boolean;
	canDelete?: boolean;
	canEdit?: boolean;
	deleteButtonProps?: Omit<DeleteButtonProps, 'onDelete' | 'isDetailPage' | 'disabled'>;
	renderActions?: (id: string) => ReactNode;
}

const isAdminEntity = (value: string): value is AdminEntity => {
	return Object.prototype.hasOwnProperty.call(ROUTES.admin, value);
};

export const HeaderAdminPageDetailCard = ({
	entity,
	onDelete,
	isDisabled = false,
	canDelete = true,
	canEdit = true,
	deleteButtonProps,
	renderActions,
}: HeaderAdminPageDetailCardProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const params = useParams();

	const [id] = Object.values(params);

	const getEditPage = () => {
		if (entity && typeof entity !== 'string') {
			return entity.edit.page;
		}

		const entityFromUrl = pathname.split('/')[2] ?? '';
		const entityKey = entity ?? entityFromUrl;

		if (!isAdminEntity(entityKey)) {
			return null;
		}

		return ROUTES.admin[entityKey].edit.page;
	};

	const handleEdit = () => {
		const editPage = getEditPage();

		if (!id || !editPage) {
			return;
		}

		navigate(route(editPage, id));
	};

	return (
		<BackHeader>
			{canDelete && onDelete && (
				<DeleteButton
					{...deleteButtonProps}
					onDelete={onDelete}
					isDetailPage
					disabled={isDisabled}
				/>
			)}

			{id && renderActions?.(id)}

			{canEdit && (
				<Tooltip
					title={t(Translation.TOOLTIP_COLLECTION_DISABLED_INFO)}
					placement="bottom-start"
					color="red"
					offsetTooltip={10}
					shouldShowTooltip={isDisabled}
				>
					<Button disabled={isDisabled} onClick={handleEdit}>
						{t(Translation.EDIT)}
					</Button>
				</Tooltip>
			)}
		</BackHeader>
	);
};
