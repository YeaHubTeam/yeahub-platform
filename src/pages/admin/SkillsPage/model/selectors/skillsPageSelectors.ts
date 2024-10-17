import { State } from '@/shared/config/store/State';

export const getSkillsPageNum = (state: State) => state.skillsPage?.page || 1;

export const getSkillsSearch = (state: State) => state.skillsPage?.search || '';

export const getSelectedSkills = (state: State) => state.skillsPage?.selectedSkills || [];
