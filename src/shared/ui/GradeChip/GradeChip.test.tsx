import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { GradeChip, GradeChipProps, labelVariants, valueVariants } from './GradeChip';
import styles from './GradeChip.module.css';

describe('GradeChip Component', () => {
	const defaultProps: Omit<GradeChipProps, 'size'> = {
		label: 'Rate',
		value: 5,
	};

	const sizeClasses = {
		small: {
			label: labelVariants.small,
			value: valueVariants.small,
		},
		medium: {
			label: labelVariants.medium,
			value: valueVariants.medium,
		},
	};

	it('renders correctly with default size (medium)', () => {
		renderComponent(<GradeChip {...defaultProps} />);
		const chip = screen.getByTestId('GradeChip');

		expect(chip).toBeInTheDocument();
		expect(chip.tagName.toLowerCase()).toBe('li');

		expect(chip).toHaveClass(styles['gap12']);
		expect(chip).toHaveClass(styles['align-center']);
		expect(chip).toHaveClass(styles[`size-medium`]);
		expect(chip).toHaveClass(styles.params);

		const label = screen.getByText(`${defaultProps.label}:`);
		expect(label).toBeInTheDocument();
		expect(label).toHaveClass(sizeClasses.medium.label);
		expect(label).toHaveStyle({ color: 'black-800' });

		const value = screen.getByText(defaultProps.value.toString());
		expect(value).toBeInTheDocument();
		expect(value).toHaveClass(styles.value);
		expect(value).toHaveClass(sizeClasses.medium.value);
		expect(value).toHaveStyle({ color: 'white-900' });
	});

	test.each(['small', 'medium'] as const)('renders with size %s', (size) => {
		renderComponent(<GradeChip size={size} {...defaultProps} />);
		const chip = screen.getByTestId('GradeChip');

		expect(chip).toBeInTheDocument();

		expect(chip.tagName.toLowerCase()).toBe('li');

		expect(chip).toHaveClass(styles['gap12']);
		expect(chip).toHaveClass(styles['align-center']);
		expect(chip).toHaveClass(styles[`size-${size}`]);
		expect(chip).toHaveClass(styles.params);

		const label = screen.getByText(`${defaultProps.label}:`);
		expect(label).toBeInTheDocument();
		expect(label).toHaveClass(sizeClasses[size].label);
		expect(label).toHaveStyle({ color: 'black-800' });

		const value = screen.getByText(defaultProps.value.toString());
		expect(value).toBeInTheDocument();
		expect(value).toHaveClass(styles.value);
		expect(value).toHaveClass(sizeClasses[size].value);
		expect(value).toHaveStyle({ color: 'white-900' });
	});
});
