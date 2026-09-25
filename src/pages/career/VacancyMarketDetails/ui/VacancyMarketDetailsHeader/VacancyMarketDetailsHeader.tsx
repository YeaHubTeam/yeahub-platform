import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './VacancyMarketDetailsHeader.module.css';

interface VacancyMarketHeaderProps {
	title: string;
	vacancyName: string;
	description: string;
	updatedAtText: string;
}

export const VacancyMarketDetailsHeader = ({
	title,
	vacancyName,
	description,
	updatedAtText,
}: VacancyMarketHeaderProps) => {
	return (
		<Flex direction="column" gap="12" className={styles.header}>
			<Text variant="head2" isMainTitle className={styles.title}>
				{title}
			</Text>

			<Text variant="body6">{vacancyName}</Text>

			<Text variant="body3-accent" className={styles.description}>
				{description}
			</Text>

			<Flex align="center" gap="6">
				<Icon icon="calendarNoDots" size={20} color="purple-700" aria-hidden />

				<Text variant="body1" color="black-500">
					{updatedAtText}
				</Text>
			</Flex>
		</Flex>
	);
};
