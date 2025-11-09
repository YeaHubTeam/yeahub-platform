import { screen, within } from '@testing-library/react';

import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { SpecializationCard } from './SpecializationCard';

jest.mock('./SpecializationBlock/SpecializationBlock', () => ({
	SpecializationBlock: () => <div data-testid="specialization-block"></div>,
}));

describe('SpecializationCard', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render SpecializationCard', () => {
		const { container } = renderComponent(<SpecializationCard />);
		expect(container).toBeInTheDocument();
	});

	test('should render SpecializationBlock content', () => {
		renderComponent(<SpecializationCard />);
		const specializationBlock = screen.getByTestId('specialization-block');
		expect(specializationBlock).toBeInTheDocument();
	});

	test('should render SpecializationCard with correct content', () => {
		const { container } = renderComponent(<SpecializationCard />);

		const titleElement = within(container).getByText(
			new RegExp(Landing.SPECIALIZATION_NEW_TITLE, 'i'),
		);
		const descriptionElement = within(container).getByText(
			new RegExp(Landing.SPECIALIZATION_DESCRIPTION, 'i'),
		);

		expect(titleElement).toHaveTextContent(Landing.SPECIALIZATION_NEW_TITLE);
		expect(descriptionElement).toHaveTextContent(Landing.SPECIALIZATION_DESCRIPTION);
	});
});
