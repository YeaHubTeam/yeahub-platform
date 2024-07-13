export interface Interview {
	id: number;
	title: string;
	description: string;
	keywords: string[];
	date: Date;
	correctAnswersCount: number;
	incorrectAnswersCount: number;
	timeStamp?: string;
	questionCount?: number;
	questionCategories?: string[];
}
