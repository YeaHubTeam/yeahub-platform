import { CreateOrEditOrViewResourceFormValues, Resource } from '@/entities/resource';

export type CreateResourceFormValues = Omit<CreateOrEditOrViewResourceFormValues, 'id'> & {
	resourceImage: string | null;
};

export type CreateResourceBodyRequest = Omit<CreateResourceFormValues, 'resourceImage'>;
export type CreateResourceResponse = Resource;
