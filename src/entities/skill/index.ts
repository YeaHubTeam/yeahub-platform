export type { Skill, CreateOrEditSkillFormValues } from './model/types/skill';
export { SkillSelect } from './ui/SkillSelect/SkillSelect';
export { SkillSelectSkeleton } from './ui/SkillSelect/SkillSelect.skeleton';
export { SkillForm } from './ui/SkillForm/SkillForm';
export { SkillCard } from './ui/SkillCard/SkillCard';
export { SkillList } from './ui/SkillList/SkillList';
export { SkillListSkeleton } from './ui/SkillList/SkillList.skeleton';
export { useGetSkillsListQuery, useGetSkillByIdQuery } from './api/skillApi';
export type { ProfileSkill } from '../skill/model/types/profileSkill';

export { skillHandlers } from './api/__mocks__/index';

export { skillsMock } from './api/__mocks__/data/index';
