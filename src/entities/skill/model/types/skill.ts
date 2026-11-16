import { Response } from '@/shared/libs';
import { Author } from '@/shared/ui/AuthorInfo';

import type { Specialization } from '@/entities/specialization/@x/skill';

export interface Skill {
	id: number;
	title: string;
	description: string;
	imageSrc: string | null;
	createdAt: string;
	updatedAt: string | null;
	specializations: Specialization[];
	createdBy: Author;
}

export type GetSkillsListParamsRequest = {
	page?: number;
	title?: string;
	limit?: number;
	specializations?: number[] | number;
	authorId?: string;
};
export type GetSkillsListResponse = Response<Skill[]>;

export type GetSkillByIdParamsRequest = {
	skillId: string;
};
export type GetSkillByIdResponse = Skill;

export type CreateOrEditSkillFormValues = Pick<
	Skill,
	'id' | 'title' | 'description' | 'imageSrc'
> & {
	skillImage?: string;
	specializations?: number[];
};
