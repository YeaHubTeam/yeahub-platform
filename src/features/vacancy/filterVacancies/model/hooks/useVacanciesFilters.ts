import { useQueryFilterParams } from '@/shared/libs';

import { VacanciesFilterParams } from '@/entities/vacancy';

import { useGetVacanciesFilterParams } from './useGetVacanciesFilterParams';

export const useVacanciesFilters = (initialParams: VacanciesFilterParams) => {
	const currentParams = useGetVacanciesFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } = useQueryFilterParams<VacanciesFilterParams>(
		initialParams,
		currentParams,
	);

	const hasFilters =
		(filters.page || 1) > 1 ||
		Boolean(filters.search) ||
		(filters.skillId || []).length > 0 ||
		(filters.companyType || []).length > 0 ||
		(filters.industry || []).length > 0 ||
		(filters.grade || []).length > 0 ||
		(filters.employmentForm || []).length > 0 ||
		(filters.salaryBucket || []).length > 0 ||
		(filters.englishLevel || []).length > 0 ||
		(filters.workFormat || []).length > 0;

	const onChangeSearch = (search: VacanciesFilterParams['search']) => {
		onFilterChange({ search, page: 1 });
	};

	const onChangeSkillId = (skillId: VacanciesFilterParams['skillId']) => {
		onFilterChange({
			skillId,
			page: 1,
		});
	};

	const onChangeCompanyType = (companyType: VacanciesFilterParams['companyType']) => {
		onFilterChange({
			companyType,
			page: 1,
		});
	};

	const onChangeIndustry = (industry: VacanciesFilterParams['industry']) => {
		onFilterChange({
			industry,
			page: 1,
		});
	};

	const onChangeGrade = (grade: VacanciesFilterParams['grade']) => {
		onFilterChange({
			grade,
			page: 1,
		});
	};

	const onChangeEmploymentForm = (employmentForm: VacanciesFilterParams['employmentForm']) => {
		onFilterChange({
			employmentForm,
			page: 1,
		});
	};

	const onChangeSalaryBucket = (salaryBucket: VacanciesFilterParams['salaryBucket']) => {
		onFilterChange({
			salaryBucket,
			page: 1,
		});
	};

	const onChangeEnglishLevel = (englishLevel: VacanciesFilterParams['englishLevel']) => {
		onFilterChange({
			englishLevel,
			page: 1,
		});
	};

	const onChangeWorkFormat = (workFormat: VacanciesFilterParams['workFormat']) => {
		onFilterChange({
			workFormat,
			page: 1,
		});
	};

	// const onChangeTopics = (topics: QuestionsFilterParams['topics']) => {
	// 	onFilterChange({
	// 		topics: topics && topics.length > 0 ? topics : undefined,
	// 		page: 1,
	// 	});
	// };

	const onChangePage = (page: VacanciesFilterParams['page']) => {
		onFilterChange({ page });
	};

	return {
		filters,
		hasFilters,
		onResetFilters,
		onChangePage,
		onChangeSearch,
		onChangeSkillId,
		onChangeCompanyType,
		onChangeIndustry,
		onChangeGrade,
		onChangeEmploymentForm,
		onChangeSalaryBucket,
		onChangeEnglishLevel,
		onChangeWorkFormat,
	};
};
