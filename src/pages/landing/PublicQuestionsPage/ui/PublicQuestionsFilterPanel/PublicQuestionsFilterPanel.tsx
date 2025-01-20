import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { useDebounce } from '@/shared/hooks/useDebounced';

import {
	ChooseQuestionComplexity,
	ChooseQuestionsCategories,
	ChooseSpecialization,
	RateFilterSection,
} from '@/entities/question';

import { SearchInput } from '@/features/common/search-input';

import { FilterParams } from '@/widgets/Question';

import styles from './PublicQuestionsFilterPanel.module.css';

const DEFAULT_SPECIALIZATION = 11;

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

	return (
		<div className={styles.wrapper}>
			<SearchInput
				placeholder={t('search.placeholder')}
				onSearch={debouncedSearch}
				currentValue={title}
			/>
			<ChooseSpecialization
				selectedSpecialization={selectedSpecialization}
				onChangeSpecialization={onChangeSpecialization}
				specializationLimit={specializationLimit}
			/>
			<ChooseQuestionsCategories
				skillsLimit={specializationLimit}
				selectedSkills={skills}
				onChangeSkills={onChangeSkills}
				selectedSpecialization={selectedSpecialization || DEFAULT_SPECIALIZATION}
			/>
			<ChooseQuestionComplexity
				onChangeComplexity={onChangeComplexity}
				selectedComplexity={complexity}
			/>
			<RateFilterSection onChangeRate={onChangeRate} selectedRate={rate} />
		</div>
	);
};
