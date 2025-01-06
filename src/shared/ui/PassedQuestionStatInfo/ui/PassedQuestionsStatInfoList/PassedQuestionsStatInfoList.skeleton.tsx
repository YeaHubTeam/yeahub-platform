import { Flex } from '@/shared/ui/Flex';

import { PassedQuestionsStatInfoItemSkeleton } from '../PassedQuestionsStatInfoItem/PassedQuestionsStatInfoItem.skeleton';

import styles from './PassedQuestionsStatInfoList.module.css';

export const PassedQuestionsStatInfoListSkeleton = () => {
	return (
		<Flex gap="12" className={styles.info}>
			{[...Array(4)].map((_, index) => (
				<PassedQuestionsStatInfoItemSkeleton key={index} />
			))}
		</Flex>
	);
};
