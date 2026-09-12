import { screen } from '@testing-library/react';

import { Questions, i18nForJest } from '@/shared/config';
import { renderComponent } from '@/shared/libs';
import type { StatusChipVariant } from '@/shared/ui/StatusChip';
import { statusChipTestIds } from '@/shared/ui/StatusChip';

import { StudyStatus } from '../../lib/getStudyStatus';

import { QuestionStudyStatus } from './QuestionStudyStatus';

const testStatuses: {
	status: StudyStatus;
	variant: StatusChipVariant;
	translation: string;
}[] = [
	{
		status: 'learned',
		variant: 'green',
		translation: Questions.STUDY_STATUS_LEARNED,
	},
	{
		status: 'in-progress',
		variant: 'yellow',
		translation: Questions.STUDY_STATUS_IN_PROGRESS,
	},
	{
		status: 'not-learned',
		variant: 'red',
		translation: Questions.STUDY_STATUS_NOT_LEARNED,
	},
];

describe('QuestionStudyStatus component', () => {
	describe.each(testStatuses)('For $status status', ({ status, variant, translation }) => {
		beforeEach(() => {
			renderComponent(<QuestionStudyStatus status={status} />);
		});

		test('applies correct variant class', () => {
			expect(screen.getByTestId(statusChipTestIds.statusChip)).toHaveClass(`variant-${variant}`);
		});

		test('displays correct text content', () => {
			expect(screen.getByTestId(statusChipTestIds.statusChipText)).toHaveTextContent(
				i18nForJest.t(translation),
			);
		});
	});
});
