import { Block } from '@/shared/ui/Block';

import styles from './ProgressBlock.module.css';

export const ProgressBlock = () => {
	return (
		<Block>
			<h3 className={styles.title}>Прогресс</h3>
			<div>
				<p className={styles.info}>Пройдено 3 из 3 вопрос изучен!</p>
				<div className={styles['progress-bar-wrapper']}>
					<span className={styles['progress-bar-item']}></span>
					<span
						className={`${styles['progress-bar-item']} ${styles['progress-bar-item-large']}`}
					></span>
					<span className={styles['progress-bar-item']}></span>
				</div>
			</div>
		</Block>
	);
};
