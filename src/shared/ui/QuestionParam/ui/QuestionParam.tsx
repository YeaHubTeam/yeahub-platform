import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './QuestionParam.module.css';

interface QuestionParamProps {
	label: string;
	value: number;
}

export const QuestionParam = ({ label, value }: QuestionParamProps) => {
	return (
		<Flex align="center" gap="12" componentType="li" className={styles.param}>
			<Text variant="body2" color="black-800">
				{label}:
			</Text>
			<Text variant="body2" color="white-900" className={styles.value}>
				{value}
			</Text>
		</Flex>
	);
};
