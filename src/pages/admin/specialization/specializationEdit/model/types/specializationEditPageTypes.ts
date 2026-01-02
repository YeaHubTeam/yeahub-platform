import { CreateOrEditSpecializationFormValues, Specialization } from '@/entities/specialization';

export type EditSpecializationFormValues = CreateOrEditSpecializationFormValues;

export type EditSpecializationBodyRequest = EditSpecializationFormValues;
export type EditSpecializationResponse = Specialization;
