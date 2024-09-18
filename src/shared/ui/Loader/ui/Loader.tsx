import { Card } from '@/shared/ui/Card';

import styles from './Loader.module.css';

export const Loader = () => {
	return (
		<div className={styles.wrapper}>
			<Card className={styles.block}>
				<div className={styles.content}>
					<span className={styles.loader}></span>
					<span className={styles.text}>Идёт загрузка...</span>
				</div>
			</Card>
		</div>
	);
};
