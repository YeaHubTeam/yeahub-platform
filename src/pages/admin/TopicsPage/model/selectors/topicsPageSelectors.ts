import { State } from '@/shared/config/store/State';

export const getSelectedTopics = (state: State) => state.topicsPage.selectedTopics || [];
