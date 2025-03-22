import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useDebounce } from '@/shared/hooks/useDebounced';
import { Flex } from '@/shared/ui/Flex';
import { SearchInput } from '@/shared/ui/SearchInput';

import { getSpecializationId } from '@/entities/profile';
import {
	ChooseQuestionComplexity,
	ChooseQuestionsCategories,
	RateFilterSection,
} from '@/entities/question';

import { FilterParams, QuestionFilterStatus } from '../model/types';

import { StatusFilterSection } from './StatusFilterSection/StatusFilterSection';

interface QuestionsFilterPanelProps {
	filter: FilterParams;
	skillsLimit?: number;
	onChangeSearch: (value: string) => void;
	onChangeSkills: (skills: number[] | undefined) => void;
	onChangeComplexity: (complexity: number[] | undefined) => void;
	onChangeRate: (rate: number[]) => void;
	onChangeStatus: (status: QuestionFilterStatus) => void;
}
export const QuestionsFilterPanel = ({
	filter,
	onChangeSearch,
	onChangeSkills,
	onChangeComplexity,
	onChangeRate,
	onChangeStatus,
	skillsLimit,
}: QuestionsFilterPanelProps) => {
	const { skills, rate, complexity, status, title } = filter;
	const { t } = useTranslation(i18Namespace.questions);
	const profileSpecialization = useAppSelector(getSpecializationId);

	const handleSearch = (value: string) => {
		onChangeSearch(value);
	};

	const debouncedSearch = useDebounce(handleSearch, 500);

	return (
		<Flex direction="column" gap="24">
			<SearchInput
				placeholder={t(Questions.SEARCH_PLACEHOLDER)}
				onSearch={debouncedSearch}
				currentValue={title}
			/>
			<ChooseQuestionsCategories
				skillsLimit={skillsLimit}
				selectedSkills={skills}
				onChangeSkills={onChangeSkills}
				shouldShowScroll
				selectedSpecialization={profileSpecialization}
			/>
			<ChooseQuestionComplexity
				onChangeComplexity={onChangeComplexity}
				selectedComplexity={complexity}
			/>
			<RateFilterSection onChangeRate={onChangeRate} selectedRate={rate} />
			<StatusFilterSection onChangeStatus={onChangeStatus} selectedStatus={status} />
		</Flex>
	);
};
