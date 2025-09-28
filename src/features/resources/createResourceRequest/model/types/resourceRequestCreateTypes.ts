import {
	CreateOrEditOrViewResourceFormValues,
	ResourceRequest,
	ResourceTypeCode,
} from '@/entities/resource';

export type CreateResourceRequestFormValues = Omit<CreateOrEditOrViewResourceFormValues, 'id'>;

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
export type CreateResourceRequestResponse = ResourceRequest;
