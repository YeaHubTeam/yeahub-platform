import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

interface ResumeAnalyzerSkillsHeaderProps {
	matchedCount: string;
}

export const ResumeAnalyzerSkillsHeader = ({ matchedCount }: ResumeAnalyzerSkillsHeaderProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	return (
		<Flex gap="12" justify="start" align="center">
			<Text variant="body6">{t(Translation.SIDEBAR_MENU_SKILLS)}</Text>
			<StatusChip
				size="medium"
				status={{
					variant: 'purple',
					text: matchedCount,
				}}
			/>
		</Flex>
	);
};
