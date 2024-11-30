import { Response } from '@/shared/types/types';

export interface Skill {
	id: number;
	title: string;
	description: string;
	imageSrc?: string | null;
	createdAt?: string;
	updatedAt?: string;
}

export type GetSkillsListParamsRequest = {
	page?: number;
	title?: string;
	limit?: number;
};
export type GetSkillsListResponse = Response<Skill[]>;

export type GetSkillByIdResponse = Skill;

export type CreateOrEditSkillFormValues = Pick<
	Skill,
	'id' | 'title' | 'description' | 'imageSrc'
> & {
	skillImage?: string;
};
