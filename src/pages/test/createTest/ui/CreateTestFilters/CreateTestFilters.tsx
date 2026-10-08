import { useAppSelector, useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { getSpecializationId } from '@/entities/profile';
import { ChooseQuestionComplexity, ChooseQuestionCount } from '@/entities/question';
import { QuizQuestionMode } from '@/entities/quiz';
import { SkillsListField } from '@/entities/skill';
import { CreateTestFilterParams } from '@/entities/test';

import styles from './CreateTestFilters.module.css';

interface CreateTestFiltersProps {
	filters: CreateTestFilterParams;
	onChangeMode: (mode: CreateTestFilterParams['mode']) => void;
	onChangeSkills: (skills: CreateTestFilterParams['skills']) => void;
	onChangeComplexity: (complexity: CreateTestFilterParams['complexity']) => void;
	onChangeCount: (count: CreateTestFilterParams['count']) => void;
}

export const CreateTestFilters = ({
	filters,
	onChangeCount,
	onChangeSkills,
	onChangeComplexity,
	onChangeMode,
}: CreateTestFiltersProps) => {
	const { isMobile, isTablet } = useScreenSize();
	const specializationId = useAppSelector(getSpecializationId);

	return (
		<Flex
			justify="between"
			gap={isMobile ? '16' : '40'}
			direction={isTablet ? 'column' : 'row'}
			className={styles.wrapper}
		>
			<Flex className={styles['skills-selection']} gap={isMobile ? '16' : '24'} direction="column">
				<SkillsListField
					selectedSpecialization={specializationId}
					selectedSkills={filters.skills}
					onChangeSkills={onChangeSkills}
					showAllLabel
				/>
			</Flex>
			<Flex direction="column" gap="24" className={styles['additional-wrapper']}>
				<ChooseQuestionComplexity
					selectedComplexity={filters.complexity}
					onChangeComplexity={onChangeComplexity}
				/>
				<QuizQuestionMode onChangeMode={onChangeMode} modeFromURL={filters.mode} />
				<ChooseQuestionCount onChangeCount={onChangeCount} count={filters.count ?? 1} />
			</Flex>
		</Flex>
	);
};
