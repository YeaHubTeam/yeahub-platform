import { Card } from '@/shared/ui/Card';
import { GaugeChart } from '@/shared/ui/charts';
import { Flex } from '@/shared/ui/Flex';
import { PassedQuestionsStatInfoList } from '@/shared/ui/PassedQuestionStatInfo';

interface TestResultAdditionalInfoProps {
	className?: string;
	fullCount: number;
	successCount: number;
}

export const TestResultAdditionalInfo = ({
	className,
	fullCount,
	successCount,
}: TestResultAdditionalInfoProps) => {
	const incorrectCount = Math.max(0, fullCount - successCount);
	const percent = fullCount > 0 ? Math.round((successCount / fullCount) * 100) : 0;
	const stats = [
		{ title: 'Всего', value: String(fullCount) },
		{ title: 'Правильно', value: String(successCount) },
		{ title: 'Ошибки', value: String(incorrectCount) },
		{ title: 'Пропуски', value: '0' },
	];
	return (
		<Card className={className} isTitleCenter title="Статистика прохождения">
			<Flex direction="column" justify="center" align="center" gap="24">
				<GaugeChart percent={percent} total={fullCount} />
				<PassedQuestionsStatInfoList stats={stats} />
			</Flex>
		</Card>
	);
};
