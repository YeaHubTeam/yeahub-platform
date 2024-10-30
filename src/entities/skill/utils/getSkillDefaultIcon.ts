import { IconsName } from 'yeahub-ui-kit/build/components/Icon/common';

import { Skill } from '../model/types/skill';

export function getSkillDefaultIcon(skill: Skill): IconsName {
	switch (skill.title) {
		case 'Python':
			return 'file'; //нет подходящей иконки
		case 'JavaScript':
			return 'fileJs';
		case 'SQL':
			return 'fileSql';
		case 'Java':
			return 'file'; //нет подходящей иконки
		case 'React':
			return 'fileJsx';
		case 'Git':
			return 'githubLogo';
		case 'Docker':
			return 'file'; //нет подходящей иконки
		case 'CI/CD':
			return 'file'; //нет подходящей иконки
		case 'Kubernetes':
			return 'file'; //нет подходящей иконки
		case 'Cybersecurity':
			return 'shield';
		case 'TypeScript':
			return 'fileTs';
		case 'HTML':
			return 'fileHtml';
		case 'CSS':
			return 'fileCss';
		default:
			return 'codeSimple';
	}
}
