import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { GradeChip } from '@/shared/ui/GradeChip';

export interface QuestionGradeListProps {
	className?: string;
	rate?: number;
	complexity?: number;
	frequency?: number;
	size?: 'small' | 'medium';
}

export const QuestionGradeList = ({
	className,
	rate,
	complexity,
	frequency,
	size,
}: QuestionGradeListProps) => {
	const { t } = useTranslation([i18Namespace.questions, i18Namespace.analytics]);
	return (
		<Flex componentType="ul" gap="24" className={className}>
			{rate !== undefined && (
				<GradeChip label={t(Questions.RATE_TITLE_SHORT)} value={rate} size={size} />
			)}
			{complexity !== undefined && (
				<GradeChip label={t(Questions.COMPLEXITY_TITLE_SHORT)} value={complexity} size={size} />
			)}
			{frequency !== undefined && (
				<GradeChip
					label={t('analytics:popular.questions.frequency')}
					value={frequency}
					size={size}
				/>
			)}
		</Flex>
	);
};
