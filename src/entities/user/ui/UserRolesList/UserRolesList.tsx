import { useTranslation } from 'react-i18next';

import { i18Namespace, User } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { StatusChip } from '@/shared/ui/StatusChip';

import { RoleName } from '@/entities/user';

import { userRoleColors } from '../../model/constants/userRoleColors';
import { convertRoleNameToEnumKey } from '../../model/utils/convertRoleNameToEnumKey';

interface UserRolesListProps {
	userRoles: RoleName[];
}

export const UserRolesList = ({ userRoles }: UserRolesListProps) => {
	const { t } = useTranslation([i18Namespace.user]);

	return (
		<Flex gap="12" align="start" wrap="wrap" dataTestId="UserRolesList">
			{userRoles?.map((roleName) => (
				<StatusChip
					key={roleName}
					status={{
						variant: userRoleColors[roleName],
						text: t(User[convertRoleNameToEnumKey(roleName)]),
					}}
				/>
			))}
		</Flex>
	);
};
