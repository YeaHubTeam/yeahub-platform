export interface Question {
	id: number;
	title: string;
	description: string;
	keywords: string[];
	shortAnswer: string;
	longAnswer: string;
	status: string;
	rate: number;
	rating: number;
	specializations: number[];
	skills: number[];
	imageSrc?: string;
}
