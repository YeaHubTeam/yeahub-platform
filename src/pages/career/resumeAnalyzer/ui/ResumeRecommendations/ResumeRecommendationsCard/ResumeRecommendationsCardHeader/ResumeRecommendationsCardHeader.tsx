import { Flex } from '@/shared/ui/Flex';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

interface ResumeRecommendationsCardHeaderProps {
	title: string;
	coverageText: string;
}
export const ResumeRecommendationsCardHeader = ({
	title,
	coverageText,
}: ResumeRecommendationsCardHeaderProps) => {
	return (
		<Flex align="center" gap="8" wrap="wrap">
			<Text variant="body6" color="black-900">
				{title}
			</Text>
			<StatusChip
				size="medium"
				status={{
					variant: 'purple',
					text: coverageText,
				}}
			/>
		</Flex>
	);
};
