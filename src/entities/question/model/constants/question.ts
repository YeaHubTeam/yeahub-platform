export const LS_INIT_QUESTION_ID = 'initQuestionId';

export const questionApiUrls = {
	getQuestionsList: 'questions',
	getQuestionById: 'questions/:questionId',
	getQuestionFilterKeywords: 'questions/filter/keywords',
	getQuestionsForLearn: 'interview-preparation/learn/:profileId',
	getPublicQuestionsList: 'questions/public-questions',
	getPublicQuestionById: 'questions/public-questions/:questionId',
	getStatisticsQuestionsSpecializationById: 'questions/questions-count/:specializationId',
};

export const GENERATED_QUESTIONS_LS_KEY = 'YH:generated.questions.result';
