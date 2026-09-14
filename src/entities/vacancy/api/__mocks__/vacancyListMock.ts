import { DefaultBodyType, http, HttpResponse } from 'msw';

import { vacancyApiUrls } from '../../model/constants/vacancy';
import {
	GetVacanciesListParamsRequest,
	GetVacanciesListResponse,
	VacancySalary,
	VacancySalaryBucket,
} from '../../model/types/vacancy';

import { vacancyMock } from './data';

const isSalaryInBucket = (salary: VacancySalary, bucket: VacancySalaryBucket): boolean => {
	const { from, to } = salary;

	if (from === null && to === null) {
		return false;
	}

	const salaryFrom = from ?? to;
	const salaryTo = to ?? from;

	if (salaryFrom === null || salaryTo === null) {
		return false;
	}

	switch (bucket) {
		case 'under_80':
			return salaryFrom < 80000;

		case 'from_80_to_150':
			return salaryFrom <= 150000 && salaryTo >= 80000;

		case 'from_150_to_250':
			return salaryFrom <= 250000 && salaryTo >= 150000;

		case 'over_250':
			return salaryTo >= 250000;

		default:
			return false;
	}
};

export const vacancyListMock = http.get<
	Record<keyof GetVacanciesListParamsRequest, string>,
	DefaultBodyType,
	GetVacanciesListResponse
>(process.env.API_URL + vacancyApiUrls.getVacanciesList, ({ request }) => {
	const url = new URL(request.url);
	const page = Number(url.searchParams.get('page') ?? 1);
	const limit = Number(url.searchParams.get('limit') ?? 10);
	const search = url.searchParams.get('search');
	const workFormat = url.searchParams.get('workFormat');
	const skillId = url.searchParams.get('skillId');
	const industry = url.searchParams.get('industry');
	const grade = url.searchParams.get('grade');
	const companyType = url.searchParams.get('companyType');
	const employmentForm = url.searchParams.get('employmentForm');
	const salaryBucket = url.searchParams.get('salaryBucket');
	const englishLevel = url.searchParams.get('englishLevel');

	const data = vacancyMock.filter((vacancy) => {
		const hasSearch = search ? vacancy.title.toLowerCase().includes(search.toLowerCase()) : true;

		const hasWorkFormat = workFormat
			? workFormat
					.split(',')
					.some((format) => vacancy.workFormat.some((vacancyFormat) => vacancyFormat === format))
			: true;

		const hasSkillId = skillId
			? skillId
					.split(',')
					.some((skill) => vacancy.skills.some((vacancySkill) => String(vacancySkill.id) === skill))
			: true;

		const hasIndustry = industry
			? industry.split(',').some((ind) => vacancy.industry === ind)
			: true;

		const hasGrade = grade
			? grade.split(',').some((gradeFilter) => vacancy.grade === gradeFilter)
			: true;

		const hasCompanyType = companyType
			? companyType.split(',').some((type) => vacancy.companyType === type)
			: true;

		const hasEmploymentForm = employmentForm
			? employmentForm?.split(',').some((form) => vacancy.employmentForm === form)
			: true;

		const hasSalaryBucket = salaryBucket
			? salaryBucket.split(',').some((bucket) => {
					return isSalaryInBucket(vacancy.salary, bucket as VacancySalaryBucket);
				})
			: true;

		const hasEnglishLevel = englishLevel
			? englishLevel?.split(',').some((level) => vacancy.englishLevel === level)
			: true;

		return (
			hasSearch &&
			hasWorkFormat &&
			hasSkillId &&
			hasIndustry &&
			hasGrade &&
			hasCompanyType &&
			hasEmploymentForm &&
			hasSalaryBucket &&
			hasEnglishLevel
		);
	});

	const paginationData = data
		.slice((page - 1) * limit, page * limit)
		.map(
			({
				rawKeySkills,
				sourceVacancyId,
				description,
				status,
				industry,
				companyType,
				specializationId,
				applyVacancyUrl,
				aiProfile,
				...vacancy
			}) => vacancy,
		);

	return HttpResponse.json({
		data: paginationData,
		page,
		total: data.length,
		limit,
	});
});
