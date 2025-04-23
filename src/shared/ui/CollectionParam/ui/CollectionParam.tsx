import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './CollectionParam.module.css';

interface CollectionParamProps {
	label: string;
}

export const CollectionParam = ({ label }: CollectionParamProps) => {
	return (
		<Flex align="center" gap="12" componentType="li" className={styles.param}>
			<Text variant="body1" className={styles.text}>
				{label}
			</Text>
		</Flex>
	);
};
