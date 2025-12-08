import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { i18Namespace, ROUTES, Translation, User as Users } from '@/shared/config';
import { route } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, PopoverMenuItem, PopoverChildrenProps } from '@/shared/ui/Popover';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { User, UserRolesList } from '@/entities/user';

import { DeleteAccountButton } from '@/features/profile/deleteAccount';

interface UsersTableProps {
	users?: User[];
}

export const UsersTable = ({ users }: UsersTableProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation([i18Namespace.user, i18Namespace.translation]);

	const renderTableColumnWidths = () => {
		const columnWidths = {
			username: 'auto',
			email: 'auto',
			roles: '15%',
		};

		return Object.values(columnWidths)?.map((width, idx) => <col key={idx} style={{ width }} />);
	};

	const renderTableHeader = () => {
		const columns = {
			username: t(Users.NAME),
			email: t(Users.EMAIL),
			roles: t(Users.ROLE),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (user: User) => {
		const columns = {
			username: `${user.username}`,
			email: user.email,
			roles: <UserRolesList userRoles={user.userRoles} />,
		};

		return Object.entries(columns)?.map(([k, v]) => (
			<td key={k}>
				{k === 'username' ? (
					<Link to={route(ROUTES.admin.users.detail.page, user.id)}>
						<Text variant="body3-accent">{v}</Text>
					</Link>
				) : (
					<Text variant="body3-accent">{v}</Text>
				)}
			</td>
		));
	};

	const renderActions = (user: User) => {
		const menuItems: PopoverMenuItem[] = [
			{
				icon: <Icon icon="eye" size={24} />,
				title: t(Translation.SHOW, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.users.detail.page, user.id));
				},
			},
			{
				icon: <Icon icon="pen" size={24} />,
				title: t(Translation.EDIT, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.users.edit.page, user.id));
				},
			},
			{
				renderComponent: () => <DeleteAccountButton user={user} isAdmin isDetailPage />,
			},
		];

		return (
			<Flex gap="4">
				<Popover menuItems={menuItems}>
					{({ onToggle }: PopoverChildrenProps) => (
						<IconButton
							aria-label="go to details"
							form="square"
							icon={<Icon icon="dotsThreeVertical" />}
							size="medium"
							variant="tertiary"
							onClick={onToggle}
						/>
					)}
				</Popover>
			</Flex>
		);
	};

	if (!users) {
		return null;
	}

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderActions={renderActions}
			items={users}
			renderTableColumnWidths={renderTableColumnWidths}
			hasCopyButton
		/>
	);
};
