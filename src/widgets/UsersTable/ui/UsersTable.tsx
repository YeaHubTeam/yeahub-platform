import { i18Namespace } from '@/shared/config/i18n';
import { Users } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { TableUser } from '@/shared/ui/TableUser';

import { User } from '@/entities/user';

import styles from './UsersTable.module.css';

interface UsersTableProps {
	users?: User[];
}

export const UsersTable = ({ users }: UsersTableProps) => {
	const { t } = useI18nHelpers([i18Namespace.user, i18Namespace.translation]);

	const renderTableHeader = () => {
		const columns = {
			firstName: t(Users.NAME),
			roles: t(Users.ROLE),
			email: t(Users.EMAIL),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (user: User) => {
		const columns = {
			firstName: user.firstName,
			roles: (
				<div className={styles['roles-container']}>
					{user.userRoles.map((role) => (
						<span key={role.id} className={styles[role.name.toLowerCase()]}>
							{role.name}
						</span>
					))}
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
		<TableUser
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			items={users}
		/>
	);
};
