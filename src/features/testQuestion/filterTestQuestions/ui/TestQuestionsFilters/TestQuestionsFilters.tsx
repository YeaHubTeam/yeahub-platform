import { useTranslation } from 'react-i18next';

import { i18Namespace, TestQuestions } from '@/shared/config';
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
	onChangeIsMy: (value?: boolean) => void;
	onChangeAuthorId: (value?: string) => void;
	onChangeSpecialization: (value?: number) => void;
	onChangeSkills: (value?: number[]) => void;
	onChangeComplexity: (value?: number[]) => void;
	onChangeRate: (value?: number[]) => void;
}

export const TestQuestionsFilters = ({
	filters,
	onChangeIsMy,
	onChangeAuthorId,
	onChangeSpecialization,
	onChangeSkills,
	onChangeComplexity,
	onChangeRate,
}: TestQuestionsFiltersProps) => {
	const { t } = useTranslation(i18Namespace.testQuestion);

	return (
		<Flex direction="column" gap="24">
			<Switch
				checked={filters.isMy ?? false}
				onChange={(event) => onChangeIsMy(event.target.checked)}
				label={t(TestQuestions.FILTER_MY)}
			/>
			<UserSelect
				value={filters.authorId}
				onChange={onChangeAuthorId}
				disabled={Boolean(filters.isMy)}
				title={t(TestQuestions.FILTER_AUTHOR)}
				placeholder={t(TestQuestions.FILTER_AUTHOR_PLACEHOLDER)}
			/>
			<SpecializationsListField
				selectedSpecialization={filters.specialization}
				onChangeSpecialization={onChangeSpecialization}
			/>
			<SkillsListField
				selectedSkills={filters.skills}
				onChangeSkills={onChangeSkills}
				selectedSpecialization={filters.specialization}
			/>
			<ChooseQuestionComplexity
				selectedComplexity={filters.complexity}
				onChangeComplexity={onChangeComplexity}
			/>
			<TestQuestionRateFilter selectedRate={filters.rate} onChangeRate={onChangeRate} />
		</Flex>
	);
};
