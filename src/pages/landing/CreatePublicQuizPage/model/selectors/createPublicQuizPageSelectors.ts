import { State } from '@/shared/config/store/State';

export const getCreatePublicQuizPageState = (state: State) => state.createPublicQuizPage;
export const getCreatePublicQuizPageSkills = (state: State) => state.createPublicQuizPage.skills;
export const getCreatePublicQuizPageComplexity = (state: State) =>
	state.createPublicQuizPage.complexity;
export const getCreatePublicQuizPageLimit = (state: State) => state.createPublicQuizPage.limit;
export const getCreatePublicQuizPageMode = (state: State) => state.createPublicQuizPage.mode;
