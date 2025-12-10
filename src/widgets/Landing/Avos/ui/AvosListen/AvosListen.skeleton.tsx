import classNames from 'classnames';

import { BannerSkeleton } from '@/shared/ui/Banner';

import styles from './AvosListen.module.css';

export const AvosListenSkeleton = () => {
	return (
		<BannerSkeleton
			className={styles['listen-wrap']}
			innerWrapClassName={styles['inner-wrap']}
			color="white"
			showDescription={false}
			showButton={true}
			buttonClassName={classNames(styles.button, styles['button-skeleton'])}
		/>
	);
};
