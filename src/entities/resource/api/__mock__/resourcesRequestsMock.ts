import { DefaultBodyType, http, HttpResponse } from 'msw';

import { resourceApiUrls } from '../../model/constants/resource';
import {
	GetResourceRequestsParams,
	GetResourceRequestsResponse,
	ResourceRequestStatus,
} from '../../model/types/resourceRequest';

import { resourcesRequests } from './data/resourcesRequestsMock';

export const resourcesRequestsMock = http.get<
	Record<keyof GetResourceRequestsParams, string>,
	DefaultBodyType,
	GetResourceRequestsResponse
>(process.env.API_URL + resourceApiUrls.getResourceRequests, ({ request }) => {
	const url = new URL(request.url);

	const page = Number(url.searchParams.get('page') ?? 1);
	const limit = Number(url.searchParams.get('limit') ?? 10);
	const userId = url.searchParams.get('userId');
	const name = url.searchParams.get('name');
	const description = url.searchParams.get('description');
	const type = url.searchParams.get('type');
	const urlRequestPayload = url.searchParams.get('url');

	const statusRaw = url.searchParams.get('status');
	const status = ['pending', 'approved', 'rejected'].includes(statusRaw!)
		? (statusRaw as ResourceRequestStatus)
		: undefined;

	const getArray = (key: string): string[] =>
		url.searchParams.getAll(key).flatMap((v) =>
			v
				.split(',')
				.map((s) => s.trim())
				.filter((s) => s.length > 0),
		);

	const keywords = getArray('keywords');
	const specializations = getArray('specializations')
		.map(Number)
		.filter((n) => !Number.isNaN(n));
	const skills = getArray('skills')
		.map(Number)
		.filter((n) => !Number.isNaN(n));

	const filteredData = resourcesRequests.data.filter((resource) => {
		const hasStatus = status ? resource.status === status : true;

		const hasUserId = userId ? resource.userId === userId : true;

		const hasName = name
			? resource.requestPayload.name?.toLowerCase().includes(name.toLowerCase())
			: true;

		const hasDescription = description
			? resource.requestPayload.description?.toLowerCase().includes(description.toLowerCase())
			: true;

		const hasType = type ? resource.requestPayload.type === type : true;

		const hasUrlRequestPayload = urlRequestPayload
			? resource.requestPayload.url === urlRequestPayload
			: true;

		const hasSpecialization = specializations.length
			? specializations.some((id) => resource.specializations?.some((s) => s.id === id))
			: true;
		const hasSkills = skills.length
			? skills.some((id) => resource.skills?.some((s) => s.id === id))
			: true;
		const hasKeywords = keywords.length
			? keywords.some((kw) =>
					resource.requestPayload.keywords?.some((k) => k.toLowerCase().includes(kw.toLowerCase())),
				)
			: true;

		return (
			hasUserId &&
			hasStatus &&
			hasName &&
			hasDescription &&
			hasType &&
			hasUrlRequestPayload &&
			hasSpecialization &&
			hasSkills &&
			hasKeywords
		);
	});

	const start = (page - 1) * limit;
	const paginated = filteredData.slice(start, start + limit);

	return HttpResponse.json({
		data: paginated,
		page,
		limit,
		total: filteredData.length,
	});
});
