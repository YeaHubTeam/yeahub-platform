import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';

import styles from './EmptyStub.module.css';

interface EmptyStubProps {
	text?: string;
	resetFilters?: () => void;
}

export const EmptyStub = ({ resetFilters, text }: EmptyStubProps) => {
	const { t } = useI18nHelpers(i18Namespace.translation);

	return (
		<>
			<p className={styles.text}>
				{t('emptyStub.message', { text: text ? `“${text}”` : undefined })}
			</p>
			<Button size="L" variant="outline" onClick={resetFilters} className={styles.button}>
				{t('emptyStub.resetFilter')}
			</Button>
		</>
	);
};
