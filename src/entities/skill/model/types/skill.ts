export interface Skill {
	id: number;
	title: string;
	description: string;
	imageSrc: string;
	createdAt: string;
	updatedAt: string;
}

export type SkillFormValues = Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>;

export interface SkillsListParams {
	page?: number;
	title?: string;
	limit?: number;
}

export interface SkillForForm {
	skills: Skill[];
}
