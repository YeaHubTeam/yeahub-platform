import { render, screen } from '@testing-library/react';
import React from 'react';

import { renderComponent } from '@/shared/libs';

import { Checkbox } from './Checkbox';
import { CheckboxSkeleton } from './Checkbox.skeleton';
import { checkBoxTestIDs } from './constants';
import { CheckboxProps } from './types';

const renderCheckbox = (props?: CheckboxProps) => {
	return renderComponent(<Checkbox {...props} />);
};
const renderSkeleton = () => {
	return renderComponent(<CheckboxSkeleton />);
};

describe('Checkbox', () => {
	describe('checkbox wrapper', () => {
		it('should render with correct className', () => {
			renderCheckbox();

			const checkboxComponent = screen.getByTestId(checkBoxTestIDs.checkboxComponent);

			expect(checkboxComponent).toHaveClass('checkbox-wrapper');
		});

		it('should render with custom className', () => {
			renderCheckbox({ className: 'customClassName' });

			const checkboxComponent = screen.getByTestId(checkBoxTestIDs.checkboxComponent);

			expect(checkboxComponent).toHaveClass('customClassName');
		});
	});

	describe('checkbox', () => {
		it('should render with correct className', () => {
			renderCheckbox();

			const checkbox = screen.getByTestId(checkBoxTestIDs.checkbox);

			expect(checkbox).toHaveClass('checkbox');
		});

		it('should set indeterminate state', () => {
			renderCheckbox({ isIntermediate: true });

			const checkbox: HTMLInputElement = screen.getByTestId(checkBoxTestIDs.checkbox);

			expect(checkbox).toHaveProperty('indeterminate', true);
		});

		it('should unset indeterminate state', () => {
			renderCheckbox();

			const checkbox: HTMLInputElement = screen.getByTestId(checkBoxTestIDs.checkbox);

			expect(checkbox).not.toHaveProperty('indeterminate', true);
		});

		it('skeleton should to be rendered', () => {
			renderSkeleton();

			const checkbox = screen.queryByTestId(checkBoxTestIDs.checkboxSkeleton);

			expect(checkbox).toBeInTheDocument();
		});

		it('should update indeterminate state when prop changes', () => {
			const { rerender } = render(<Checkbox />);

			const checkbox = screen.getByTestId(checkBoxTestIDs.checkbox) as HTMLInputElement;
			expect(checkbox).not.toHaveProperty('indeterminate', true);

			rerender(<Checkbox isIntermediate />);
			expect(checkbox).toHaveProperty('indeterminate', true);
		});
	});

	describe('label', () => {
		it('should render label when prop is provided', () => {
			renderCheckbox({ label: 'label_text' });

			const label = screen.getByTestId(checkBoxTestIDs.label);

			expect(label).toBeInTheDocument();
			expect(label).toHaveClass('label');
			expect(label).toHaveTextContent('label_text');
		});

		it('label should not be rendered without prop', () => {
			renderCheckbox();

			const label = screen.queryByTestId(checkBoxTestIDs.label);

			expect(label).not.toBeInTheDocument();
		});
	});

	describe('Checkbox component', () => {
		it('should expose input element through ref', () => {
			const ref = React.createRef<HTMLInputElement>();

			render(<Checkbox ref={ref} />);

			expect(ref.current).toBeInstanceOf(HTMLInputElement);
			expect(ref.current?.type).toBe('checkbox');
		});
	});
});
