import FigmaIcon from '@/shared/assets/icons/figma.png';

import styles from './SkillLabel.module.css';

interface props {
	img: string | undefined | null;
	title: string | undefined;
}

export const SkillLabel = ({ img, title }: props) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles['img-wrapper']}>
				<img src={img ?? FigmaIcon} alt="Skill icon" />
			</div>
			<h4 className={styles.title}>{title ?? 'Супер скилл!'}</h4>
		</div>
	);
};
