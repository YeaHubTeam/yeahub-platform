import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { parseNumberArray, parseStringArray, useDebounce } from '@/shared/libs';

import { DEFAULT_SPECIALIZATION_ID, Specialization } from '@/entities/specialization';
import { GetVacanciesListParamsRequest, MAX_SHOW_LIMIT_VACANCIES } from '@/entities/vacancy';

interface FilterParams {
	title?: string;
	workFormat?: string[];
	specialization?: number | number[];
	skills?: number[];
	industry?: string[];
	grade?: string[];
	companyType?: string[];
	employmentType?: string[];
	salaryBucket?: string[];
	englishLevel?: string[];
}

export const useVacanciesFilter = (currentSpecialization: Specialization) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const searchParamsString = searchParams.toString();
	const specializationId = currentSpecialization.id;

	const filter: FilterParams = useMemo(
		() => ({
			title: searchParams.get('search') ?? '',
			workFormat: parseStringArray(searchParams.get('workFormat') ?? ''),
			specialization: Number(searchParams.get('specializationId')) || specializationId,
			skills: parseNumberArray(searchParams.get('skillId') ?? ''),
			industry: parseStringArray(searchParams.get('industry') ?? ''),
			grade: parseStringArray(searchParams.get('grade') ?? ''),
			companyType: parseStringArray(searchParams.get('companyType') ?? ''),
			employmentType: parseStringArray(searchParams.get('employmentForm') ?? ''),
			salaryBucket: parseStringArray(searchParams.get('salaryBucket') ?? ''),
			englishLevel: parseStringArray(searchParams.get('englishLevel') ?? ''),
		}),
		[searchParams, specializationId],
	);

	const requestParams: GetVacanciesListParamsRequest = useMemo(
		() => ({
			page: Number(searchParams.get('page')) || 1,
			limit: MAX_SHOW_LIMIT_VACANCIES,
			search: searchParams.get('search') || undefined,
			workFormat: searchParams.get('workFormat') || undefined,
			specializationId: Number(searchParams.get('specializationId')) || specializationId,
			skillId: searchParams.get('skillId') || undefined,
			industry: searchParams.get('industry') || undefined,
			grade: searchParams.get('grade') || undefined,
			companyType: searchParams.get('companyType') || undefined,
			employmentForm: searchParams.get('employmentForm') || undefined,
			salaryBucket: searchParams.get('salaryBucket') || undefined,
			englishLevel: searchParams.get('englishLevel') || undefined,
		}),
		[searchParams, specializationId],
	);

	const setParam = useCallback(
		(key: string, value?: string | string[] | number | number[]) => {
			const params = new URLSearchParams(searchParamsString);

			if (!value || (Array.isArray(value) && value.length === 0)) {
				params.delete(key);
			} else {
				params.set(key, Array.isArray(value) ? value.join(',') : value.toString());
			}

			params.delete('page');

			setSearchParams(params, { replace: true });
		},
		[searchParamsString, setSearchParams],
	);
	const onChangeSearch = useCallback((value: string) => setParam('search', value), [setParam]);

	const onChangeWorkFormat = useCallback(
		(values?: string[]) => setParam('workFormat', values),
		[setParam],
	);

	const onChangeSpecialization = useCallback(
		(nextId?: number) => {
			const params = new URLSearchParams(searchParamsString);
			params.delete('page');
			params.delete('skillId');

			if (nextId && nextId !== specializationId) {
				params.set('specializationId', nextId.toString());
			} else {
				params.delete('specializationId');
			}

			setSearchParams(params, { replace: true });
		},
		[searchParamsString, setSearchParams, specializationId],
	);

	const onChangeSkills = useCallback(
		(skills?: number[]) => setParam('skillId', skills),
		[setParam],
	);

	const onChangeIndustry = useCallback(
		(industry?: string[]) => setParam('industry', industry),
		[setParam],
	);

	const onChangeGrade = useCallback((grade?: string[]) => setParam('grade', grade), [setParam]);

	const onChangeCompanyType = useCallback(
		(type?: string[]) => setParam('companyType', type),
		[setParam],
	);

	const onChangeEmploymentType = useCallback(
		(employmentForm?: string[]) => setParam('employmentForm', employmentForm),
		[setParam],
	);

	const onChangeSalaryBucket = useCallback(
		(salary?: string[]) => setParam('salaryBucket', salary),
		[setParam],
	);

	const onChangeEnglishLevel = useCallback(
		(level?: string[]) => setParam('englishLevel', level),
		[setParam],
	);

	const onChangePage = useCallback(
		(page: number) => {
			const params = new URLSearchParams(searchParamsString);
			params.set('page', page.toString());
			setSearchParams(params, { replace: true });
		},
		[searchParamsString, setSearchParams],
	);

	const debouncedSearch = useDebounce(onChangeSearch, 500);
	const selectedSpecialization = Array.isArray(filter.specialization)
		? filter.specialization[0]
		: (filter.specialization ?? DEFAULT_SPECIALIZATION_ID);
	return {
		filter,
		requestParams,
		selectedSpecialization,
		handlers: {
			onSearch: debouncedSearch,
			onChangeWorkFormat,
			onChangeSpecialization,
			onChangeSkills,
			onChangeIndustry,
			onChangeGrade,
			onChangeCompanyType,
			onChangeEmploymentType,
			onChangeSalaryBucket,
			onChangeEnglishLevel,
			onChangePage,
		},
	};
};

export type UseVacanciesFilterReturn = ReturnType<typeof useVacanciesFilter>;
