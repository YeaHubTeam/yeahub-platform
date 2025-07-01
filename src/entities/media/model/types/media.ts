export interface Media {
	title: string;
	link: string;
	specializationId: number;
}
export interface Specialization {
	id: number;
	title: string;
	description: string;
	imageSrc?: string | null;
	createdAt?: string;
	updatedAt?: string;
}
