import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './SkillsBlockHeader.module.css';

export const SkillsBlockHeader = () => {
	const navigate = useNavigate();
	const { t } = useI18nHelpers(i18Namespace.profile);

	return (
		<div className={styles['skills-header']}>
			<h3 className={styles['skills-title']}>{t(Profile.PROFILEPAGE_SKILLS_TITLE)}</h3>
			<Button
				theme="link"
				tagName="button"
				className={styles['skills-edit']}
				onClick={() => navigate('edit#skills')}
			>
				{t(Profile.PROFILEPAGE_EDITBUTTON)}
			</Button>
		</div>
	);
};
