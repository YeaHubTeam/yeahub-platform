import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { User } from '@/shared/config/i18n/i18nTranslations';
import { convertRoleNameToEnumKey } from '@/shared/helpers/convertRoleNameToEnumKey';
import { Flex } from '@/shared/ui/Flex';
import { StatusChip } from '@/shared/ui/StatusChip';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Role } from '@/entities/auth';

import { userRoleColors } from '../../model/constants/userRoleColors';

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
