export const LS_INIT_QUESTION_ID = 'initQuestionId';

export const questionApiUrls = {
	getQuestionsList: 'questions',
	getQuestionById: 'questions/:questionId',
	getQuestionsForLearn: 'interview-preparation/learn/:profileId',
	getLearnedQuestions: 'questions-stats/learned-questions',
	getPublicQuestionsList: 'questions/public-questions',
	getPublicQuestionById: 'questions/public-questions/:questionId',
	getStatisticsQuestionsSpecializationById: 'questions/questions-count/:specializationId',
	getMostDifficultQuestionsBySpecializationId: 'questions-stats/most-difficult/:specId',
	popularQuestions: 'questions-stats/question-popularity',
};
