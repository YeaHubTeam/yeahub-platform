export interface MostDifficultQuestionsResponse {
	id: number;
	specialization: {
		id: number;
		title: string;
		description: string;
		imageSrc: string;
		createdAt: string;
		updatedAt: string;
	};
	calculatedAt: string;
	topStat: {
		questionId: number;
		title: string;
		answersCount: number;
		state: number;
	}[];
}
