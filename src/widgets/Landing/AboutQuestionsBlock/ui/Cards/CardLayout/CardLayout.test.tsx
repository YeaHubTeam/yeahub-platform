import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { CardLayout } from './CardLayout';

describe('CardLayout', () => {
	it('should render title, description and content slot', () => {
		const { container } = renderComponent(
			<CardLayout
				title="testTitle"
				description="testDescription"
				contentSlot={<span>contentSlot</span>}
			/>,
		);
		const contentSlot = screen.getByText('contentSlot');
		const testTitle = screen.getByText('testTitle');
		const testDescription = screen.getByText('testDescription');

		expect(container).toBeInTheDocument();
		expect(contentSlot).toBeInTheDocument();

		expect(testTitle).toBeInTheDocument();
		expect(testTitle).toHaveClass('title');

		expect(testDescription).toBeInTheDocument();
		expect(testDescription).toHaveClass('description');
	});
});
