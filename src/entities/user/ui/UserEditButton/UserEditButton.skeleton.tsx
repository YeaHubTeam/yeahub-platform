import { ButtonSkeleton } from '@/shared/ui/Button';

import styles from './UserEditButton.module.css';

export const UserEditButtonSkeleton = () => {
	return (
		<ButtonSkeleton variant="link" fullWidth={true} className={styles['card-edit']} width={20} />
	);
};
