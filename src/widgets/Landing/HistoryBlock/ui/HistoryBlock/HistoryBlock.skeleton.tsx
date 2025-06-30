import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';

import { HistorySliderBlockSkeleton } from '../HistorySliderBlock/HistorySliderBlock.skeleton';
import { HistoryTextBlockSkeleton } from '../HistoryTextBlock/HistoryTextBlock.skeleton';

import styles from './HistoryBlock.module.css';

export const HistoryBlockSkeleton = () => {
	return (
		<Flex
			justify="between"
			className={classNames(styles['history-block'], styles['history-block-load'])}
			componentType="section"
		>
			<HistoryTextBlockSkeleton />
			<HistorySliderBlockSkeleton />
		</Flex>
	);
};
