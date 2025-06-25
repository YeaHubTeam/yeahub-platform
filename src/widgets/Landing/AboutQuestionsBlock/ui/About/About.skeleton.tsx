import classNames from 'classnames';

import { useScreenSize } from '@/shared/hooks';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './About.module.css';

export const AboutSkeleton = () => {
	const { isMobile } = useScreenSize();

	return (
		<div className={classNames(styles.about, styles.skeleton)}>
			<TextSkeleton
				width={'100%'}
				variant={isMobile ? 'body5-accent' : 'head3'}
				className={styles.title}
			/>
			<TextSkeleton width={'100%'} variant={'body3'} className={styles.description} />
		</div>
	);
};
