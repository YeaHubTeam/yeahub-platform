import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './EmptyStub.module.css';

interface EmptyStubProps {
	resetFilters: () => void;
}

export const EmptyStub = ({ resetFilters }: EmptyStubProps) => {
	const { t } = useI18nHelpers(i18Namespace.translation);

	return (
		<>
			<p className={styles.text}>{t('emptyStub.message')}</p>
			<Button size="large" theme="primary" onClick={resetFilters}>
				{t('emptyStub.resetFilter')}
			</Button>
		</>
	);
};
