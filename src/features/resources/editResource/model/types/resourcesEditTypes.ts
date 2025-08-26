import { ResourceAccessCategory } from '@/entities/resource';

export type ResourceEditFormValues = {
	id: string;
	name: string;
	provider: string;
	description: string;
	iconBase64: string;
	imageSrc?: string;
	url: string;
	accessCategory?: ResourceAccessCategory;
	isActive?: boolean;
	skills: number[];
	specializations: number[];
	keywords: string[];
};

export type UpdateResourceBodyRequest = Partial<{
	name: string;
	description: string;
	type: string;
	iconBase64: string | null;
	skills: number[];
	specializations: number[];
}> & {
	keywords: string[];
	url: string | null;
};

export type ResourceRef = { id: number };

export type ResourceTypeDto = {
	code: string;
	description: string;
};

export type ResourceEditResponse = {
	id: string;
	name: string;
	description: string;
	url: string | null;
	imageSrc: string | null;
	keywords: string[];
	skills: ResourceRef[];
	specializations: ResourceRef[];
	type: ResourceTypeDto;
	createdAt: string;
	updatedAt: string;
};
