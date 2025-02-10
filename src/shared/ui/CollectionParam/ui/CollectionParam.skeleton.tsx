import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './CollectionParam.module.css';

export const CollectionParamSkeleton = () => {
	return (
		<Flex align="center" gap="12" componentType="li" className={styles.param}>
			<TextSkeleton variant="body1" width={50} />
			<TextSkeleton variant="body1" width={16} />
		</Flex>
	);
};
