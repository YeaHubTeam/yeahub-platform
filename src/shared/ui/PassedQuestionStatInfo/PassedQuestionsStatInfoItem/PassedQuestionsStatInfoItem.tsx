import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './PassedQuestionsStatInfoItem.module.css';

interface StatInfoItemProps {
	title: string;
	value: string;
}

export const PassedQuestionsStatInfoItem = ({ title, value }: StatInfoItemProps) => {
	return (
		<Flex direction="column" gap="4" className={styles.stat}>
			<Text variant="body1-accent" color="black-400">
				{title}
			</Text>
			<Text variant="body1-accent" color="black-800">
				{value}
			</Text>
		</Flex>
	);
};
