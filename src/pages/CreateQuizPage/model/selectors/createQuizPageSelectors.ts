import { State } from '@/shared/config/store/State';

export const getCreateQuizPageState = (state: State) => state.createQuizPage;
export const getCreateQuizPageProfileId = (state: State) => state.createQuizPage.profileId;
export const getCreateQuizPageSkills = (state: State) => state.createQuizPage.skills;
export const getCreateQuizPageComplexity = (state: State) => state.createQuizPage.complexity;
export const getCreateQuizPageLimit = (state: State) => state.createQuizPage.limit;
export const getCreateQuizPageMode = (state: State) => state.createQuizPage.mode;
