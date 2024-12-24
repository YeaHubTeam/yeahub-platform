import { i18Namespace } from '@/shared/config/i18n';
import { useDebounce } from '@/shared/hooks/useDebounced';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import {
	ChooseQuestionComplexity,
	ChooseQuestionsCategories,
	RateFilterSection,
} from '@/entities/question';
import { ChooseSpecialization } from '@/entities/question';

import { SearchInput } from '@/features/common/search-input';

import { FilterParams } from '@/widgets/Question';

import styles from './PublicQuestionsFilterPanel.module.css';

interface PublicQuestionsFilterPanelProps {
	filter: FilterParams;
	skillsLimit?: number;
	onChangeSearch: (value: string) => void;
	onChangeSkills: (skills: number[] | undefined) => void;
	onChangeComplexity: (complexity: number[] | undefined) => void;
	onChangeRate: (rate: number[]) => void;
	onChangeSpecialization: (value: number[] | undefined) => void;
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
	const { t } = useI18nHelpers(i18Namespace.questions);

	const handleSearch = (value: string) => {
		onChangeSearch(value);
	};

	const debouncedSearch = useDebounce(handleSearch, 500);

	return (
		<div className={styles.wrapper}>
			<SearchInput
				placeholder={t('searchPlaceholder')}
				onSearch={debouncedSearch}
				currentValue={title}
			/>
			<ChooseQuestionsCategories
				skillsLimit={skillsLimit}
				selectedSkills={skills}
				onChangeSkills={onChangeSkills}
				shouldShowScroll
			/>
			<ChooseSpecialization
				selectedSpecialization={specialization}
				onChangeSpecialization={onChangeSpecialization}
			/>
			<ChooseQuestionComplexity
				onChangeComplexity={onChangeComplexity}
				selectedComplexity={complexity}
			/>
			<RateFilterSection onChangeRate={onChangeRate} selectedRate={rate} />
		</div>
	);
};
