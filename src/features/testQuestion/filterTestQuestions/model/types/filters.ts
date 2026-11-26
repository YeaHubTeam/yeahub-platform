export interface TestQuestionsFilterParams {
	page?: number;
	name?: string;
	isMy?: boolean;
	authorId?: string;
	specialization?: number;
	skills?: number[];
	rate?: number[];
	complexity?: number[];
}
