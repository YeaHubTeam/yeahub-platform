import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { InterviewResultsSkeleton } from '../InterviewResults/InterviewResults.skeleton';

import styles from './PreviewPassedQuizzesItem.module.css';

export const PreviewPassedQuizzesItemSkeleton = () => {
	return (
		<li className={classNames(styles.item, styles.link)}>
			<TextSkeleton variant="body3-accent" width={80} className={styles.date} />
			<Flex wrap="wrap" justify="between" gap="14" className={styles.info}>
				<TextSkeleton variant="body4" width={180} />
				<Flex componentType="ul" gap="24">
					<InterviewResultsSkeleton />
				</Flex>
			</Flex>
		</li>
	);
};
