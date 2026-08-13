import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './VacancyCardPreparation.module.css';

export const VacancyCardPreparationSkeleton = () => {
	return (
		<CardSkeleton className={styles[`preparation-block`]}>
			<Flex gap="10" align="center">
				<IconSkeleton size={14} />
				{Array.from({ length: 3 }).map((_, index) => (
					<Flex key={index} gap="10" align="center" className={styles.preparation}>
						<TextSkeleton variant="body1-accent" width={150} />
					</Flex>
				))}
			</Flex>
		</CardSkeleton>
	);
};
