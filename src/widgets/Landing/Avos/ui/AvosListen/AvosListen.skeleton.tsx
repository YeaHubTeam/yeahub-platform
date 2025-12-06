import { BannerSkeleton } from '@/shared/ui/Banner';

import styles from './AvosListen.module.css';

export const AvosListenSkeleton = () => {
	return <BannerSkeleton className={styles['listen-wrap']} color="white" showDescription={false} />;
};
