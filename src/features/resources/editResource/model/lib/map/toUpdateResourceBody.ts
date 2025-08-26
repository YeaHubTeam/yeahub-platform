import type {
	ResourceEditFormValues,
	UpdateResourceBodyRequest,
} from '../../types/resourcesEditTypes';

const trim = (s: string | null | undefined) => (s ?? '').trim();

export const toUpdateResourceBody = (v: ResourceEditFormValues): UpdateResourceBodyRequest => {
	const dto: UpdateResourceBodyRequest = {
		name: trim(v.name) || undefined,
		description: trim(v.description) || undefined,
		type: trim(v.provider) || undefined,
		url: trim(v.url) ? trim(v.url) : null,
		skills: (v.skills ?? []).map(Number),
		specializations: (v.specializations ?? []).map(Number),
		keywords: (v.keywords ?? []).map((k) => k.trim()).filter(Boolean),
	};

	if (v.iconBase64 === null) {
		dto.iconBase64 = null;
	} else if (trim(v.iconBase64)) {
		dto.iconBase64 = trim(v.iconBase64)!;
	}

	return dto;
};
