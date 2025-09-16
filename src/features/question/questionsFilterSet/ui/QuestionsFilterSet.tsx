import { useQueryFilter } from '@/shared/hooks';

import {
	ChooseQuestionComplexity,
	QuestionsSorter,
	RateFilterSection,
	SortQuestionsByField,
} from '@/entities/question';
import { SkillsListField } from '@/entities/skill';
import { DEFAULT_SPECIALIZATION_ID, SpecializationsListField } from '@/entities/specialization';

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
			<SpecializationsListField
				selectedSpecialization={selectedSpecialization}
				onChangeSpecialization={onChangeSpecialization}
			/>
			<SkillsListField
				selectedSkills={skills}
				onChangeSkills={onChangeSkills}
				selectedSpecialization={selectedSpecialization || DEFAULT_SPECIALIZATION_ID}
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
