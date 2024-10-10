import { i18Namespace } from '@/shared/config/i18n';
import { Auth } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { AppLogo } from '@/shared/ui/AppLogo';

import { LanguageSwitcher } from '@/features/internationalization/switch-language';

import { BenefitsList } from '../BenefitsList/BenefitsList';

import styles from './AuthAside.module.css';

export const AuthAside = () => {
	const { t } = useI18nHelpers(i18Namespace.auth);

	return (
		<aside className={styles.wrapper}>
			<div className={styles['heading-wrapper']}>
				<div className={styles['logo-wrapper']}>
					<AppLogo isOpen={false} fill="white" />
				</div>
				<p className={styles['logo-text']}>{t(Auth.LOGO_TEXT)}</p>
				<LanguageSwitcher />
			</div>
			<BenefitsList />
		</aside>
	);
};
