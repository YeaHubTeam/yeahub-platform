import { Flex } from '@/shared/ui/Flex';

import { HistorySliderBlockSkeleton } from '../HistorySliderBlock/HistorySliderBlock.skeleton';
import { HistoryTextBlockSkeleton } from '../HistoryTextBlock/HistoryTextBlock.skeleton';

import styles from './HistoryBlock.module.css';

export const HistoryBlockSkeleton = () => {
	return (
		<Flex justify="between" className={styles['history-block']} componentType="section">
			<HistoryTextBlockSkeleton />
			<HistorySliderBlockSkeleton />
		</Flex>
	);
};
