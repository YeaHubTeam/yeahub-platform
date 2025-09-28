import { CreateOrEditOrViewResourceFormValues, Resource } from '@/entities/resource';

export type EditResourceFormValues = CreateOrEditOrViewResourceFormValues;

export type EditResourceBodyRequest = EditResourceFormValues;
export type EditResourceResponse = Resource;
