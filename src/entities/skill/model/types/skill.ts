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

export type EditSkillParamsRequest = GetSkillByIdParamsRequest;

export type ErrorResponce = {
	message: string;
};

export type EditSkillBodyRequest = CreateOrEditSkillFormValues;

export type EditSkillResponse = Skill | ErrorResponce;

export interface PopularSkill {
	id: number;
	skill: Skill;
	specialization: Specialization;
	calculatedAt: string;
	frequencyStat: number;
}

export type PopularSkillsResponse = Response<PopularSkill[]>;

export type PopularSkillsParamsRequest = {
	page?: number;
	limit?: number;
	specializationId?: number;
};
