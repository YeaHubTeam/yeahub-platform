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
} from '../assets';

type BadgeItem = { src: string; badgeText: string };

export const skills: Record<string, BadgeItem> = {
	javascript: { src: javaScript, badgeText: 'JavaScript' },
	docker: { src: docker, badgeText: 'Docker' },
	git: { src: git, badgeText: 'Git' },
	swift: { src: swift, badgeText: 'Swift' },
	react: { src: react, badgeText: 'React' },
	postgres: { src: postgres, badgeText: 'Postgres' },
	python: { src: python, badgeText: 'Python' },
	go: { src: go, badgeText: 'Golang' },
	java: { src: java, badgeText: 'Java' },
	webpack: { src: webpack, badgeText: 'Webpack' },
	html: { src: html, badgeText: 'HTML' },
	typescript: { src: typescript, badgeText: 'TypeScript' },
};

export const skillsList = Object.values(skills);

export const specialties: Record<string, BadgeItem> = {
	ml: { src: ml, badgeText: 'Machine Learning' },
	frontend: { src: frontend, badgeText: 'Frontend' },
	androidDev: { src: androidDev, badgeText: 'Android Dev' },
	gameDevelopment: { src: gameDevelopment, badgeText: 'Game Dev' },
	iosDev: { src: iosDev, badgeText: 'iOS Dev' },
	dataScience: { src: dataScience, badgeText: 'Data Science' },
	testing: { src: testing, badgeText: 'Testing' },
};
