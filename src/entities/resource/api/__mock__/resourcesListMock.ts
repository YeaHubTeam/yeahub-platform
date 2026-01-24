import { DefaultBodyType, http, HttpResponse } from 'msw';

import { resourceApiUrls } from '../../model/constants/resource';
import { GetResourcesListParamsRequest, GetResourcesListResponse } from '../resourceApi';

import { resourcesMock } from './data/resourcesMock';

export const resourcesListMock = http.get<
	Record<keyof GetResourcesListParamsRequest, string>,
	DefaultBodyType,
	GetResourcesListResponse
>(process.env.API_URL + resourceApiUrls.getResourcesList, ({ request }) => {
	const url = new URL(request.url);
	const page = Number(url.searchParams.get('page')) ?? 1;
	const limit = Number(url.searchParams.get('limit')) ?? 10;
	const name = url.searchParams.get('name');
	const authorId = url.searchParams.get('authorId');
	const orderBy = url.searchParams.get('orderBy') ?? 'createdAt';
	const order = (url.searchParams.get('order') ?? 'asc') as 'asc' | 'desc';
	const random = url.searchParams.get('random') == 'true';

	const getArrayParam = (param: string): string[] => {
		const allValues = url.searchParams.getAll(`${param}[]`);
		const singleValue = url.searchParams.get(param);
		const values = [...allValues, singleValue].filter(Boolean) as string[];
		return values.flatMap((v) => v.split(',')).filter(Boolean);
	};

	const types = getArrayParam('types');
	const keywords = getArrayParam('keywords');
	const specializations = getArrayParam('specializations')
		.map(Number)
		.filter((n) => !isNaN(n));
	const skills = getArrayParam('skills')
		.map(Number)
		.filter((n) => !isNaN(n));

	const filteredData = resourcesMock.data.filter((resource) => {
		const hasName = name ? resource.name.toLowerCase().includes(name.toLowerCase()) : true;
		const hasAuthor = authorId ? resource.createdBy.id === authorId : true;
		const hasTypes = types.length ? types.includes(resource.type.code) : true;
		const hasSpecialization = specializations.length
			? specializations.some((id) => resource.specializations?.some((s) => s.id === id))
			: true;
		const hasSkills = skills.length
			? skills.some((id) => resource.skills?.some((s) => s.id === id))
			: true;
		const hasKeywords = keywords.length
			? keywords.some((kw) =>
					resource.keywords?.some((k) => k.toLowerCase().includes(kw.toLowerCase())),
				)
			: true;
		return hasName && hasAuthor && hasTypes && hasSpecialization && hasSkills && hasKeywords;
	});

	if (random) {
		filteredData.sort(() => Math.random() - 0.5);
	} else {
		filteredData.sort((a, b) => {
			const aVal = a[orderBy as keyof typeof a];
			const bVal = b[orderBy as keyof typeof b];

			if (aVal == null || bVal == null) {
				if (aVal == null && bVal == null) return 0;
				return aVal == null ? 1 : -1;
			}

			if (aVal instanceof Date && bVal instanceof Date) {
				return order === 'asc' ? aVal.getTime() - bVal.getTime() : bVal.getTime() - aVal.getTime();
			}

			if (typeof aVal === 'string' && typeof bVal === 'string') {
				return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
			}

			return 0;
		});
	}

	const startIndex = (page - 1) * limit;
	const paginatedData = filteredData.slice(startIndex, startIndex + limit);

	return HttpResponse.json({
		data: paginatedData,
		page,
		limit,
		total: filteredData.length,
	});
});
