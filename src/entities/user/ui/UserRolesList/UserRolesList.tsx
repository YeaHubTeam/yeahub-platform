import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { User } from '@/shared/config/i18n/i18nTranslations';
import { convertRoleNameToEnumKey } from '@/shared/helpers/convertRoleNameToEnumKey';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Role } from '@/entities/auth';

import styles from './UserRolesList.module.css';

interface UserRolesListProps {
	userRoles: Role[];
}

export const UserRolesList = ({ userRoles }: UserRolesListProps) => {
	const { t } = useTranslation([i18Namespace.user]);

	return (
		<Flex gap="12" align="start">
			{userRoles?.map((role) => (
				<Text variant="body3" key={role.id} className={styles[role.name]}>
					{t(User[convertRoleNameToEnumKey(role.name)])}
				</Text>
			))}
		</Flex>
	);
};
