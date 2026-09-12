import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './VacancyMarketCardHeader.module.css';

interface VacancyMarketCardHeaderProps {
	name: string;
	vacanciesCountText: string;
}

export const VacancyMarketCardHeader = ({
	name,
	vacanciesCountText,
}: VacancyMarketCardHeaderProps) => {
	return (
		<Flex direction="column" gap="4">
			<Text variant="body6" color="black-900" className={styles.title}>
				{name}
			</Text>

			<Text variant="body5-accent" color="purple-700" className={styles.count}>
				{vacanciesCountText}
			</Text>
		</Flex>
	);
};
