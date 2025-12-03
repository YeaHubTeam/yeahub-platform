import { useTranslation } from 'react-i18next';

import { i18Namespace, InterviewQuizResult, ROUTES } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { CommunityBenefitsList } from '../CommunityBenefitsList/CommunityBenefitsList';

import styles from './JoinToCommunity.module.css';

export const JoinToCommunity = () => {
	const { t } = useTranslation([i18Namespace.interviewQuizResult]);

	return (
		<Card
			className={styles.card}
			withOutsideShadow
			actionTitle={t(InterviewQuizResult.BECOME_MEMBER)}
			actionRoute={ROUTES.interview.page}
			isActionPositionBottom
		>
			<Flex direction="column" gap="16">
				<Flex gap="10">
					<Icon icon="sealCheck" size={24} color="yellow-900" aria-hidden="true" />
					<Text variant="body5-strong">{t(InterviewQuizResult.JOIN_COMMUNITY_TITLE)}</Text>
				</Flex>

				<Text variant="body2-accent" color="black-600">
					{t(InterviewQuizResult.JOIN_COMMUNITY_DESCRIPTION)}
				</Text>

				<CommunityBenefitsList />
			</Flex>
		</Card>
	);
};
