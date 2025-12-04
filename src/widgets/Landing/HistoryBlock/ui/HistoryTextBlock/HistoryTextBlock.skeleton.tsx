import classNames from 'classnames';

import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './HistoryTextBlock.module.css';

export const HistoryTextBlockSkeleton = () => {
	const { isMobile } = useScreenSize();

	return (
		<Flex direction="column" justify="center" className={styles['text-block']}>
			<Flex gap="12" direction="column" className={classNames(styles['content'], styles.skeleton)}>
				<TextSkeleton
					width={'100%'}
					variant={isMobile ? 'body5-accent' : 'head3'}
					className={styles.title}
				/>
				<TextSkeleton width={'100%'} variant="body3" />
			</Flex>
		</Flex>
	);
};
