export type StudyStatus = 'learned' | 'in-progress' | 'not-learned';

export const getStudyStatus = (
	checksCount: number = 0,
	isLearned: boolean = false,
): StudyStatus => {
	if (checksCount >= 3 && isLearned) return 'learned';
	if (checksCount > 0 && checksCount < 3 && !isLearned) return 'in-progress';
	return 'not-learned';
};
