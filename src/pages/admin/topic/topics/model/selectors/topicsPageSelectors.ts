import { State } from '@/shared/config';

export const getSelectedTopics = (state: State) => state.topicsPage.selectedTopics || [];
