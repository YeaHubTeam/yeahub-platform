export interface ResetQuestionStudyProgressResponse {
	message: string;
	statusCode?: number;
}

export interface ResetQuestionStudyProgressParams {
	profileId: string | number;
	questionId: string | number;
}
