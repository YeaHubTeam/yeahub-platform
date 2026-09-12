import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './VacancyCardWorkFormat.module.css';

export const VacancyCardWorkFormatSkeleton = () => {
	return (
		<Flex gap="6" className={styles.conditions} align="center">
			{Array.from({ length: 4 }).map((_, index) => (
				<Flex key={index} className={styles.format}>
					<TextSkeleton variant="body3-accent" width={100} />
				</Flex>
			))}
		</Flex>
	);
};
