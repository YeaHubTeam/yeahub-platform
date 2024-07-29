export interface CreateQuizPageState {
	profileId?: string;
	skills: number[];
	complexity?: number[];
	limit: number;
	mode: QuestionModeType;
}

export type QuestionModeType = 'REPEAT' | 'NEW' | 'RANDOM';
