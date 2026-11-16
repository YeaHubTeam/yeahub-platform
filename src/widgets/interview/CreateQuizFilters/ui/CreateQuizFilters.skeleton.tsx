import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { ChooseQuestionComplexitySkeleton, ChooseQuestionCountSkeleton } from '@/entities/question';
import { QuizQuestionModeSkeleton } from '@/entities/quiz';
import { SkillsListFieldSkeleton } from '@/entities/skill';

import styles from './CreateQuizFilters.module.css';

export const CreateQuizFiltersSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Flex
			justify="between"
			gap={isMobile ? '16' : '40'}
			direction={isTablet ? 'column' : 'row'}
			className={styles.wrapper}
		>
			<Flex className={styles['skills-selection']} gap={isMobile ? '16' : '24'} direction="column">
				<SkillsListFieldSkeleton />
			</Flex>
			<Flex direction="column" gap="24" className={styles['additional-wrapper']}>
				<ChooseQuestionComplexitySkeleton />
				<QuizQuestionModeSkeleton />
				<ChooseQuestionCountSkeleton />
			</Flex>
		</Flex>
	);
};
