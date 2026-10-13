import { ButtonSkeleton } from '@/shared/ui/Button';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { PasswordInputSkeleton } from '@/shared/ui/PasswordInput';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './ChangePasswordForm.module.css';

export const ChangePasswordFormSkeleton = () => {
	return (
		<CardSkeleton>
			<Flex direction="column" gap="12" className={styles['header-section']}>
				<TextSkeleton variant="head3" width={250} />
				<TextSkeleton variant="body3" width="70%" />
			</Flex>

			<form className={styles.form}>
				<Flex className={styles['flex-form']}>
					<div className={styles['input-wrapper']}>
						<PasswordInputSkeleton />
					</div>

					<div className={styles['input-wrapper']}>
						<PasswordInputSkeleton />
					</div>

					<ButtonSkeleton size="large" className={styles['submit-button']} />
				</Flex>
			</form>
		</CardSkeleton>
	);
};
