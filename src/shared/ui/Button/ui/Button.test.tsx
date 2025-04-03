import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { Button } from './Button';

describe('Button', () => {
	test('render', () => {
		renderComponent(<Button />);
		const button = screen.getByTestId('Button');
		expect(button).toBeInTheDocument();
	});
});
