import { Flex } from '@/shared/ui/Flex';

import { TelegramLoginSkeleton } from '@/features/authentication/login';
import { LoginLabelSkeleton, RegisterFormSkeleton } from '@/features/authentication/registration';

import styles from './UserCreateForm.module.css';

export const UserCreateFormSkeleton = () => {
	return (
		<Flex direction="column" justify="between" align="center" className={styles.wrapper}>
			<Flex direction="column" gap="24" style={{ width: '100%' }}>
				<RegisterFormSkeleton />
				<TelegramLoginSkeleton />
			</Flex>

			<LoginLabelSkeleton />
		</Flex>
	);
};
