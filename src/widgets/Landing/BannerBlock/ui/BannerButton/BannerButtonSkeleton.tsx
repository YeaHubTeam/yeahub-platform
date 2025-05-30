import { ButtonSkeleton } from '@/shared/ui/Button';

import styles from './BannerButton.module.css';

export const BannerButtonSkeleton = () => {
	return (
		<ButtonSkeleton size="x-large" variant="primary-inverse" className={styles['banner-button']} />
	);
};
