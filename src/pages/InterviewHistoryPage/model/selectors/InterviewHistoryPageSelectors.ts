import { State } from '@/shared/config/store/State';

export const getInterviewHistoryPageDateRange = (state: State) =>
	state.interviewHistoryPage.dateRange;
