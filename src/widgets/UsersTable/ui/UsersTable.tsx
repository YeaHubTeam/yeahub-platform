import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation, User as Users } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { convertRoleNameToEnumKey } from '@/shared/helpers/convertRoleNameToEnumKey';
import { route } from '@/shared/helpers/route';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { PopoverChildrenProps } from '@/shared/ui/Popover/types';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { User } from '@/entities/user';

import { DeleteAccountButton } from '@/features/profile/deleteAccount';

import styles from './UsersTable.module.css';

interface UsersTableProps {
	users?: User[];
}

export const UsersTable = ({ users }: UsersTableProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation([i18Namespace.user, i18Namespace.translation]);

	const renderTableHeader = () => {
		const columns = {
			username: t(Users.NAME),
			roles: t(Users.ROLE),
			email: t(Users.EMAIL),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const roleVariantMap = {
		yellow: ['candidate', 'candidate-premium', 'candidate-free'],
		red: ['hr', 'author'],
		purple: ['guest', 'member'],
		green: ['admin'],
	} as const;

	const variantByRole: Record<string, keyof typeof roleVariantMap> = {};

	Object.entries(roleVariantMap).forEach(([variant, roles]) => {
		roles.forEach((role) => {
			variantByRole[role] = variant as keyof typeof roleVariantMap;
		});
	});

	const renderTableBody = (user: User) => {
		const columns = {
			username: `${user.username}`,
			roles: (
				<div className={styles['roles-container']}>
					{user.userRoles.map((role) => {
						return (
							<StatusChip
								key={role.id}
								status={{
									variant: variantByRole[role.name.toLowerCase()],
									text: t(Users[convertRoleNameToEnumKey(role.name)]),
								}}
							/>
						);
					})}
				</div>
			),
			email: user.email,
		};

		return Object.entries(columns)?.map(([k, v]) => (
			<td key={k}>
				{k === 'username' ? (
					<Link to={route(ROUTES.admin.users.detail.page, user.id)}>
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
		/>
	);
};
