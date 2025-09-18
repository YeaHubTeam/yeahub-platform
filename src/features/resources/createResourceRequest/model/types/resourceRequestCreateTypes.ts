import { CreateOrEditResourceFormValues, Resource, ResourceTypeCode } from '@/entities/resource';

export type CreateResourceRequestFormValues = Omit<CreateOrEditResourceFormValues, 'id'>;

export type CreateResourceBodyRequest = {
	product: {
		name: string;
		description: string;
		type: ResourceTypeCode;
		iconBase64?: string;
		url: string;
		keywords?: string[];
	};
	skills: number[];
	specializations: number[];
};

export type CreateResourceRequestResponse = Resource;
