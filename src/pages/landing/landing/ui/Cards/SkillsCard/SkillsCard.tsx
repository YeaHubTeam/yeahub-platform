import { useTranslation } from 'react-i18next';

import { i18Namespace, Landing } from '@/shared/config';

import { CardLayout } from '../CardLayout/CardLayout';

import { SkillsBlock } from './SkillsBlock/SkillsBlock';

export const SkillsCard = () => {
	const { t } = useTranslation(i18Namespace.landing);
	return (
		<CardLayout
			contentSlot={<SkillsBlock />}
			title={t(Landing.SKILLS_TITLE)}
			description={t(Landing.SKILLS_DESCRIPTION)}
		/>
	);
};
