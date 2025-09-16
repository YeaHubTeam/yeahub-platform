import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { useDebounce } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { SearchInput } from '@/shared/ui/SearchInput';

import { getChannelsForSpecialization, MediaLinksBanner } from '@/entities/media';
import {
	ChooseQuestionComplexity,
	ChooseQuestionsCategories,
	RateFilterSection,
} from '@/entities/question';
import { DEFAULT_SPECIALIZATION_ID, SpecializationsListField } from '@/entities/specialization';

import type { FilterParams } from '@/widgets/question/QuestionsFilterPanel';

interface PublicQuestionsFilterPanelProps {
	filter: FilterParams;
	specializationLimit?: number;
	onChangeSearch: (value: string) => void;
	onChangeSkills: (skills: number[] | undefined) => void;
	onChangeComplexity: (complexity: number[] | undefined) => void;
	onChangeRate: (rate: number[]) => void;
	onChangeSpecialization: (value: number | undefined) => void;
}
export const PublicQuestionsFilterPanel = ({
	filter,
	onChangeSearch,
	onChangeSkills,
	onChangeComplexity,
	onChangeRate,
	onChangeSpecialization,
	specializationLimit,
}: PublicQuestionsFilterPanelProps) => {
	const { skills, rate, complexity, title, specialization } = filter;
	const { t } = useTranslation(i18Namespace.questions);

	const handleSearch = (value: string) => {
		onChangeSearch(value);
	};

	const debouncedSearch = useDebounce(handleSearch, 500);

	const selectedSpecialization = Array.isArray(specialization) ? specialization[0] : specialization;
	const media = getChannelsForSpecialization(selectedSpecialization ?? DEFAULT_SPECIALIZATION_ID);

	return (
		<Flex direction="column" gap="24">
			<SearchInput
				placeholder={t('search.placeholder')}
				onSearch={debouncedSearch}
				currentValue={title}
			/>
			<SpecializationsListField
				selectedSpecialization={selectedSpecialization}
				onChangeSpecialization={onChangeSpecialization}
			/>
			<ChooseQuestionsCategories
				skillsLimit={specializationLimit}
				selectedSkills={skills}
				onChangeSkills={onChangeSkills}
				selectedSpecialization={selectedSpecialization || DEFAULT_SPECIALIZATION_ID}
			/>
			<ChooseQuestionComplexity
				onChangeComplexity={onChangeComplexity}
				selectedComplexity={complexity}
			/>
			<RateFilterSection onChangeRate={onChangeRate} selectedRate={rate} />
			{media && <MediaLinksBanner mediaLink={media} />}
		</Flex>
	);
};
