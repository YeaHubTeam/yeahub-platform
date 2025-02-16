import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { User } from '@/shared/config/i18n/i18nTranslations';
import { convertRoleNameToEnumKey } from '@/shared/helpers/convertRoleNameToEnumKey';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { FullProfile } from '@/entities/auth';

import styles from './StatusLabel.module.css';

interface StatusLabelProps {
	user: FullProfile;
}

export const StatusLabel = ({ user }: StatusLabelProps) => {
	const { t } = useTranslation([i18Namespace.user]);

	return (
		<Flex gap="12" align="start">
			{user?.userRoles?.map((role) => (
				<Text variant="body3" key={role.id} className={styles[role.name]}>
					{t(User[convertRoleNameToEnumKey(role.name)])}
				</Text>
			))}
		</Flex>
	);
};
