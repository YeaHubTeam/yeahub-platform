export const LS_ACTIVE_QUIZZES_KEY = 'activeQuizzes';
export const LS_ACTIVE_MOCK_QUIZ_KEY = 'activeMockQuiz';

export const quizApiUrls = {
	createNewQuiz: 'interview-preparation/quizzes/new/:profileId',
	createNewMockQuiz: 'interview-preparation/quizzes/mock/new',
	getActiveQuiz: 'interview-preparation/quizzes/active/:profileId',
	getHistoryQuiz: 'interview-preparation/quizzes/history/:profileId',
	saveQuizResult: 'interview-preparation/quizzes',
	getQuizByProfileId: 'interview-preparation/quizzes/history/:profileId/:quizId',
	getProfileQuizStats: 'interview-preparation/stat/:profileId',
	cloneQuiz: '/interview-preparation/quizzes/:quizId/clone',
};
