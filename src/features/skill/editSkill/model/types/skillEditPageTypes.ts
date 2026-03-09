import { CreateOrEditSkillFormValues, Skill } from '@/entities/skill';

export type EditSkillFormValues = CreateOrEditSkillFormValues;

export type EditSkillBodyRequest = EditSkillFormValues;
export type EditSkillResponse = Skill;
export type EditSkillError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'skill.skill.not_found'
	| 'skill.skill.title.conflict'
	| 'tinify.tinify.compress_failed'
	| 'tinify.tinify.resize_failed';
