import { CreateOrEditResourceFormValues, Resource } from '@/entities/resource';

export type CreateResourceFormValues = Omit<CreateOrEditResourceFormValues, 'id'>;

export type CreateResourceBodyRequest = {
	name: string;
	description: string;
	type: string;
	iconBase64: string | null;
	skills: number[];
	specializations: number[];
	keywords: string[];
	isActive: boolean;
};
export type CreateResourceResponse = Resource;
