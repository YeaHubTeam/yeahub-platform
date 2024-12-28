import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useQueryFilter } from '@/shared/hooks/useQueryFilter';

import { getSpecializationId } from '@/entities/profile';
import {
	ChooseQuestionComplexity,
	ChooseQuestionsCategories,
	QuestionsSorter,
	RateFilterSection,
	SortQuestionsByField,
} from '@/entities/question';

export const QuestionsFilterSet = () => {
	const profileSpecialization = useAppSelector(getSpecializationId);

	const {
		filter: { skills, complexity, rate, orderBy, order },
		handleFilterChange,
	} = useQueryFilter();

	const onChangeSkills = (skills: number[] | undefined) => {
		handleFilterChange({ skills });
	};

	const onChangeComplexity = (complexity?: number[]) => {
		handleFilterChange({ complexity });
	};

	const onChangeRate = (rate: number[]) => {
		handleFilterChange({ rate });
	};

	const changeSortBy = (orderBy: string) => {
		handleFilterChange({ orderBy });
	};

	const changeTheOrder = (order: string) => {
		handleFilterChange({ order });
	};

	return (
		<>
			<ChooseQuestionsCategories
				selectedSkills={skills}
				onChangeSkills={onChangeSkills}
				selectedSpecialization={profileSpecialization}
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
