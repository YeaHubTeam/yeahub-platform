import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';

import styles from './InfoBlockText.module.css';

interface InfoBlockTextProps {
	description: string | undefined;
}

export const InfoBlockText = ({ description }: InfoBlockTextProps) => {
	const { t } = useTranslation(i18Namespace.profile);

	return (
		<div className={styles['info-textarea']}>
			{description ? description : t(Profile.ABOUT_ME_EMPTY)}
		</div>
	);
};
