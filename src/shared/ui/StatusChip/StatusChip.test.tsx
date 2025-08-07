import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';
import { statusChipVariants } from '@/shared/ui/StatusChip/model/constants';
import { StatusChip, StatusChipVariant } from '@/shared/ui/StatusChip/StatusChip';

const testVariants = Object.keys(statusChipVariants) as StatusChipVariant[];
const testText = 'Test chip text';

describe('StatusChip component', () => {
	it('displays correct text content', () => {
		renderComponent(<StatusChip status={{ variant: testVariants[0], text: testText }} />);
		expect(screen.getByText(testText)).toBeInTheDocument();
	});

	it('applies correct typography variant', () => {
		renderComponent(<StatusChip status={{ variant: testVariants[0], text: testText }} />);
		expect(screen.getByTestId('StatusChip')).toHaveClass('body1-accent');
	});

	describe.each(testVariants)('For "%s" variant', (variant) => {
		beforeEach(() => {
			renderComponent(<StatusChip status={{ variant, text: testText }} />);
		});

		it('renders with correct variant class', () => {
			expect(screen.getByTestId('StatusChip')).toHaveClass(`variant-${variant}`);
		});

		it('applies correct text color', () => {
			expect(screen.getByText(testText)).toHaveClass(`text-${statusChipVariants[variant]}`);
		});
	});
});
