import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';

import { getIsEdit } from '@/entities/profile';
import { UserEditButton } from '@/entities/user';

import styles from './InfoBlockHeader.module.css';

export const InfoBlockHeader = () => {
	const { t } = useTranslation([i18Namespace.profile, i18Namespace.translation]);
	const isEdit = useAppSelector(getIsEdit);

	return (
		<div className={styles['info-header']}>
			<h3 className={styles['info-title']}>{t(Profile.TABS_ABOUT_ME)}</h3>
			{isEdit && <UserEditButton tab={'about-me'} />}
		</div>
	);
};
