import { CreateOrEditOrViewResourceFormValues, Resource } from '@/entities/resource';

export type EditResourceFormValues = CreateOrEditOrViewResourceFormValues & {
	resourceImage: string | null;
};

export type EditResourceBodyRequest = EditResourceFormValues;
export type EditResourceResponse = Resource;
