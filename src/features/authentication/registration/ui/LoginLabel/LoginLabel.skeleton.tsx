import { ButtonSkeleton } from '@/shared/ui/Button';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './LoginLabel.module.css';

export const LoginLabelSkeleton = () => {
	return (
		<div className={styles.wrapper}>
			<TextSkeleton variant="body2" width={150} />
			<ButtonSkeleton variant="link" width={80} />
		</div>
	);
};
