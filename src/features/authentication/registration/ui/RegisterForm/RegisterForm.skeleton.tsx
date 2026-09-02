import { ButtonSkeleton } from '@/shared/ui/Button';
import { CheckboxSkeleton } from '@/shared/ui/Checkbox';
import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { InputSkeleton } from '@/shared/ui/Input';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './RegisterForm.module.css';

export const RegisterFormSkeleton = () => {
	return (
		<form className={styles['form-wrapper']}>
			<div className={styles['header-skeleton-wrapper']}>
				<TextSkeleton variant="head2" width={250} />
			</div>

			<div className={styles['input-wrapper']}>
				<FormControlSkeleton label="label">
					<InputSkeleton size="L" className={styles.input} />
				</FormControlSkeleton>
			</div>
			<div className={styles['input-wrapper']}>
				<FormControlSkeleton label="label">
					<InputSkeleton size="L" className={styles.input} />
				</FormControlSkeleton>
			</div>
			<div className={styles['input-wrapper']}>
				<FormControlSkeleton label="label">
					<InputSkeleton size="L" className={styles.input} />
				</FormControlSkeleton>
			</div>
			<div className={styles['input-wrapper']}>
				<FormControlSkeleton label="label">
					<InputSkeleton size="L" className={styles.input} />
				</FormControlSkeleton>
			</div>

			{/* Второй InputSkeleton и два PasswordInputSkeleton */}

			<ButtonSkeleton variant="primary" size="medium" className={styles['submit-button']} />

			<div className={styles['consent-wrapper']}>
				<div className={styles['text-gap']}>
					<TextSkeleton variant="body2" width="100%" />
				</div>
				<CheckboxSkeleton label labelWidth="90%" />
				<div className={styles['form-control']}>
					<CheckboxSkeleton label labelWidth="90%" />
				</div>
				<CheckboxSkeleton label labelWidth="90%" />
			</div>
		</form>
	);
};
