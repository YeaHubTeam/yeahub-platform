import { useQueryFilter } from '@/shared/hooks/useQueryFilter';

import {
	ChooseQuestionComplexity,
	ChooseQuestionsCategories,
	ChooseSpecialization,
	QuestionsSorter,
	RateFilterSection,
	SortQuestionsByField,
} from '@/entities/question';

const MAX_LIMIT_CATEGORIES = 5;
const DEFAULT_SPECIALIZATION = 11;

export const QuestionsFilterSet = () => {
	const {
		filter: { skills, complexity, rate, orderBy, order, specialization },
		handleFilterChange,
	} = useQueryFilter();

	const selectedSpecialization = Array.isArray(specialization) ? specialization[0] : specialization;

	const onChangeSkills = (skills: number[] | undefined) => {
		handleFilterChange({ skills });
	};

	const onChangeComplexity = (complexity?: number[]) => {
		handleFilterChange({ complexity });
	};

	const onChangeRate = (rate: number[]) => {
		handleFilterChange({ rate });
	};

	const onChangeSpecialization = (value: number | undefined) => {
		const specialization = value ? [value] : undefined;
		handleFilterChange({ specialization: specialization, skills: undefined });
	};

	const changeSortBy = (orderBy: string) => {
		handleFilterChange({ orderBy });
	};

	const changeTheOrder = (order: string) => {
		handleFilterChange({ order });
	};

	return (
		<>
			<ChooseSpecialization
				selectedSpecialization={selectedSpecialization}
				onChangeSpecialization={onChangeSpecialization}
				specializationLimit={MAX_LIMIT_CATEGORIES}
			/>
			<ChooseQuestionsCategories
				selectedSkills={skills}
				onChangeSkills={onChangeSkills}
				selectedSpecialization={selectedSpecialization || DEFAULT_SPECIALIZATION}
			/>
			<ChooseQuestionComplexity
				onChangeComplexity={onChangeComplexity}
				selectedComplexity={complexity}
			/>
			<RateFilterSection onChangeRate={onChangeRate} selectedRate={rate} />
			<SortQuestionsByField changeSortBy={changeSortBy} selectedOrderBy={orderBy} />
			<QuestionsSorter changeTheOrder={changeTheOrder} selectedOrder={order} />
		</>
	);
};
