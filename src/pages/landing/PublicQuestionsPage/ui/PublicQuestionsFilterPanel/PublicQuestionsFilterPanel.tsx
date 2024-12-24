import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { useDebounce } from '@/shared/hooks/useDebounced';

import {
	ChooseQuestionComplexity,
	ChooseQuestionsCategories,
	RateFilterSection,
} from '@/entities/question';
import { SpecializationSelect } from '@/entities/specialization';

import { SearchInput } from '@/features/common/search-input';

import { FilterParams } from '@/widgets/Question';

import styles from './PublicQuestionsFilterPanel.module.css';

const DEFAULT_SPECIALIZATION = 11;

interface PublicQuestionsFilterPanelProps {
	filter: FilterParams;
	skillsLimit?: number;
	onChangeSearch: (value: string) => void;
	onChangeSkills: (skills: number[] | undefined) => void;
	onChangeComplexity: (complexity: number[] | undefined) => void;
	onChangeRate: (rate: number[]) => void;
	onChangeSpecialization: (value: number[] | number) => void;
}
export const PublicQuestionsFilterPanel = ({
	filter,
	onChangeSearch,
	onChangeSkills,
	onChangeComplexity,
	onChangeRate,
	onChangeSpecialization,
	skillsLimit,
}: PublicQuestionsFilterPanelProps) => {
	const { skills, rate, complexity, title, specialization } = filter;
	const { t } = useTranslation(i18Namespace.questions);

	const handleSearch = (value: string) => {
		onChangeSearch(value);
	};

	const debouncedSearch = useDebounce(handleSearch, 500);

	const specializationArray = Array.isArray(specialization)
		? specialization
		: [specialization ?? DEFAULT_SPECIALIZATION];

	return (
		<div className={styles.wrapper}>
			<SearchInput
				placeholder={t('search.placeholder')}
				onSearch={debouncedSearch}
				currentValue={title}
			/>
			<ChooseQuestionsCategories
				skillsLimit={skillsLimit}
				selectedSkills={skills}
				onChangeSkills={onChangeSkills}
				shouldShowScroll
			/>
			<SpecializationSelect value={specializationArray} onChange={onChangeSpecialization} />
			<ChooseQuestionComplexity
				onChangeComplexity={onChangeComplexity}
				selectedComplexity={complexity}
			/>
			<RateFilterSection onChangeRate={onChangeRate} selectedRate={rate} />
		</div>
	);
};
