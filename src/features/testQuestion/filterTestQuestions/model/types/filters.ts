export interface TestQuestionsFilterParams {
	page?: number;
	authorId?: string;
	isMy?: boolean;
	specialization?: number;
	skills?: number[];
	complexity?: number[];
	rate?: number[];
}
