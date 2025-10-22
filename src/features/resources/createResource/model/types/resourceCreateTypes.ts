import { CreateOrEditOrViewResourceFormValues, Resource } from '@/entities/resource';

export type CreateResourceFormValues = Omit<CreateOrEditOrViewResourceFormValues, 'id'>;

export type CreateResourceBodyRequest = CreateResourceFormValues;
export type CreateResourceResponse = Resource;
