import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

interface InterviewResultsProps {
	label: string;
	correctAnswersCount: number;
	incorrectAnswersCount: number;
}

export const InterviewResults = ({
	label,
	correctAnswersCount,
	incorrectAnswersCount,
}: InterviewResultsProps) => {
	return (
		<Flex align="center" gap="8">
			<Text variant="body3-accent" color="black-500">
				{label}
			</Text>
			<Flex align="center" gap="8">
				<Flex align="center" gap="4">
					<Icon icon="arrowUpSquare" color="black-500" />
					<Text variant="body3-accent" color="black-700">
						{correctAnswersCount}
					</Text>
				</Flex>
				<Flex align="center" gap="4">
					<Icon icon="arrowDownSquare" color="black-500" />
					<Text variant="body3-accent" color="black-700">
						{incorrectAnswersCount}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
