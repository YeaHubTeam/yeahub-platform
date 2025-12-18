import { DefaultBodyType, http, HttpResponse } from 'msw';

import { resourceApiUrls } from '../../model/constants/resource';
import { Resource } from '../../model/types/resource';
import { GetResourcesListParamsRequest, GetResourcesListResponse } from '../resourceApi';

import { resourcesMock } from './data/resourcesMock';

const parseList = (value: string | null) =>
	value
		? value
				.split(',')
				.map((v) => v.trim())
				.filter(Boolean)
		: [];

const parseNumberList = (value: string | null) =>
	parseList(value)
		.map((v) => Number(v))
		.filter((n) => !Number.isNaN(n));

type SortableKey = 'name' | 'createdAt' | 'updatedAt';

const isSortableKey = (key?: string): key is SortableKey =>
	!!key && (['name', 'createdAt', 'updatedAt'] as const).includes(key as SortableKey);

export const resourcesListMock = http.get<
	Record<keyof GetResourcesListParamsRequest, string>,
	DefaultBodyType,
	GetResourcesListResponse
>(process.env.API_URL + resourceApiUrls.getResourcesList, ({ request }) => {
	const url = new URL(request.url);

	const page = Number(url.searchParams.get('page') ?? 1);
	const limit = Number(url.searchParams.get('limit') ?? 10);

	const name = url.searchParams.get('name') ?? undefined;
	const authorId = url.searchParams.get('authorId') ?? undefined;
	const orderByParam = url.searchParams.get('orderBy') ?? undefined;
	const orderBy = isSortableKey(orderByParam) ? orderByParam : undefined;

	const orderParam = (url.searchParams.get('order') ?? 'asc').toLowerCase();
	const order: 'asc' | 'desc' = orderParam === 'desc' ? 'desc' : 'asc';

	const random = url.searchParams.get('random') === 'true';

	const types = [...url.searchParams.getAll('types'), url.searchParams.get('types')]
		.filter(Boolean)
		.flatMap(parseList);

	const keywords = [...url.searchParams.getAll('keywords'), url.searchParams.get('keywords')]
		.filter(Boolean)
		.flatMap(parseList);

	const specializations = [
		...url.searchParams.getAll('specializations'),
		url.searchParams.get('specializations'),
	]
		.filter(Boolean)
		.flatMap(parseNumberList);

	const skills = [...url.searchParams.getAll('skills'), url.searchParams.get('skills')]
		.filter(Boolean)
		.flatMap(parseNumberList);

	let items = resourcesMock.data.slice();

	if (name) {
		items = items.filter((r) => r.name.toLowerCase().includes(name.toLowerCase()));
	}

	if (authorId) {
		items = items.filter((r) => r.createdBy.id === authorId);
	}

	if (types.length) {
		items = items.filter((r) => types.includes(r.type.code));
	}

	if (specializations.length) {
		items = items.filter((r) => r.specializations?.some((s) => specializations.includes(s.id)));
	}

	if (skills.length) {
		items = items.filter((r) => r.skills?.some((s) => skills.includes(s.id)));
	}

	if (keywords.length) {
		const keywordsLower = keywords.map((k) => k.toLowerCase());
		items = items.filter((r) => r.keywords?.some((k) => keywordsLower.includes(k.toLowerCase())));
	}

	if (random) {
		items = items.slice().sort(() => Math.random() - 0.5);
	} else if (orderBy) {
		items = items.slice().sort((a: Resource, b: Resource) => {
			const av = a[orderBy];
			const bv = b[orderBy];

			let cmp = 0;

			if (typeof av === 'string' && typeof bv === 'string') {
				cmp = av.localeCompare(bv);
			} else if (typeof av === 'number' && typeof bv === 'number') {
				cmp = av - bv;
			} else if (!Number.isNaN(Date.parse(av)) && !Number.isNaN(Date.parse(bv))) {
				cmp = new Date(av).getTime() - new Date(bv).getTime();
			}

			return order === 'asc' ? cmp : -cmp;
		});
	}

	const total = items.length;
	const data = items.slice((page - 1) * limit, page * limit);

	return HttpResponse.json({
		data,
		page,
		total,
		limit,
	});
});
