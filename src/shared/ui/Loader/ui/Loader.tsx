import classNames from 'classnames';
import { CSSProperties } from 'react';

import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';

import styles from './Loader.module.css';

interface LoaderProps {
	hasText?: boolean;
	style?: CSSProperties;
	className?: string;
}

export const Loader = ({ hasText = true, style, className }: LoaderProps) => {
	const { t } = useI18nHelpers();

	return (
		<div className={classNames(styles.wrapper, className)} style={style}>
			<Card className={styles.block}>
				<div className={styles.content}>
					<span className={styles.loader}></span>
					{hasText && <span className={styles.text}>{t('loading')}</span>}
				</div>
			</Card>
		</div>
	);
};
