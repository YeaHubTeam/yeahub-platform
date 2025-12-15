import type { ProgressBarColor } from '@/shared/ui/ProgressBar';

export const getProgressColor = (
	percent: number,
	redLImit: number = 30,
	greenLImit: number = 70,
): ProgressBarColor => {
	if (percent >= greenLImit) return 'green';
	if (percent < redLImit) return 'red';
	return 'yellow';
};
