import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import { CardBlockLayout } from './CardBlockLayout';

describe('CardBlockLayout', () => {
	test('should render children', () => {
		renderComponent(
			<CardBlockLayout>
				<span>Test child</span>
			</CardBlockLayout>,
		);

		expect(screen.getByText('Test child')).toBeInTheDocument();
	});

	test('should apply offset class if passed hasOffset prop', () => {
		const { container } = renderComponent(
			<CardBlockLayout hasOffset>
				<span>With offset</span>
			</CardBlockLayout>,
		);

		expect(container.firstChild).toHaveClass('offset');
	});
});
