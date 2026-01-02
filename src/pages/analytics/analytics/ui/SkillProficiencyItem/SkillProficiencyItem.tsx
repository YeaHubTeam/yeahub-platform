import { GraphProgressBar } from '@/shared/ui/GraphProgressBar';

interface SkillProficiencyItemProps {
	title: string;
	learnedPercentage: number;
	calculateBarHeight: (learnedPercentage: number) => number;
	maxHeight: number;
}

export const SkillProficiencyItem = ({
	title,
	learnedPercentage,
	calculateBarHeight,
	maxHeight,
}: SkillProficiencyItemProps) => {
	return (
		<GraphProgressBar
			title={title}
			variant="medium"
			direction="column"
			totalCount={maxHeight}
			height={maxHeight}
			currentCount={calculateBarHeight(learnedPercentage)}
			label={`${learnedPercentage}%`}
		/>
	);
};
