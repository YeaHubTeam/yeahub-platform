import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './InfoBlockText.module.css';

interface InfoBlockTextProps {
	description: string | undefined;
}

export const InfoBlockText = ({ description }: InfoBlockTextProps) => {
	const { t } = useI18nHelpers(i18Namespace.profile);

	return (
		<div className={styles['info-textarea']}>
			{description ? description : t(Profile.PROFILEPAGE_ABOUTME_NODESCRIPTION)}
		</div>
	);
};
