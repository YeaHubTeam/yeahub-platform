import { useDebounce } from '@/shared/hooks/useDebounced';

import { SearchInput } from '@/features/common/search-input';

import { CategoryFilterSection } from './CategoryFilterSection/CategoryFilterSection';
import { ComplexityFilterSection } from './ComplexityFilterSection/ComplexityFilterSection';
import styles from './QuestionsFilterPanel.module.css';
import { RateFilterSection } from './RateFilterSection/RateFilterSection';
import { StatusFilterSection } from './StatusFilterSection/StatusFilterSection';

interface QuestionsFilterPanelProps {
	className?: string;
	onChange: (params: { title: string }) => void;
}
export const QuestionsFilterPanel = ({ onChange }: QuestionsFilterPanelProps) => {
	const handleSearch = (value: string) => {
		onChange({ title: value });
	};
	const debouncedSearch = useDebounce(handleSearch, 500);

	/* const handleSkill = (id: string) => () => {
		onChange({ skill: [id] });
	}; */

	return (
		<div className={styles.wrapper}>
			<SearchInput placeholder="Введите запрос" onSearch={debouncedSearch} />
			<CategoryFilterSection />
			<ComplexityFilterSection />
			<RateFilterSection />
			<StatusFilterSection />
		</div>
	);
};
