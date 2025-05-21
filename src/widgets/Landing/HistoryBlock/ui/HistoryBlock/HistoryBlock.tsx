import { Flex } from '@/shared/ui/Flex';

import { HistorySliderBlock } from '../HistorySliderBlock/HistorySliderBlock';
import { HistoryTextBlock } from '../HistoryTextBlock/HistoryTextBlock';

import styles from './HistoryBlock.module.css';

export const HistoryBlock = () => {
	return (
		<Flex justify="between" className={styles['history-block']} componentType="section">
			<HistoryTextBlock />
			<HistorySliderBlock />
		</Flex>
	);
};
