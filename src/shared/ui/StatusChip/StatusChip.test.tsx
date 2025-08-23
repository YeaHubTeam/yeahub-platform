import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';
import { statusChipTestIds, statusChipVariants } from '@/shared/ui/StatusChip/model/constants';
import { StatusChip, StatusChipVariant } from '@/shared/ui/StatusChip/StatusChip';

const testVariants = Object.keys(statusChipVariants) as StatusChipVariant[];
const testText = 'Test chip text';

describe('StatusChip component', () => {
	test('displays correct text content', () => {
		renderComponent(<StatusChip status={{ variant: testVariants[0], text: testText }} />);
		expect(screen.getByTestId(statusChipTestIds.statusChipText)).toHaveTextContent(testText);
	});

	test('applies correct typography variant', () => {
		renderComponent(<StatusChip status={{ variant: testVariants[0], text: testText }} />);
		expect(screen.getByTestId(statusChipTestIds.statusChipText)).toHaveClass('body1-accent');
	});

	describe.each(testVariants)('For "%s" variant', (variant) => {
		beforeEach(() => {
			renderComponent(<StatusChip status={{ variant, text: testText }} />);
		});

		test('renders with correct variant class', () => {
			expect(screen.getByTestId(statusChipTestIds.statusChip)).toHaveClass(`variant-${variant}`);
		});

		test('applies correct text color', () => {
			expect(screen.getByTestId(statusChipTestIds.statusChipText)).toHaveClass(
				`text-${statusChipVariants[variant]}`,
			);
		});
	});
});
