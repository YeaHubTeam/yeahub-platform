import { Flex } from '@/shared/ui/Flex';

import { AdditionalStatInfoItemSkeleton } from '../AdditionalStatInfoItem/AdditionalStatInfoItem.skeleton';

import styles from './AdditionalStatInfoList.module.css';

export const AdditionalStatInfoListSkeleton = () => {
	return (
		<Flex gap="12" className={styles.info}>
			{[...Array(4)].map((_, index) => (
				<AdditionalStatInfoItemSkeleton key={index} />
			))}
		</Flex>
	);
};
