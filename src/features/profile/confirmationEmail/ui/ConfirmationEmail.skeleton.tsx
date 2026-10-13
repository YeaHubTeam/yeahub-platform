import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { InputSkeleton } from '@/shared/ui/Input';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './ConfirmationEmail.module.css';

export const ConfirmationEmailSkeleton = () => {
	return (
		<>
			<Flex direction="column" gap="12">
				<TextSkeleton variant="head3" width={250} />
				<TextSkeleton variant="body3" width="80%" />
				<TextSkeleton variant="body3" width="55%" className={styles['spam-message']} />
			</Flex>

			<p className={styles['card-email']}></p>

			<div className={styles.card}>
				<InputSkeleton className={styles.input} />
				<ButtonSkeleton className={styles.button} />
			</div>
		</>
	);
};
