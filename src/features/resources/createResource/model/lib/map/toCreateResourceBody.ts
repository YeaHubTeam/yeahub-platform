import type {
	CreateResourceBodyRequest,
	CreateResourceFormValues,
} from '../../types/resourceCreateTypes';

export const toCreateResourceBody = (
	resource: CreateResourceFormValues,
): CreateResourceBodyRequest => ({
	name: resource.name.trim(),
	description: resource.description.trim(),
	type: String(resource.url),
	iconBase64: resource.iconBase64 || null,
	skills: (resource.skills ?? []).map(Number),
	specializations: (resource.specializations ?? []).map(Number),
	keywords: (resource.keywords ?? []).map((k) => k.trim()).filter(Boolean),
	isActive: !!resource.isActive,
});
