import { State } from '@/shared/config/store/State';

export const getSelectedSkills = (state: State) => state.skillsPage?.selectedSkills || [];
