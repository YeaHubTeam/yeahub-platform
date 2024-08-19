export interface Skill {
	id: number;
	title: string;
	description: string;
	imageSrc: string;
	createdAt: string;
	updatedAt: string;
}

export interface SkillsListParams {
	page?: number;
	limit?: number;
}

export interface SkillForForm {
	skills: Skill[];
}
