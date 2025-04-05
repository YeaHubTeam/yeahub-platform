import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ClipboardText from '@/shared/assets/icons/ClipboardText.svg';
import NotePencil from '@/shared/assets/icons/NotePencil.svg';
import SealCheck from '@/shared/assets/icons/SealCheck.svg';
import TrendUp from '@/shared/assets/icons/TrendUp.svg';
import UserSwitch from '@/shared/assets/icons/UserSwitch.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizResult } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './JoinToCommunity.module.css';

export const JoinToCommunity = () => {
	const { t } = useTranslation([i18Namespace.interviewQuizResult]);
	const { isMobileS } = useScreenSize();
	const navigate = useNavigate();

	const onMoveRegister = () => {
		navigate(ROUTES.auth.register.page);
	};

	return (
		<Card className={styles.card} withOutsideShadow>
			<Flex direction="column" gap="16">
				<Flex gap="10">
					<SealCheck className={styles['seal-check-icon']} />
					<Text variant="body5-strong">{t(InterviewQuizResult.JOIN_COMMUNITY_TITLE)}</Text>
				</Flex>

				<Flex direction="column" gap="16">
					<Text variant="body2-accent" color="black-600">
						{t(InterviewQuizResult.JOIN_COMMUNITY_DESCRIPTION)}
					</Text>

					<Flex gap={isMobileS ? '8' : '16'} direction={isMobileS ? 'column' : 'row'}>
						<Flex direction="column" gap="8">
							<Flex gap="8" align="center">
								<UserSwitch className={styles['user-switch-icon']} />
								<Text color="purple-700" variant="body2">
									{t(InterviewQuizResult.INTERVIEW_SIMULATOR)}
								</Text>
							</Flex>
							<Flex gap="8" align="center">
								<TrendUp className={styles['trend-up-icon']} />
								<Text color="purple-700" variant="body2">
									{t(InterviewQuizResult.STATS_HISTORY)}
								</Text>
							</Flex>
						</Flex>

						<Flex direction="column" gap="8">
							<Flex gap="8" align="center">
								<NotePencil className={styles['note-pencil-icon']} />
								<Text color="purple-700" variant="body2">
									{t(InterviewQuizResult.MEMORY_MODE)}
								</Text>
							</Flex>
							<Flex gap="8" align="center">
								<ClipboardText className={styles['clipboard-text-icon']} />
								<Text color="purple-700" variant="body2">
									{t(InterviewQuizResult.FULL_ACCESS)}
								</Text>
							</Flex>
						</Flex>
					</Flex>

					<Button
						className={styles['member-button']}
						variant="link"
						size="large"
						suffix={<Icon icon="arrowRight" size={24} />}
						onClick={onMoveRegister}
					>
						{t(InterviewQuizResult.BECOME_MEMBER)}
					</Button>
				</Flex>
			</Flex>
		</Card>
	);
};
