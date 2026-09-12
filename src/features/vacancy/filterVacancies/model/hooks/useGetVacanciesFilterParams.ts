import {
	VacanciesFilterParams,
	VacancyCompanyType,
	VacancyEmploymentForm,
	VacancyEnglishLevel,
	VacancyGrade,
	VacancyIndustry,
	VacancySalaryBucket,
	VacancyWorkFormat,
} from '@/entities/vacancy';

export const useGetVacanciesFilterParams = (initialParams: VacanciesFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: VacanciesFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		search: parsedParams.search || initialParams.search,
		skillId: parsedParams.skillId
			? parsedParams.skillId.split(',').map(Number)
			: initialParams.skillId,
		industry: parsedParams.industry
			? (parsedParams.industry.split(',') as VacancyIndustry[])
			: initialParams.industry,
		grade: parsedParams.grade
			? (parsedParams.grade.split(',') as VacancyGrade[])
			: initialParams.grade,
		companyType: parsedParams.companyType
			? (parsedParams.companyType.split(',') as VacancyCompanyType[])
			: initialParams.companyType,
		employmentForm: parsedParams.employmentForm
			? (parsedParams.employmentForm.split(',') as VacancyEmploymentForm[])
			: initialParams.employmentForm,
		salaryBucket: parsedParams.salaryBucket
			? (parsedParams.salaryBucket.split(',') as VacancySalaryBucket[])
			: initialParams.salaryBucket,
		englishLevel: parsedParams.englishLevel
			? (parsedParams.englishLevel.split(',') as VacancyEnglishLevel[])
			: initialParams.englishLevel,
		workFormat: parsedParams.workFormat
			? (parsedParams.workFormat.split(',') as VacancyWorkFormat[])
			: initialParams.workFormat,
	};

	return currentParams;
};
