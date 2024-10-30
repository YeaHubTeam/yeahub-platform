import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { CategoriesBlock } from '../CategoriesBlock/CategoriesBlock';
import { QuestionInterface } from '../QuestionInterface/QuestionInterface';

import cls from './PlatformInterfaceBlock.module.css';

export const PlatformInterfaceBlock = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	return (
		<section className={cls['platform-interface-block']}>
			<div className={cls['caption-block']}>
				<h2>{t(Landing.PLATFORM_INTERFACE_TITLE)}</h2>
				<p>{t(Landing.PLATFORM_INTERFACE_SUBTITLE)}</p>
			</div>

			<div className={cls.container}>
				<QuestionInterface />
				<CategoriesBlock />
			</div>
		</section>
	);
};
