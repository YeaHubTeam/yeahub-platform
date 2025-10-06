interface TopStat {
	questionId: number;
	title: string;
	answersCount: number;
	state: number;
}

interface Specialization {
	id: number;
	title: string;
	description: string;
	imageSrc: string;
	createdAt: string;
	updatedAt: string;
}

export interface MostDifficultQuestionsResponse {
	id: number;
	specialization: Specialization;
	calculatedAt: string;
	topStat: TopStat[];
}
