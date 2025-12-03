import classNames from 'classnames';
import { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { Translation } from '@/shared/config';
import { Card } from '@/shared/ui/Card';

import styles from './Loader.module.css';

interface LoaderProps {
	hasText?: boolean;
	style?: CSSProperties;
	className?: string;
}

export const Loader = ({ hasText = true, style, className }: LoaderProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	return (
		<div
			data-testid={'Loader_Wrapper'}
			className={classNames(styles.wrapper, className)}
			style={style}
		>
			<Card dataTestId={'LoaderCard'}>
				<div className={styles.content}>
					<span className={styles.loader}></span>
					{hasText && <span className={styles.text}>{t(Translation.LOADING)}</span>}
				</div>
			</Card>
		</div>
	);
};
