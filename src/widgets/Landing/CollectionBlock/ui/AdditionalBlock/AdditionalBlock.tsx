import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './AdditionalBlock.module.css';

export const AdditionalBlock = () => {
	const { t } = useTranslation(i18Namespace.landing);

	const { isMobileS } = useScreenSize();

	const navigate = useNavigate();

	return (
		<Flex className={styles['additional-block']}>
			{isMobileS && (
				<Button className={styles['expand-button']} variant="outline">
					{t(Landing.COLLECTION_EXPAND)}
				</Button>
			)}
			<Card className={styles['additional-first']} withOutsideShadow>
				<Text variant="body3" color="white-900">
					{t(Landing.COLLECTION_ADDITIONAL_FIRST)}
				</Text>
			</Card>
			<Card className={styles['additional-second']} withOutsideShadow>
				<Text variant="body3">{t(Landing.COLLECTION_ADDITIONAL_SECOND)}</Text>
			</Card>
			<Card className={styles['additional-third']} withOutsideShadow>
				<Text variant={isMobileS ? 'body3' : 'body5'}>
					{t(Landing.COLLECTION_ADDITIONAL_THIRD)}
				</Text>
			</Card>

			<Button className={styles.button} onClick={() => navigate(ROUTES.collections.route)}>
				{t(Landing.COLLECTION_LINK)}
			</Button>
		</Flex>
	);
};
