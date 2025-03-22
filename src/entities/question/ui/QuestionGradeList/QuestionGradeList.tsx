import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { GradeChip } from '@/shared/ui/GradeChip';

export interface QuestionGradeListProps {
	className?: string;
	rate: number;
	complexity: number;
}

export const QuestionGradeList = ({ className, rate, complexity }: QuestionGradeListProps) => {
	const { t } = useTranslation(i18Namespace.questions);
	return (
		<Flex componentType="ul" gap="16" className={className}>
			<GradeChip label={t(Questions.RATE_TITLE_SHORT)} value={rate} />
			<GradeChip label={t(Questions.COMPLEXITY_TITLE_SHORT)} value={complexity} />
		</Flex>
	);
};
