import FigmaIcon from '@/shared/assets/icons/figma.png';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import styles from './SkillLabel.module.css';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { i18Namespace } from '@/shared/config/i18n';

interface SkillLabelProps {
	img: string | undefined | null;
	title: string | undefined;
}

export const SkillLabel = ({ img, title }: SkillLabelProps) => {
	const { t } = useI18nHelpers(i18Namespace.profile);
	return (
		<div className={styles.wrapper}>
			<div className={styles['img-wrapper']}>
				<img src={img ?? FigmaIcon} alt={`${t(Profile.SKILLFORM_IMAGE_ALT)} ${title}`} />
			</div>
			<h4 className={styles.title}>{title ?? 'Супер скилл!'}</h4>
		</div>
	);
};
