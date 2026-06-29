import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { InputSkeleton } from '@/shared/ui/Input';

import styles from './PasswordInput.module.css';

export const PasswordInputSkeleton = () => {
	return (
		<FormControlSkeleton label="label">
			<InputSkeleton size="L" className={styles.input} />
		</FormControlSkeleton>
	);
};
