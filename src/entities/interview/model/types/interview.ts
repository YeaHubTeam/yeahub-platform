import { IconsName } from 'yeahub-ui-kit/build/components/Icon/common';

export interface Interview {
	id: number;
	title: string;
	description: string;
	keywords: string[];
	date: Date;
	correctAnswersCount: number;
	incorrectAnswersCount: number;
}

export interface InterviewQuestion {
	id: string;
	img: string;
	title: string;
	result: string;
}

export interface InterviewQuestionBtn {
	result: string;
	label: string;
	icon: IconsName;
}
