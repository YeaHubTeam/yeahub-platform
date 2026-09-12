import { useTranslation } from 'react-i18next';

import { i18Namespace, ROUTES, User as Users } from '@/shared/config';
import { route } from '@/shared/libs';
import { TableCellLink } from '@/shared/ui/TableCellLink';
import { TableV2, type TableColumn } from '@/shared/ui/TableV2';
import { Text } from '@/shared/ui/Text';

import { User, UserRolesList } from '@/entities/user';

import { DeleteAccountButton } from '@/features/profile/deleteAccount';

interface UsersTableProps {
	users?: User[];
}

export const UsersTable = ({ users }: UsersTableProps) => {
	const { t } = useTranslation([i18Namespace.user, i18Namespace.translation]);

	const columns: TableColumn<User>[] = [
		{
			id: 'username',
			header: t(Users.NAME),
			width: 'auto',
			cell: ({ row }) => (
				<TableCellLink to={route(ROUTES.admin.users.details.page, row.id)} text={row.username} />
			),
		},
		{
			id: 'email',
			header: t(Users.EMAIL),
			width: 'auto',
			cell: ({ row }) => <Text variant="body3-accent">{row.email}</Text>,
		},
		{
			id: 'userRoles',
			header: t(Users.ROLE),
			width: '15%',
			cell: ({ row }) => (
				<UserRolesList userRoles={row.userRoles?.map((role) => role.name) ?? []} />
			),
		},
	];

	if (!users) {
		return null;
	}

	return (
		<TableV2
			data={users}
			columns={columns}
			actions={['detail', 'edit', 'delete', 'copy']}
			entity="users"
			renderDeleteAction={(user) => <DeleteAccountButton user={user} isAdmin isDetailPage />}
		/>
	);
};
