import { screen, within } from '@testing-library/react';

import { Landing } from '@/shared/config';
import { renderComponent } from '@/shared/libs/jest';

import { SkillsCard } from './SkillsCard';

jest.mock('./SkillsBlock/SkillsBlock', () => ({
	SkillsBlock: () => <div data-testid="skills-block"></div>,
}));

describe('SkillsCard', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render SpecializationCard', () => {
		const { container } = renderComponent(<SkillsCard />);
		expect(container).toBeInTheDocument();
	});

	test('should render SkillsBlock content', () => {
		renderComponent(<SkillsCard />);

		const skillsBlock = screen.getByTestId('skills-block');
		expect(skillsBlock).toBeInTheDocument();
	});

	test('should render SkillsBlock with correct content', () => {
		const { container } = renderComponent(<SkillsCard />);

		const titleElement = within(container).getByText(new RegExp(Landing.SKILLS_TITLE, 'i'));
		const descriptionElement = within(container).getByText(
			new RegExp(Landing.SKILLS_DESCRIPTION, 'i'),
		);

		expect(titleElement).toHaveTextContent(Landing.SKILLS_TITLE);
		expect(descriptionElement).toHaveTextContent(Landing.SKILLS_DESCRIPTION);
	});
});
