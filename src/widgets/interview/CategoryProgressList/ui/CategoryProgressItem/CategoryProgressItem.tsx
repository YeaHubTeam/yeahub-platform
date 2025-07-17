import { BarChart } from '@/shared/ui/charts/BarChart';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { ProgressByCategoriesData } from '@/entities/quiz';

interface ProgressByCategoriesItemProps {
	progressData: ProgressByCategoriesData;
}

export const CategoryProgressItem = ({ progressData }: ProgressByCategoriesItemProps) => {
	const { category, total, passed } = progressData!;

	return (
		<Flex direction="column" gap="4">
			<Flex justify="between" align="center">
				<Text variant="body2" color="black-800">
					{category}
				</Text>
				<Text variant="body2" color="black-800">
					{passed}/{total}
				</Text>
			</Flex>
			<BarChart progress={progressData!} />
		</Flex>
	);
};
