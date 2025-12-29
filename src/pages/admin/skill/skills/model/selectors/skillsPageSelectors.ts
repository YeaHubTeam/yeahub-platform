import { State } from '@/shared/config';

export const getSelectedSkills = (state: State) => state.skillsPage?.selectedSkills || [];
