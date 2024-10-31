import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { UpIcon } from '@/shared/ui/Icons/TechnologyIcon';
import { TechnologyIcon } from '@/shared/ui/Icons/UpIcon';

import cls from './OfferList.module.css';

export const OfferList = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	return (
		<ul className={cls['offer-list']}>
			<li>
				<UpIcon />
				<p>{t(Landing.OFFER_1)}</p>
			</li>
			<li>
				<TechnologyIcon />
				<p> {t(Landing.OFFER_2)}</p>
			</li>
		</ul>
	);
};
