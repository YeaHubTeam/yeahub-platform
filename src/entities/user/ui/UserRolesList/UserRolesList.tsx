import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { User } from '@/shared/config/i18n/i18nTranslations';
import { convertRoleNameToEnumKey } from '@/shared/helpers/convertRoleNameToEnumKey';
import { Flex } from '@/shared/ui/Flex';
import { StatusChip } from '@/shared/ui/StatusChip';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Role } from '@/entities/auth';

interface UserRolesListProps {
	userRoles: Role[];
}

export const UserRolesList = ({ userRoles }: UserRolesListProps) => {
	const { t } = useTranslation([i18Namespace.user]);

	const userRoleVariants = {
		yellow: ['candidate', 'candidate-premium', 'candidate-free'],
		red: ['hr', 'author'],
		purple: ['guest', 'member'],
		green: ['admin'],
	} as const;

	const variantByRole: Record<string, keyof typeof userRoleVariants> = {};

	Object.entries(userRoleVariants).forEach(([variant, roles]) => {
		roles.forEach((role) => {
			variantByRole[role] = variant as keyof typeof userRoleVariants;
		});
	});

	return (
		<Flex gap="12" align="start">
			{userRoles?.map((role) => (
				<StatusChip
					key={role.id}
					status={{
						variant: variantByRole[role.name.toLowerCase()],
						text: t(User[convertRoleNameToEnumKey(role.name)]),
					}}
				/>
			))}
		</Flex>
	);
};
