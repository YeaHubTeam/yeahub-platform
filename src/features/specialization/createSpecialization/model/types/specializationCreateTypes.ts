import { CreateOrEditSpecializationFormValues, Specialization } from '@/entities/specialization';

export type CreateSpecializationFormValues = Omit<CreateOrEditSpecializationFormValues, 'id'>;

export type CreateSpecializationBodyRequest = CreateSpecializationFormValues;
export type CreateSpecializationResponse = Specialization;

export type CreateSpecializationError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'specialization.user.not_found'
	| 'specialization.specialization.title.conflict'
	| 'specialization.user.not_found'
	| 'tinify.tinify.compress_failed'
	| 'tinify.tinify.resize_failed';
