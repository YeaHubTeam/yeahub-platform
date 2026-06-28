import { ButtonSkeleton } from '@/shared/ui/Button';
import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { InputSkeleton } from '@/shared/ui/Input';
import { PasswordInputSkeleton } from '@/shared/ui/PasswordInput';

import styles from './LoginForm.module.css';

export const LoginFormSkeleton = () => {
	return (
		<form className={styles['form-wrapper']}>
			<div className={styles['input-wrapper']}>
				<FormControlSkeleton label="label">
					<InputSkeleton size="L" className={styles.input} />
				</FormControlSkeleton>
			</div>

			<div className={styles['input-wrapper']}>
				<PasswordInputSkeleton />
				<div className={styles['forgot-password-link']}>
					<ButtonSkeleton width={110} variant="link" />
				</div>
			</div>

			<ButtonSkeleton variant="primary" size="medium" className={styles['submit-button']} />
		</form>
	);
};
