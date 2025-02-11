import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { User as Users } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { convertRoleNameToEnumKey } from '@/shared/helpers/convertRoleNameToEnumKey';
import { route } from '@/shared/helpers/route';
import { Flex } from '@/shared/ui/Flex';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { Table } from '@/shared/ui/Table';

import { User } from '@/entities/user';

import styles from './UsersTable.module.css';

interface UsersTableProps {
	users?: User[];
}

export const UsersTable = ({ users }: UsersTableProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation([i18Namespace.user, i18Namespace.translation]);

	const renderTableHeader = () => {
		const columns = {
			fullName: t(Users.NAME),
			roles: t(Users.ROLE),
			email: t(Users.EMAIL),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (user: User) => {
		const columns = {
			fullName: `${user.firstName} ${user.lastName}`,
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

	const renderActions = (user: User) => {
		const menuItems: PopoverMenuItem[] = [
			{
				icon: <Icon icon="eye" size={24} />,
				title: t(Translation.SHOW, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.users.detail.page, user.id));
				},
			},
		];

		return (
			<Flex gap="4">
				<Popover menuItems={menuItems}>
					{({ onToggle }) => (
						<IconButton
							aria-label="go to details"
							form="square"
							icon={<Icon icon="dotsThreeVertical" />}
							size="M"
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
		/>
	);
};
