import progressBarChart from '@/widgets/Landing/HistoryBlock/model/assets/progressBarChart.avif';
import progressCircle from '@/widgets/Landing/HistoryBlock/model/assets/progressCircle.avif';
import progressDescription from '@/widgets/Landing/HistoryBlock/model/assets/progressDesc.avif';

export const sliderSettings = {
	dots: true,
	arrows: false,
	speed: 500,
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
		src: progressDescription,
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
