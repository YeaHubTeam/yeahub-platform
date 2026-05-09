import { CreateOrEditSpecializationFormValues, Specialization } from '@/entities/specialization';

export type EditSpecializationFormValues = CreateOrEditSpecializationFormValues;

export type EditSpecializationBodyRequest = EditSpecializationFormValues;
export type EditSpecializationResponse = Specialization;

export type EditSpecializationError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'specialization.specialization.not_found'
	| 'specialization.specialization.title.conflict'
	| 'tinify.tinify.compress_failed'
	| 'tinify.tinify.resize_failed';
