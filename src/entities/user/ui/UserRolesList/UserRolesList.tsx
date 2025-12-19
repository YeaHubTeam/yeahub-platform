import { useTranslation } from 'react-i18next';

import { i18Namespace, User } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { StatusChip } from '@/shared/ui/StatusChip';

import { Role } from '@/entities/auth/@x/user';

import { userRoleColors } from '../../model/constants/userRoleColors';
import { convertRoleNameToEnumKey } from '../../model/utils/convertRoleNameToEnumKey';

interface UserRolesListProps {
	userRoles: Role[];
}

export const UserRolesList = ({ userRoles }: UserRolesListProps) => {
	const { t } = useTranslation([i18Namespace.user]);

	return (
		<Flex gap="12" align="start" wrap="wrap" dataTestId="UserRolesList">
			{userRoles?.map((role) => (
				<StatusChip
					key={role.id}
					status={{
						variant: userRoleColors[role.name],
						text: t(User[convertRoleNameToEnumKey(role.name)]),
					}}
				/>
			))}
		</Flex>
	);
};
