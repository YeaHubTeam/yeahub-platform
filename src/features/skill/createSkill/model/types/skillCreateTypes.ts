import { CreateOrEditSkillFormValues, Skill } from '@/entities/skill';

export type CreateSkillFormValues = Omit<CreateOrEditSkillFormValues, 'id'>;

export type CreateSkillBodyRequest = CreateSkillFormValues;
export type CreateSkillResponse = Skill;
