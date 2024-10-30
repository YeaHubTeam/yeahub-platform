import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { useResize } from '@/shared/hooks/useResize';
import { FigmaIcon } from '@/shared/ui/_Icons/FigmaIcon';
import { SkillIcon } from '@/shared/ui/_Icons/SkillIcon';

import cls from './CategoriesList.module.css';

export const CategoriesList = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);
	const size = useResize();
	const isTablet = size < 1440 && size >= 768;

	return (
		<div className={cls.container}>
			<p className={cls.title}>{t(Landing.ANSWERS_CATEGORY)}</p>
			<ul className={cls['categories-list']}>
				<li>
					<FigmaIcon />
					<p>Figma</p>
				</li>
				<li>
					<SkillIcon />
					<p>Wireframing</p>
				</li>
				<li>
					<SkillIcon />
					<p>Wireframing</p>
				</li>
				<li className={cls.css}>
					<FigmaIcon />
					<p>CSS</p>
				</li>
				{isTablet ? (
					<li>
						<FigmaIcon />
						<p> Figma</p>
					</li>
				) : (
					''
				)}
			</ul>
			<p className={cls.more}>{t(Landing.VIEW_MORE)}</p>
		</div>
	);
};
