import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { STATUS_CHIP_TEXT_COLORS, StatusChip, type StatusChipVariant } from './StatusChip';

const testVariants = Object.keys(STATUS_CHIP_TEXT_COLORS) as StatusChipVariant[];

describe('StatusChip component', () => {
	describe.each(testVariants)('For "%s" variant', (variant) => {
		const testText = `${variant} text`;

		beforeEach(() => {
			renderComponent(<StatusChip status={{ variant, text: testText }} />);
		});

		it('renders with correct variant class', () => {
			expect(screen.getByTestId('StatusChip')).toHaveClass(`variant-${variant}`);
		});

		it('displays correct text content', () => {
			expect(screen.getByText(testText)).toBeInTheDocument();
		});

		it('applies correct text color', () => {
			expect(screen.getByText(testText)).toHaveClass(`text-${STATUS_CHIP_TEXT_COLORS[variant]}`);
		});
	});

	describe('Additional props', () => {
		it('applies custom className when provided', () => {
			renderComponent(
				<StatusChip status={{ variant: 'green', text: 'Test' }} className="custom-class" />,
			);

			const chip = screen.getByTestId('StatusChip');
			expect(chip).toHaveClass('variant-green');
		});
	});
});
