import { Response } from '@/shared/libs';

export interface Specialization {
	id: number;
	title: string;
	description: string;
	imageSrc?: string | null;
	createdAt?: string;
	updatedAt?: string;
}

export type GetSpecializationsListParamsRequest = {
	page?: number;
	title?: string;
	limit?: number;
	specializations?: number[];
	authorId?: string;
};
export type GetSpecializationsListResponse = Response<Specialization[]>;

export type GetSpecializationByIdParamsRequest = {
	specializationId: string;
};

export type GetSpecializationByIdResponse = Specialization;

export type CreateOrEditSpecializationFormValues = Pick<
	Specialization,
	'id' | 'title' | 'description' | 'imageSrc'
>;
