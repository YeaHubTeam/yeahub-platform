export interface Specialization {
	id: number;
	title: string;
	description: string;
	imageSrc?: string | null;
	createdAt: string;
	updatedAt: string;
}

export type SpecializationFormValues = Omit<Specialization, 'id' | 'createdAt' | 'updatedAt'>;

export interface SpecializationsListParams {
	page?: number;
	title?: string;
	limit?: number;
}

export interface SpecializationByIdParams {
	specializationId?: string;
}
