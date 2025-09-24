export interface SkillResponse {
	id: number;
	title: string;
	description: string;
	imageSrc?: string;
	createdAt: string;
	updatedAt: string;
}

export interface PopularSkillsData {
	id: number;
	skill: SkillResponse;
	calculatedAt: string;
	frequencyStat: number;
}

export interface PopularSkillsResponse {
	page: number;
	limit: number;
	total: number;
	data: PopularSkillsData[];
}
