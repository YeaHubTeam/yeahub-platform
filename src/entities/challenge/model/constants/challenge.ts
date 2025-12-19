export const challengeApiUrls = {
	getChallengesList: 'api/v1/live-coding/tasks',
	getChallengeById: 'api/v1/live-coding/tasks/:id',
	executeCode: 'api/v1/live-coding/tasks/execute',
	testCode: 'api/v1/live-coding/tasks/test',
};

export const LANGUAGE_IDS = {
	JAVASCRIPT: 63,
} as const;
