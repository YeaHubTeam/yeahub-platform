import { Landing } from '@/shared/config/i18n/i18nTranslations';

import { LinkIcon } from '../types/footerTypes';

export const RESOURCES_LINKS: LinkIcon[] = [
	{
		url: '/docs',
		label: Landing.FOOTER_DOCS,
		isTextLink: true,
		className: 'docs-link',
	},
	{
		url: 'https://www.figma.com/community/file/1438482355619792777/yeahub-public',
		label: 'Figma',
		icon: 'figmaWhite',
		color: 'white-900',
		className: 'figma-link',
	},
	{
		url: 'https://github.com/YeaHubTeam/yeahub-platform',
		label: 'GitHub',
		icon: 'githubWhite',
		color: 'white-900',
		className: 'github-link',
	},
	{
		url: 'https://t.me/yeahub',
		label: 'Telegram',
		icon: 'telegramWhite',
		color: 'white-900',
		className: 'telegram-link',
	},
];
