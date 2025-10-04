export interface MostDifficultQuestionsParams {
	specId: number;
}

export interface MostDifficultQuestionsResponse {
	id: number;
	specializationId: number;
	calculatedAt: string;
	topStat: {
		questionId: number;
		title: string;
		answersCount: number;
		state: number;
	};
}
