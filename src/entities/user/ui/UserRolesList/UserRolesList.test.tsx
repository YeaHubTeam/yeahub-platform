import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';
import { StatusChipProps } from '@/shared/ui/StatusChip/StatusChip';

import { mockRoles } from '../../model/data/userRolesMock';

import { UserRolesList } from './UserRolesList';

jest.mock('@/shared/ui/StatusChip', () => ({
	StatusChip: ({ status }: StatusChipProps) => (
		<div data-testid="StatusChip" data-variant={status.variant}>
			{status.text}
		</div>
	),
}));

describe('UserRolesList', () => {
	test('renders', () => {
		renderComponent(<UserRolesList userRoles={mockRoles} />);
		expect(screen.getByTestId('UserRolesList')).toBeInTheDocument();
	});

	test('renders StatusChip for every role', () => {
		renderComponent(<UserRolesList userRoles={mockRoles} />);
		const chips = screen.getAllByTestId('StatusChip');
		expect(chips).toHaveLength(mockRoles.length);
	});

	test('applies correct color variants', () => {
		const expectedColors: Record<string, string> = {
			candidate: 'yellow',
			HR: 'red',
			admin: 'green',
			guest: 'purple',
		};

		renderComponent(<UserRolesList userRoles={mockRoles} />);

		mockRoles.forEach((role) => {
			const chip = screen
				.getAllByTestId('StatusChip')
				.find((c) => c.textContent.includes(role.name));

			expect(chip).toHaveAttribute('data-variant', expectedColors[role.name]);
		});
	});

	test('renders nothing when userRoles is empty', () => {
		renderComponent(<UserRolesList userRoles={[]} />);
		expect(screen.queryByTestId('StatusChip')).toBeNull();
	});
});
