import { Response } from '@/shared/types/types';

import type { Specialization } from '@/entities/specialization';

export interface Skill {
	id: number;
	title: string;
	description: string;
	imageSrc?: string | null;
	createdAt?: string;
	updatedAt?: string;
	specializations?: Specialization[];
}

export type GetSkillsListParamsRequest = {
	page?: number;
	title?: string;
	limit?: number;
	specializations?: number[];
};
export type GetSkillsListResponse = Response<Skill[]>;

export type GetSkillByIdResponse = Skill;

export type CreateOrEditSkillFormValues = Pick<
	Skill,
	'id' | 'title' | 'description' | 'imageSrc'
> & {
	skillImage?: string;
	specializations?: number[];
};
