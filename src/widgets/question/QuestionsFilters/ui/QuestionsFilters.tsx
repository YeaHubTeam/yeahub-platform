import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector, useCurrentProject } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { SearchInput } from '@/shared/ui/SearchInput';

import { getSpecializationId } from '@/entities/profile';
import {
	ChooseQuestionComplexity,
	RateFilterSection,
	StatusFilterSection,
	QuestionsFilterParams,
} from '@/entities/question';
import { SkillsListField } from '@/entities/skill';
import { SpecializationsListField } from '@/entities/specialization';

interface QuestionsFiltersProps {
	filters: QuestionsFilterParams;
	onChangeTitle: (title?: QuestionsFilterParams['title']) => void;
	onChangeSkills: (skills?: QuestionsFilterParams['skills']) => void;
	onChangeSpecialization?: (specialization?: QuestionsFilterParams['specialization']) => void;
	onChangeComplexity: (complexity?: QuestionsFilterParams['complexity']) => void;
	onChangeRate: (rate?: QuestionsFilterParams['rate']) => void;
	onChangeStatus?: (status?: QuestionsFilterParams['status']) => void;
}
export const QuestionsFilters = ({
	filters,
	onChangeTitle,
	onChangeSkills,
	onChangeSpecialization,
	onChangeComplexity,
	onChangeRate,
	onChangeStatus,
}: QuestionsFiltersProps) => {
	const { skills, rate, complexity, status, title, specialization } = filters;
	const { t } = useTranslation(i18Namespace.questions);
	const specializationId = useAppSelector(getSpecializationId);
	const project = useCurrentProject();

	return (
		<Flex direction="column" gap="24">
			<SearchInput
				placeholder={t(Questions.SEARCH_PLACEHOLDER)}
				onSearch={onChangeTitle}
				currentValue={title}
			/>
			{project === 'landing' && onChangeSpecialization && (
				<SpecializationsListField
					selectedSpecialization={specialization}
					onChangeSpecialization={onChangeSpecialization}
				/>
			)}
			<SkillsListField
				selectedSkills={skills}
				onChangeSkills={onChangeSkills}
				selectedSpecialization={specialization || specializationId}
			/>
			<ChooseQuestionComplexity
				onChangeComplexity={onChangeComplexity}
				selectedComplexity={complexity}
			/>
			<RateFilterSection onChangeRate={onChangeRate} selectedRate={rate} />
			{project === 'platform' && onChangeStatus && (
				<StatusFilterSection onChangeStatus={onChangeStatus} selectedStatus={status} />
			)}
		</Flex>
	);
};
