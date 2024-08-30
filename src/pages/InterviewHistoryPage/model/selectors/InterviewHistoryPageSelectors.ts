import { State } from '@/shared/config/store/State';

export const getInterviewHistoryPageFilter = (state: State) => state.interviewHistoryPage.dateRange;
