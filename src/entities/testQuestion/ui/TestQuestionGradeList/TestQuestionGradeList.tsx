import { useTranslation } from 'react-i18next';

import { i18Namespace, TestQuestions, Analytics } from '@/shared/config';
import { GradeList } from '@/shared/ui/GradeList';

export interface TestQuestionGradeListProps {
	className?: string;
	rate?: number;
	complexity?: number;
	frequency?: number;
	size?: 'small' | 'medium';
}

export const TestQuestionGradeList = ({
	rate,
	complexity,
	frequency,
	size,
	className,
}: TestQuestionGradeListProps) => {
	const { t } = useTranslation([i18Namespace.testQuestion, i18Namespace.analytics]);

	const grades = [
		{ label: t(TestQuestions.RATE_LABEL), value: rate },
		{ label: t(TestQuestions.COMPLEXITY_LABEL), value: complexity },
		{
			label: t(Analytics.POPULAR_QUESTIONS_FREQUENCY, { ns: i18Namespace.analytics }),
			value: frequency,
		},
	];

	return <GradeList size={size} className={className} items={grades} />;
};
