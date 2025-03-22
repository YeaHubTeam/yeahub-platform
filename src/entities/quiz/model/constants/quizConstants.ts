export const LS_ACTIVE_QUIZ_KEY = 'activeQuiz';

export const quizApiUrls = {
	createNewQuiz: 'interview-preparation/quizzes/new/:profileId',
	getActiveQuiz: 'interview-preparation/quizzes/active/:profileId',
	getHistoryQuiz: 'interview-preparation/quizzes/history/:profileId',
	saveQuizResult: 'interview-preparation/quizzes',
	getQuizByProfileId: 'interview-preparation/quizzes/history/:profileId/:quizId',
	getProfileQuizStats: 'interview-preparation/stat/:profileId',
	CloneQuiz: '/interview-preparation/quizzes/:quizId/clone',
};
