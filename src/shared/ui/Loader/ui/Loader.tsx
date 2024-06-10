import { Block } from '@/shared/ui/Block';

import styles from './Loader.module.css';

export const Loader = () => {
	return (
		<div className={styles.wrapper}>
			<Block className={styles.block}>
				<div className={styles.content}>
					<span className={styles.loader}></span>
					<span className={styles.text}>Идёт загрузка...</span>
				</div>
			</Block>
		</div>
	);
};
