import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { emptyStubTestIds } from '@/shared/ui/EmptyFilterStub/constants';
import { Text } from '@/shared/ui/Text';

import styles from './EmptyFilerStub.module.css';

export interface EmptyStubProps {
	text?: string;
	resetFilters?: () => void;
}

export const EmptyFilterStub = ({ resetFilters, text }: EmptyStubProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const { isMobileS } = useScreenSize();

	return (
		<>
			<Text
				dataTestId={emptyStubTestIds.emptyStubText}
				variant={isMobileS ? 'body2-accent' : 'body5-accent'}
				className={styles.text}
			>
				{t(Translation.STUB_FILTER_TITLE, { text: text ? `“${text}”` : undefined })}
			</Text>
			<Button
				dataTestId={emptyStubTestIds.emptyStubButton}
				size="large"
				variant="outline"
				onClick={resetFilters}
				className={styles.button}
			>
				{t(Translation.STUB_FILTER_SUBMIT)}
			</Button>
		</>
	);
};
