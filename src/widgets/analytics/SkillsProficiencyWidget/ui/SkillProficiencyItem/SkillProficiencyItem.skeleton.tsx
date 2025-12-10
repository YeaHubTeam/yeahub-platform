import { GraphProgressBarSkeleton } from '@/shared/ui/GraphProgressBar';

interface SkillProficiencyItemSkeletonProps {
	currentHeight: number;
}

export const SkillProficiencyItemSkeleton = ({
	currentHeight,
}: SkillProficiencyItemSkeletonProps) => {
	return (
		<GraphProgressBarSkeleton
			titleWidth={30}
			variant="medium"
			direction="column"
			currentSize={currentHeight}
			barWidth={20}
			labelWidth={30}
		/>
	);
};
