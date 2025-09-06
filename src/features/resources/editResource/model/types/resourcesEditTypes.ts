import { CreateOrEditResourceFormValues, Resource } from '@/entities/resource';

export type EditResourceFormValues = CreateOrEditResourceFormValues;

export type EditResourceBodyRequest = EditResourceFormValues;
export type EditResourceResponse = Resource;
