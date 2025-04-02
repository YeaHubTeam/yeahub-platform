import { fireEvent, screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { Button } from './Button';

describe('Button', () => {
	beforeEach(() => {
		renderComponent(<Button />);
	});

	test('render', () => {
		const button = screen.getByTestId('Button');
		expect(button).toBeInTheDocument();
	});

	test('button handle click', () => {
		const handleClick = jest.fn();
		const button = screen.getByTestId('Button');

		fireEvent.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
