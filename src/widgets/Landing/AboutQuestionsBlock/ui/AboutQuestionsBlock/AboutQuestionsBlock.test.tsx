import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest';

import { AboutQuestionsBlock } from './AboutQuestionsBlock';

jest.mock('../InterviewMaterials/InterviewMaterials', () => ({
	InterviewMaterials: () => <div data-testid="interview-materials"></div>,
}));

jest.mock('../SkillsListTicker/SkillsListTicker', () => ({
	SkillsListTicker: () => <div data-testid="skills-list-ticker"></div>,
}));

describe('AboutQuestionsBlock', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render AboutQuestionsBlock', () => {
		const { container } = renderComponent(<AboutQuestionsBlock />);
		expect(container).toBeInTheDocument();

		const section = screen.getByTestId('AboutQuestionsBlock_Section');
		const interviewMaterials = screen.getByTestId('interview-materials');
		const skillsListTicker = screen.getByTestId('skills-list-ticker');

		expect(section).toHaveClass('container');
		expect(interviewMaterials).toBeInTheDocument();
		expect(skillsListTicker).toBeInTheDocument();
	});
});
