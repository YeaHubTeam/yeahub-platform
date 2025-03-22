import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

import styles from './EmptyStub.module.css';

interface EmptyStubProps {
	text?: string;
	resetFilters?: () => void;
}

export const EmptyStub = ({ resetFilters, text }: EmptyStubProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const { isMobileS } = useScreenSize();

	return (
		<>
			<Text variant={isMobileS ? 'body2-accent' : 'body5-accent'} className={styles.text}>
				{t(Translation.STUB_FILTER_TITLE, { text: text ? `“${text}”` : undefined })}
			</Text>
			<Button size="large" variant="outline" onClick={resetFilters} className={styles.button}>
				{t(Translation.STUB_FILTER_SUBMIT)}
			</Button>
		</>
	);
};
