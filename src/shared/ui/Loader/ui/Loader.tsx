import { CSSProperties } from 'react';

import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';

import styles from './Loader.module.css';

interface LoaderProps {
	hasText?: boolean;
	style?: CSSProperties;
}

export const Loader = ({ hasText = true, style }: LoaderProps) => {
	const { t } = useI18nHelpers();

	return (
		<div className={styles.wrapper} style={style}>
			<Card className={styles.block}>
				<div className={styles.content}>
					<span className={styles.loader}></span>
					{hasText && <span className={styles.text}>{t('loading')}</span>}
				</div>
			</Card>
		</div>
	);
};
