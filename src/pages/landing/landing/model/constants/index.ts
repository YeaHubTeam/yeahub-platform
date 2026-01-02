import {
	progressBarChart,
	progressCircle,
	progressDesc,
	androidDev1,
	dataScience1,
	docker,
	frontend1,
	gameDevelopment,
	git,
	go,
	html,
	iosDev1,
	java,
	javaScript,
	ml,
	postgres,
	python,
	react,
	swift,
	testing1,
	typescript,
	webpack,
	filtersBlock1,
} from '../assets';

type ImageItem = { src: string; alt: string };

export const skills: Record<string, ImageItem> = {
	javascript: { src: javaScript, alt: 'JavaScript' },
	docker: { src: docker, alt: 'Docker' },
	git: { src: git, alt: 'Git' },
	swift: { src: swift, alt: 'Swift' },
	react: { src: react, alt: 'React' },
	postgres: { src: postgres, alt: 'Postgres' },
	python: { src: python, alt: 'Python' },
	go: { src: go, alt: 'Golang' },
	webpack: { src: webpack, alt: 'Webpack' },
	html: { src: html, alt: 'HTML' },
	typescript: { src: typescript, alt: 'TypeScript' },
	java: { src: java, alt: 'Java' },
};

export const skillsList = Object.values(skills);

export const specializations: Record<string, ImageItem> = {
	ml: { src: ml, alt: 'Machine Learning' },
	frontend: { src: frontend1, alt: 'Frontend' },
	androidDev: { src: androidDev1, alt: 'Android Dev' },
	gameDevelopment: { src: gameDevelopment, alt: 'Game Dev' },
	iosDev: { src: iosDev1, alt: 'iOS Dev' },
	dataScience: { src: dataScience1, alt: 'Data Science' },
	testing: { src: testing1, alt: 'Testing' },
};

export const blocks: Record<string, ImageItem> = {
	filters: { src: filtersBlock1, alt: 'filters' },
};

export const interviewMaterialsSliderSettings = {
	slidesToShow: 2,
	slidesToScroll: 1,
	variableWidth: true,
};

export const skillsTickerSliderSettings = {
	slidesToShow: 9,
	slidesToScroll: 3,
};

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
