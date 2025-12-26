import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Auth, i18Namespace, ROUTES } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './RegistrationBanner.module.css';

interface RegistrationBannerProps {
	questionsCount: number;
}

export const RegistrationBanner = ({ questionsCount }: RegistrationBannerProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation(i18Namespace.auth);
	const { isMobile } = useScreenSize();

	const handleClickNavigation = () => {
		navigate(ROUTES.auth.register.page);
	};
	return (
		<Card withOutsideShadow className={styles.card}>
			<Flex
				justify="between"
				align="center"
				direction={isMobile ? 'column' : 'row'}
				gap={isMobile ? '12' : '32'}
			>
				<Text variant={isMobile ? 'body3-accent' : 'body5-accent'} color="black-900">
					{t(Auth.QUESTIONS_COUNT_AVAILABLE_AUTHORIZED, { count: questionsCount })}
				</Text>
				<Button
					size="large"
					variant="outline"
					className={styles.button}
					onClick={handleClickNavigation}
				>
					<Text variant="body3-strong" color="purple-700">
						{t(Auth.LOGIN_REGISTER_LINK)}
					</Text>
				</Button>
			</Flex>
		</Card>
	);
};
