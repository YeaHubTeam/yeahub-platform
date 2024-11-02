import { FigmaIcon } from '@/shared/ui/Icons/FigmaIcon';
import { SkillIcon } from '@/shared/ui/Icons/SkillIcon';

import styles from './Skills.module.css';

export const Skills = () => {
	return (
		<div className={styles.container}>
			<div className={styles['top-block']}>
				<div className={styles['icon-container']}>
					<FigmaIcon />
				</div>
				<div className={styles['icon-container']}>
					<SkillIcon />
				</div>
			</div>
			<div className={styles['bottom-block']}>
				<div className={styles['icon-container']}>
					<SkillIcon />
				</div>
				<div className={styles['icon-container']}>
					<FigmaIcon />
				</div>
			</div>
		</div>
	);
};
