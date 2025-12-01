import { useTranslation } from 'react-i18next';

import NotFound from '@/shared/assets/images/notFound.avif';
import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { emptyStubTestIds } from '@/shared/ui/EmptyFilterStub/constants';
import { Flex } from '@/shared/ui/Flex';
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
		<Card withShadow={true} className={styles.container}>
			<Flex justify={'center'} align={'center'}>
				<Flex justify={'center'} direction={'column'} align={'center'} className={styles.card}>
					<img src={NotFound} alt="Not Found" className={styles.img} />
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
				</Flex>
			</Flex>
		</Card>
	);
};
