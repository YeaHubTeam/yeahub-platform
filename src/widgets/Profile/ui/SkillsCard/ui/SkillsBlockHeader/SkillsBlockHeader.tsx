import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks/useAppSelector';

import { getIsEdit } from '@/entities/profile';
import { UserEditButton } from '@/entities/user';

import styles from './SkillsBlockHeader.module.css';

export const SkillsBlockHeader = () => {
	const isEdit = useAppSelector(getIsEdit);

	const { t } = useTranslation([i18Namespace.profile, i18Namespace.translation]);

	return (
		<div className={styles['skills-header']}>
			<h3 className={styles['skills-title']}>{t(Profile.TABS_SKILLS)}</h3>
			{isEdit && <UserEditButton tab={'skills'} />}
		</div>
	);
};
