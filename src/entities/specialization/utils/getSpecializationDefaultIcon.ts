import { IconsName } from 'yeahub-ui-kit/build/components/Icon/common';

import { Specialization } from '../model/types/specialization';

export function getSpecializationDefaultIcon(specialization: Specialization): IconsName {
	switch (specialization.title) {
		case 'Frontend':
			return 'fileHtml'; //нет подходящей иконки
		case 'Backend':
			return 'codeSimple'; //нет подходящей иконки
		case 'AI':
			return 'brain';
		case 'Vue.js':
			return 'fileVue';
		default:
			return 'codeSimple';
	}
}
