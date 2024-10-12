import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';

import styles from './Loader.module.css';

export const Loader = () => {
	const { t } = useI18nHelpers();

	return (
		<div className={styles.wrapper}>
			<Card className={styles.block}>
				<div className={styles.content}>
					<span className={styles.loader}></span>
					<span className={styles.text}>{t('loading')}</span>
				</div>
			</Card>
		</div>
	);
};
