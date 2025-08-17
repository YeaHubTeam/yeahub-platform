import type {
	CreateResourceBodyRequest,
	CreateResourceFormValues,
} from '../../types/resourceCreateTypes';

export const toCreateResourceBody = (f: CreateResourceFormValues): CreateResourceBodyRequest => ({
	name: f.name.trim(),
	description: f.description.trim(),
	provider: f.provider,
	accessCategory: f.accessCategory,
	iconBase64: f.iconBase64 || null,
	skills: (f.skills ?? []).map(Number),
	specializations: (f.specializations ?? []).map(Number),
	keywords: (f.keywords ?? []).map((k) => k.trim()).filter(Boolean),
	isActive: !!f.isActive,
});
