import classNames from 'classnames';

import { useScreenSize } from '@/shared/hooks';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './BlockTitle.module.css';

export const BlockTitleSkeleton = () => {
	const { isMobile } = useScreenSize();

	return (
		<TextSkeleton
			width={'100%'}
			variant={isMobile ? 'body5-accent' : 'head3'}
			className={classNames(styles.title, styles.desktop)}
		/>
	);
};
