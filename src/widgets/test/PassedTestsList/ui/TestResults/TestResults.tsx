import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

interface TestResultsProps {
	label: string;
	correctAnswersCount: number;
	incorrectAnswersCount: number;
}

export const TestResults = ({
	label,
	correctAnswersCount,
	incorrectAnswersCount,
}: TestResultsProps) => {
	return (
		<Flex align="center" gap="8">
			<Text variant="body3-accent" color="black-500">
				{label}
			</Text>
			<Flex align="center" gap="8">
				<Flex align="center" gap="4">
					<Icon icon="thumbsUp" color="black-500" />
					<Text variant="body3-accent" color="black-700">
						{correctAnswersCount}
					</Text>
				</Flex>
				<Flex align="center" gap="4">
					<Icon icon="thumbsDown" color="black-500" />
					<Text variant="body3-accent" color="black-700">
						{incorrectAnswersCount}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
