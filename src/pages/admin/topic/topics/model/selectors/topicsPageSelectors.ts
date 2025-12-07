import { State } from '@/shared/config/redux/State';

export const getSelectedTopics = (state: State) => state.topicsPage.selectedTopics || [];
