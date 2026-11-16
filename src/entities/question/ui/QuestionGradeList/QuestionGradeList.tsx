import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { GradeChip } from '@/shared/ui/GradeChip';

export interface QuestionGradeListProps {
	className?: string;
	rate?: number;
	complexity?: number;
	size?: 'small' | 'medium';
}

export const QuestionGradeList = ({
	className,
	rate,
	complexity,
	size,
}: QuestionGradeListProps) => {
	const { t } = useTranslation([i18Namespace.questions]);
	return (
		<Flex componentType="ul" gap="24" className={className}>
			{rate && <GradeChip label={t(Questions.RATE_TITLE_SHORT)} value={rate} size={size} />}
			{complexity && (
				<GradeChip label={t(Questions.COMPLEXITY_TITLE_SHORT)} value={complexity} size={size} />
			)}
		</Flex>
	);
};
