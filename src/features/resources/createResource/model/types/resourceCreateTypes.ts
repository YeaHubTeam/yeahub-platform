import {
	CreateOrEditResourceFormValues,
	Resource,
	ResourceAccessCategory,
} from '@/entities/resource';

export type CreateResourceFormValues = Omit<CreateOrEditResourceFormValues, 'id'>;

export type CreateResourceBodyRequest = {
	name: string;
	description: string;
	provider: string;
	accessCategory: ResourceAccessCategory;
	iconBase64: string | null;
	skills: number[];
	specializations: number[];
	keywords: string[];
	isActive: boolean;
};
export type CreateResourceResponse = Resource;
