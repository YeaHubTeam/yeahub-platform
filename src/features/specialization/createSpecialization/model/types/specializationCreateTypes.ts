import { CreateOrEditSpecializationFormValues, Specialization } from '@/entities/specialization';

export type CreateSpecializationFormValues = Omit<CreateOrEditSpecializationFormValues, 'id'>;

export type CreateSpecializationBodyRequest = CreateSpecializationFormValues;
export type CreateSpecializationResponse = Specialization;
