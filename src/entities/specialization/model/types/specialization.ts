export interface Specialization {
	id: number;
	title: string;
	description: string;
	imageSrc?: string;
	createdAt: string;
	updatedAt: string;
}

export type SpecializationFormValues = Omit<Specialization, 'id' | 'createdAt' | 'updatedAt'>;

export interface SpecializationsListParams {
	page?: number;
	title?: string;
	limit?: number;
}
