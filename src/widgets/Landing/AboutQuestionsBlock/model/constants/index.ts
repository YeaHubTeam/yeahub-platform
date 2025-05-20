import {
	androidDev,
	dataScience,
	docker,
	frontend,
	gameDevelopment,
	git,
	go,
	html,
	iosDev,
	java,
	javaScript,
	ml,
	postgres,
	python,
	react,
	swift,
	testing,
	typescript,
	webpack,
	filtersBlock,
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
	frontend: { src: frontend, alt: 'Frontend' },
	androidDev: { src: androidDev, alt: 'Android Dev' },
	gameDevelopment: { src: gameDevelopment, alt: 'Game Dev' },
	iosDev: { src: iosDev, alt: 'iOS Dev' },
	dataScience: { src: dataScience, alt: 'Data Science' },
	testing: { src: testing, alt: 'Testing' },
};

export const blocks: Record<string, ImageItem> = {
	filters: { src: filtersBlock, alt: 'filters' },
};

const baseSliderSettings = {
	dots: false,
	infinite: true,
	arrows: false,
	speed: 300,
	variableWidth: true,
};

export const interviewMaterialsSliderSettings = {
	...baseSliderSettings,
	slidesToShow: 2,
	slidesToScroll: 1,
};

export const skillsTickerSliderSettings = {
	...baseSliderSettings,
	slidesToShow: 9,
	slidesToScroll: 3,
};
