import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';

import { skills } from '../../../model/constants';
import { Badge } from '../../Badge/Badge';
import { CardLayout } from '../CardLayout/CardLayout';

import styles from './SkillsCard.module.css';

export const SkillsCard = () => {
	const { t } = useTranslation(i18Namespace.landing);
	return (
		<CardLayout
			firstRow={
				<>
					<Badge src={skills.swift.src} badgeText={skills.swift.badgeText} />
					<Badge src={skills.python.src} badgeText={skills.python.badgeText} />
				</>
			}
			secondRow={
				<>
					<Badge src={skills.git.src} badgeText={skills.git.badgeText} />
					<Badge
						variant={'secondary'}
						src={skills.react.src}
						badgeText={skills.react.badgeText}
						className={styles.secondary}
					/>
					<Badge src={skills.html.src} badgeText={skills.html.badgeText} />
				</>
			}
			thirdRow={
				<>
					<Badge src={skills.java.src} badgeText={skills.java.badgeText} />
					<Badge src={skills.docker.src} badgeText={skills.docker.badgeText} />
					<Badge src={skills.javascript.src} badgeText={skills.javascript.badgeText} />
					<Badge src={skills.typescript.src} badgeText={skills.typescript.badgeText} />
				</>
			}
			gap={styles.gap}
			title={t(Landing.SKILLS_TITLE)}
			description={t(Landing.SKILLS_DESCRIPTION)}
		/>
	);
};
