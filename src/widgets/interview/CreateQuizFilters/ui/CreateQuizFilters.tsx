import { useAppSelector, useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { getHasPremiumAccess, getSpecializationId } from '@/entities/profile';
import { ChooseQuestionComplexity, ChooseQuestionCount } from '@/entities/question';
import { CreateQuizFilterParams, QuizQuestionMode } from '@/entities/quiz';
import { SkillsListField } from '@/entities/skill';

import styles from './CreateQuizFilters.module.css';

const MAX_CHOOSE_QUESTION_COUNT = 8;

interface CreateQuizFiltersProps {
	filters: CreateQuizFilterParams;
	onChangeMode: (mode: CreateQuizFilterParams['mode']) => void;
	onChangeSkills: (skills: CreateQuizFilterParams['skills']) => void;
	onChangeComplexity: (complexity: CreateQuizFilterParams['complexity']) => void;
	onChangeCount: (count: CreateQuizFilterParams['count']) => void;
}

export const CreateQuizFilters = ({
	filters,
	onChangeCount,
	onChangeSkills,
	onChangeComplexity,
	onChangeMode,
}: CreateQuizFiltersProps) => {
	const { isMobile, isTablet } = useScreenSize();
	const specializationId = useAppSelector(getSpecializationId);
	const hasPremium = useAppSelector(getHasPremiumAccess);

	return (
		<Flex
			justify="between"
			gap={isMobile ? '16' : '40'}
			direction={isTablet ? 'column' : 'row'}
			className={styles.wrapper}
		>
			<Flex className={styles['skills-selection']} gap={isMobile ? '16' : '24'} direction="column">
				<SkillsListField
					selectedSpecialization={filters.specialization || specializationId}
					selectedSkills={filters.skills}
					onChangeSkills={onChangeSkills}
					showAllLabel
				/>
			</Flex>
			<Flex direction="column" gap="24" className={styles['additional-wrapper']}>
				<ChooseQuestionComplexity
					selectedComplexity={filters.complexity}
					onChangeComplexity={onChangeComplexity}
					disabled={!hasPremium}
					hasPremium={hasPremium}
				/>
				<QuizQuestionMode
					onChangeMode={onChangeMode}
					modeFromURL={filters.mode}
					disabled={!hasPremium}
					active={!hasPremium}
					hasPremium={hasPremium}
				/>
				<ChooseQuestionCount
					onChangeCount={onChangeCount}
					count={filters.count || 1}
					maxCount={hasPremium ? undefined : MAX_CHOOSE_QUESTION_COUNT}
					disabled={!hasPremium}
					hasPremium={hasPremium}
				/>
			</Flex>
		</Flex>
	);
};
