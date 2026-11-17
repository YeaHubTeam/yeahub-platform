import { Flex } from '@/shared/ui/Flex';
import { Switch } from '@/shared/ui/Switch';

import { ChooseQuestionComplexity } from '@/entities/question';
import { SkillsListField } from '@/entities/skill';
import { SpecializationsListField } from '@/entities/specialization';
import { UserSelect } from '@/entities/user';

import { TestQuestionsFilterParams } from '../../model/types/filters';
import { TestQuestionRateFilter } from '../TestQuestionRateFilter/TestQuestionRateFilter';

interface TestQuestionsFiltersProps {
	filters: TestQuestionsFilterParams;
	onChangeSkills: (skills?: TestQuestionsFilterParams['skills']) => void;
	onChangeSpecialization: (specialization?: TestQuestionsFilterParams['specialization']) => void;
	onChangeComplexity: (complexity?: TestQuestionsFilterParams['complexity']) => void;
	onChangeRate: (rate?: TestQuestionsFilterParams['rate']) => void;
	onChangeIsMy: (isMy?: TestQuestionsFilterParams['isMy']) => void;
	onChangeAuthorId: (authorId?: TestQuestionsFilterParams['authorId']) => void;
}

export const TestQuestionsFilters = ({
	filters,
	onChangeSkills,
	onChangeSpecialization,
	onChangeComplexity,
	onChangeRate,
	onChangeIsMy,
	onChangeAuthorId,
}: TestQuestionsFiltersProps) => {
	const { skills, rate, complexity, specialization, isMy, authorId } = filters;

	return (
		<Flex direction="column" gap="24">
			<Switch
				checked={isMy ?? false}
				onChange={(e) => {
					onChangeIsMy(e.target.checked);
					if (e.target.checked) onChangeAuthorId(undefined);
				}}
				label="Мои тесты"
			/>
			<UserSelect
				onChange={onChangeAuthorId}
				value={authorId}
				disabled={!!isMy}
				title="Автор"
				placeholder="Выберите автора"
			/>
			<SpecializationsListField
				selectedSpecialization={specialization}
				onChangeSpecialization={onChangeSpecialization}
			/>
			<SkillsListField
				selectedSkills={skills}
				onChangeSkills={onChangeSkills}
				selectedSpecialization={specialization}
			/>
			<ChooseQuestionComplexity
				onChangeComplexity={onChangeComplexity}
				selectedComplexity={complexity}
			/>
			<TestQuestionRateFilter onChangeRate={onChangeRate} selectedRate={rate} />
		</Flex>
	);
};
