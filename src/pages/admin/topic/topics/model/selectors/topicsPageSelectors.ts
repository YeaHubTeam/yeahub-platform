import { State } from '@/shared/config/redux';

export const getSelectedTopics = (state: State) => state.topicsPage.selectedTopics || [];
