import { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';

import styles from './Loader.module.css';

interface LoaderProps {
	hasText?: boolean;
	style?: CSSProperties;
}

export const Loader = ({ hasText = true, style }: LoaderProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	return (
		<div className={styles.wrapper} style={style}>
			<Card>
				<div className={styles.content}>
					<span className={styles.loader}></span>
					{hasText && <span className={styles.text}>{t(Translation.LOADING)}</span>}
				</div>
			</Card>
		</div>
	);
};
