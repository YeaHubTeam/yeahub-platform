import { CreateOrEditSkillFormValues, Skill } from '@/entities/skill';

export type EditSkillFormValues = CreateOrEditSkillFormValues;

export type EditSkillBodyRequest = EditSkillFormValues;
export type EditSkillResponse = Skill;
