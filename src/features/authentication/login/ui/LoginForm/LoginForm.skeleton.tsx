import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { InputSkeleton } from '@/shared/ui/Input';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './LoginForm.module.css';

export const LoginFormSkeleton = () => {
	return (
		<form className={styles['form-wrapper']}>
			<div className={styles['input-wrapper']}>
				<Flex direction="column" gap="8">
					<Skeleton width={140} height={18} borderRadius={4} />
					<InputSkeleton size="L" className={styles.input} />
				</Flex>
			</div>

			<div className={styles['input-wrapper']}>
				<Flex direction="column" gap="8">
					<Skeleton width={60} height={18} borderRadius={4} />
					<InputSkeleton size="L" className={styles.input} />
				</Flex>
				<Flex justify="end" className={styles['forgot-password-link']}>
					<Skeleton width={110} height={16} borderRadius={4} />
				</Flex>
			</div>

			<ButtonSkeleton variant="primary" size="medium" className={styles['submit-button']} />
		</form>
	);
};
