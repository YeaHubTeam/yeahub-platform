import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { User } from '@/shared/config/i18n/i18nTranslations';
import { convertRoleNameToEnumKey } from '@/shared/helpers/convertRoleNameToEnumKey';
// eslint-disable-next-line import/order
import { Flex } from '@/shared/ui/Flex';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { StatusChip } from '@/shared/ui/StatusChip';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Role } from '@/entities/auth';

interface UserRolesListProps {
	userRoles: Role[];
}

export const UserRolesList = ({ userRoles }: UserRolesListProps) => {
	const { t } = useTranslation([i18Namespace.user]);

	const variantMap = {
		admin: 'green',
		author: 'red',
		'candidate-premium': 'yellow',
		'candidate-free': 'purple',
	} as const;

	return (
		<Flex gap="12" align="start">
			{userRoles?.map((role) => (
				<StatusChip
					key={role.id}
					status={{
						variant: variantMap[role.name as keyof typeof variantMap],
						text: t(User[convertRoleNameToEnumKey(role.name)]),
					}}
				/>
			))}
		</Flex>
	);
};
