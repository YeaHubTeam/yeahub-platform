import { i18Namespace } from '@/shared/config/i18n';
import { User as Users } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Table } from '@/shared/ui/Table';

import { User } from '@/entities/user';

import styles from './UsersTable.module.css';

interface UsersTableProps {
	users?: User[];
}

export const UsersTable = ({ users }: UsersTableProps) => {
	const { t } = useI18nHelpers([i18Namespace.user, i18Namespace.translation]);

	const renderTableHeader = () => {
		const columns = {
			title: t(Users.NAME),
			roles: t(Users.ROLE),
			email: t(Users.EMAIL),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const convertRoleNameToEnumKey = (roleName: string): keyof typeof Users => {
		return roleName.replace(/-/g, '_').toUpperCase() as keyof typeof Users;
	};

	const renderTableBody = (user: User) => {
		const columns = {
			title: `${user.firstName} ${user.lastName}`,
			roles: (
				<div className={styles['roles-container']}>
					{user.userRoles.map((role) => {
						return (
							<span key={role.id} className={styles[role.name]}>
								{t(Users[convertRoleNameToEnumKey(role.name)])}
							</span>
						);
					})}
				</div>
			),
			email: user.email,
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	if (!users) {
		return null;
	}

	return (
		<Table renderTableHeader={renderTableHeader} renderTableBody={renderTableBody} items={users} />
	);
};
