import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';

import styles from './EmptyStub.module.css';

interface EmptyStubProps {
	text?: string;
	resetFilters?: () => void;
}

export const EmptyStub = ({ resetFilters, text }: EmptyStubProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	return (
		<>
			<p className={styles.text}>
				{t(Translation.STUB_FILTER_TITLE, { text: text ? `“${text}”` : undefined })}
			</p>
			<Button size="L" variant="outline" onClick={resetFilters} className={styles.button}>
				{t(Translation.STUB_FILTER_SUBMIT)}
			</Button>
		</>
	);
};
