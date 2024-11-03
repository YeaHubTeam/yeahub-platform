import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { CategoriesBlock } from '../CategoriesBlock/CategoriesBlock';
import { QuestionInterface } from '../QuestionInterface/QuestionInterface';

import styles from './PlatformInterfaceBlock.module.css';

export const PlatformInterfaceBlock = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	return (
		<section className={styles['platform-interface-block']}>
			<div className={styles['caption-block']}>
				<h2>{t(Landing.PLATFORM_INTERFACE_TITLE)}</h2>
				<p>{t(Landing.PLATFORM_INTERFACE_SUBTITLE)}</p>
			</div>

			<div className={styles.container}>
				<QuestionInterface />
				<CategoriesBlock />
			</div>
		</section>
	);
};
