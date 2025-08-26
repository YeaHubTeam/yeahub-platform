import type { ResourceEditResponse, ResourceEditFormValues } from '../../types/resourcesEditTypes';

export const toEditFormValues = (r: ResourceEditResponse): ResourceEditFormValues => ({
	id: r.id,
	name: r.name ?? '',
	provider: r.type?.code ?? '',
	description: r.description ?? '',
	iconBase64: '',
	url: r.url ?? '',
	accessCategory: undefined,
	isActive: undefined,
	skills: r.skills?.map((s) => s.id) ?? [],
	specializations: r.specializations?.map((s) => s.id) ?? [],
	keywords: r.keywords ?? [],
});
