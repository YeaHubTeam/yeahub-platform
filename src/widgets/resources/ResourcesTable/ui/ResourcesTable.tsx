import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Resources, Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { Resource } from '@/entities/resource';

import { DeleteResourceButton } from '@/features/resources/deleteResource';

interface UIResource extends Resource {
	disabled?: boolean;
}

interface ResourcesTableProps {
	resources?: UIResource[];
}

export const ResourcesTable = ({ resources }: ResourcesTableProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation([i18Namespace.resources, i18Namespace.translation]);

	const renderTableHeader = () => {
		const columns = {
			title: t(Resources.TITLE_SHORT),
			accessCategory: t(Resources.ACCESS_CATEGORY),
			description: t(Resources.DESCRIPTION),
			author: t(Resources.AUTHOR),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (resource: Resource) => {
		const columns = {
			title: resource.name,
			accessCategory: resource.accessCategory,
			description: resource.description,
			author: resource.url,
		};

		return Object.entries(columns)?.map(([k, v]) => (
			<td key={k}>
				{k === 'title' ? (
					<Link to={route(ROUTES.admin.resources.details.route, resource.id)}>
						<Text variant={'body3'} color={'purple-700'}>
							{v}
						</Text>
					</Link>
				) : (
					v
				)}
			</td>
		));
	};

	const renderActions = (resource: UIResource) => {
		const menuItems: PopoverMenuItem[] = [
			{
				icon: <Icon icon="eye" size={24} />,
				title: t(Translation.SHOW, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.resources.details.route, resource.id));
				},
			},
			{
				icon: <Icon icon="pen" size={24} />,
				title: t(Translation.EDIT, { ns: i18Namespace.translation }),
				disabled: resource.disabled,
				onClick: () => {
					navigate(route(ROUTES.admin.resources.edit.route, resource.id));
				},
			},
			{
				renderComponent: () => (
					<DeleteResourceButton resourceId={resource.id} disabled={resource.disabled} />
				),
			},
		];

		return (
			<Flex gap="4">
				<Popover menuItems={menuItems}>
					{({ onToggle }) => (
						<IconButton
							aria-label="go to details"
							form="square"
							icon={<Icon icon="dotsThreeVertical" size={20} />}
							size="medium"
							variant="tertiary"
							onClick={onToggle}
						/>
					)}
				</Popover>
			</Flex>
		);
	};

	if (!resources) {
		return null;
	}

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderActions={renderActions}
			items={resources}
		/>
	);
};
