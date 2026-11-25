import { CreateOrEditOrViewResourceFormValues, Resource } from '@/entities/resource';

export type CreateResourceFormValues = Omit<CreateOrEditOrViewResourceFormValues, 'id' | 'type'> & {
	type: CreateOrEditOrViewResourceFormValues['type'] | '';
	resourceImage: string | null;
};

export type CreateResourceBodyRequest = Omit<CreateResourceFormValues, 'resourceImage'>;
export type CreateResourceResponse = Resource;
