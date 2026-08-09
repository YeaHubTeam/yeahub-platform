import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './VacancyCardSkills.module.css';

export const VacancyCardSkillsSkeleton = () => {
	return (
		<Flex gap="10" align="center">
			{Array.from({ length: 4 }).map((_, index) => (
				<CardSkeleton className={styles.skills} key={index}>
					<TextSkeleton variant="body1-accent" className={styles.skill} width={100} />
				</CardSkeleton>
			))}
		</Flex>
	);
};
