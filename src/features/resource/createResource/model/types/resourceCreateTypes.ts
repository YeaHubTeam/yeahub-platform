import { CreateOrEditResourceFormValues, Resource } from '@/entities/resource';

export type CreateResourceFormValues = Omit<CreateOrEditResourceFormValues, 'id'>;

export type CreateResourceBodyRequest = CreateResourceFormValues;
export type CreateResourceResponse = Resource;
