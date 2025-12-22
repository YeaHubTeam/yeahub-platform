import { progressBarChart, progressCircle, progressDesc } from '../assets';

export const sliderSettings = {
	dots: true,
	speed: 500,
	variableWidth: false,
};

export const historySlides = [
	{
		id: 'statistics',
		src: progressCircle,
		altKey: 'HISTORY_IMG_STATISTICS',
		textKey: 'HISTORY_SLIDES_FIRST',
	},
	{
		id: 'description',
		src: progressDesc,
		altKey: 'HISTORY_IMG_DESCRIPTION',
		textKey: 'HISTORY_SLIDES_SECOND',
	},
	{
		id: 'bar-chart',
		src: progressBarChart,
		altKey: 'HISTORY_IMG_PROGRESS',
		textKey: 'HISTORY_SLIDES_THIRD',
	},
];
