import { CreateOrEditSkillFormValues, Skill } from '@/entities/skill';

export type CreateSkillFormValues = Omit<CreateOrEditSkillFormValues, 'id'>;

export type CreateSkillBodyRequest = CreateSkillFormValues;
export type CreateSkillResponse = Skill;

export type CreateSkillError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'skill.user.not_found'
	| 'tinify.tinify.compress_failed'
	| 'skill.skill.title.conflict'
	| 'tinify.tinify.resize_failed';
