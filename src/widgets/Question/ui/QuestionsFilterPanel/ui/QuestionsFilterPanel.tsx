import { useDebounce } from '@/shared/hooks/useDebounced';

import { ChooseQuestionComplexity, ChooseQuestionsCategories } from '@/entities/question';

import { SearchInput } from '@/features/common/search-input';

import { FilterParams } from '../model/types';

import styles from './QuestionsFilterPanel.module.css';
import { RateFilterSection } from './RateFilterSection/RateFilterSection';
import { StatusFilterSection } from './StatusFilterSection/StatusFilterSection';

interface QuestionsFilterPanelProps {
	filter: FilterParams;
	onChangeSearch: (value: string) => void;
	onChangeSkills: (skills: number[]) => void;
	onChangeComplexity: (complexity: number[]) => void;
	onChangeRate: (rate: number[]) => void;
	onChangeStatus: (status: number[]) => void;
}
export const QuestionsFilterPanel = ({
	filter,
	onChangeSearch,
	onChangeSkills,
	onChangeComplexity,
	onChangeRate,
	onChangeStatus,
}: QuestionsFilterPanelProps) => {
	const { skill, rate, rating, progressStatus } = filter;

	const handleSearch = (value: string) => {
		onChangeSearch(value);
	};
	const debouncedSearch = useDebounce(handleSearch, 500);

	return (
		<div className={styles.wrapper}>
			<SearchInput placeholder="Введите запрос" onSearch={debouncedSearch} />
			<ChooseQuestionsCategories selectedSkills={skill} onChangeSkills={onChangeSkills} />
			<ChooseQuestionComplexity onChangeComplexity={onChangeComplexity} selectedComplexity={rate} />
			<RateFilterSection onChangeRate={onChangeRate} selectedRate={rating} />
			<StatusFilterSection onChangeStatus={onChangeStatus} selectedStatuses={progressStatus} />
		</div>
	);
};
