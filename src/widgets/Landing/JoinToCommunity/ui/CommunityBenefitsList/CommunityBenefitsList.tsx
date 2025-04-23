import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizResult } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Flex } from '@/shared/ui/Flex';
import { Icon, IconName } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

type BenefitKey = keyof typeof InterviewQuizResult;
type Benefits = {
	icon: IconName;
	textKey: BenefitKey;
};

const BENEFITS: Benefits[] = [
	{ icon: 'userSwitch', textKey: 'INTERVIEW_SIMULATOR' },
	{ icon: 'notePencil', textKey: 'MEMORY_MODE' },
	{ icon: 'trendUp', textKey: 'STATS_HISTORY' },
	{ icon: 'clipboardText', textKey: 'FULL_ACCESS' },
];

export const CommunityBenefitsList = () => {
	const { t } = useTranslation([i18Namespace.interviewQuizResult]);
	const { isMobile } = useScreenSize();
	const itemWidth = isMobile ? '100%' : 'calc(50% - 8px)';

	return (
		<Flex gap="8" wrap="wrap">
			{BENEFITS.map(({ icon, textKey }) => (
				<Flex style={{ width: itemWidth }} key={textKey} gap="8" align="center">
					<Icon icon={icon} size={20} color="purple-700" aria-hidden="true" />
					<Text color="purple-700" variant="body2">
						{t(InterviewQuizResult[textKey])}
					</Text>
				</Flex>
			))}
		</Flex>
	);
};
