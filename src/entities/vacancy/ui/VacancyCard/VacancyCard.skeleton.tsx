import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { VacancyCardHeaderSkeleton } from '../VacancyCardHeader/VacancyCardHeader.skeleton';
import { VacancyCardPreparationSkeleton } from '../VacancyCardPreparation/VacancyCardPreparation.skeleton';
import { VacancyCardSalarySkeleton } from '../VacancyCardSalary/VacancyCardSalary.skeleton';
import { VacancyCardSkillsSkeleton } from '../VacancyCardSkills/VacancyCardSkills.skeleton';
import { VacancyCardWorkFormatSkeleton } from '../VacancyCardWorkFormat/VacancyCardWorkFormat.skeleton';

import styles from './VacancyCard.module.css';

export const VacancyCardSkeleton = () => {
	return (
		<CardSkeleton className={styles.card} /* contentClassName={styles.content} */>
			<Flex gap="40" direction="column" justify="between" flex={1}>
				<VacancyCardHeaderSkeleton />
				<Flex gap="20" direction="column">
					<VacancyCardWorkFormatSkeleton />
					<VacancyCardSkillsSkeleton />
					<Flex justify="between" align="center" gap="8">
						<VacancyCardPreparationSkeleton />
						<VacancyCardSalarySkeleton />
					</Flex>
				</Flex>
			</Flex>
		</CardSkeleton>
	);
};
