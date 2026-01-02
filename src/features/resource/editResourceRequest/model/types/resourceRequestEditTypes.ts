import {
	CreateOrEditOrViewResourceFormValues,
	ResourceRequest,
	ResourceRequestFormValues,
} from '@/entities/resource';

export type EditResourceRequestFormValues = ResourceRequestFormValues;

export type ProductType = Omit<CreateOrEditOrViewResourceFormValues, 'skills' | 'specializations'>;

export type EditResourceBodyRequest = {
	product: ProductType;
	skills: number[];
	specializations: number[];
};

export type EditResourceRequestResponse = ResourceRequest;
