export const questionApiUrls = {
	getQuestionsList: 'questions',
	getQuestionById: 'questions/:questionId',
	getLearnedQuestions: 'interview-preparation/learn/:profileId',
	getPublicQuestionsList: 'questions/public-questions',
	getPublicQuestionById: 'questions/public-questions/:questionId',
	getStatisticsQuestionsSpecializationById: 'questions/questions-count/:specializationId',
};

export const mostDifficultQuestionsApiUrls = {
	getMostDifficultQuestionsBySpecializationId: 'questions-stats/most-difficult/:specId',
};
