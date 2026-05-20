import { Flex } from '@/shared/ui/Flex';

import { RegistrationLabelSkeleton } from '@/entities/auth';

import { LoginFormSkeleton, TelegramLoginSkeleton } from '@/features/authentication/login';

import styles from './LoginCreateForm.module.css';

export const LoginCreateFormSkeleton = () => {
	return (
		<Flex direction="column" justify="between" className={styles.wrapper}>
			<Flex direction="column" className={styles.form}>
				<LoginFormSkeleton />
				<TelegramLoginSkeleton />
			</Flex>
			<RegistrationLabelSkeleton />
		</Flex>
	);
};
