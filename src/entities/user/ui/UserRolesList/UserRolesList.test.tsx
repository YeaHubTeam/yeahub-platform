import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';
import { FlexProps } from '@/shared/ui/Flex/Flex';
import { StatusChipProps } from '@/shared/ui/StatusChip/StatusChip';

import type { Role } from '@/entities/auth';

import { userRolesMock } from '../../__mocks__/data/userRolesMock';
import { userRoleColors } from '../../model/constants/userRoleColors';

import { UserRolesList } from './UserRolesList';

jest.mock('@/shared/ui/Flex', () => ({
	Flex: ({ gap, align, wrap, children, dataTestId }: FlexProps) => (
		<div data-testid={dataTestId} data-gap={gap} data-align={align} data-wrap={wrap}>
			{children}
		</div>
	),
}));

jest.mock('@/shared/ui/StatusChip', () => ({
	StatusChip: ({ status }: StatusChipProps) => (
		<div data-testid="StatusChip" data-variant={status.variant}>
			{status.text}
		</div>
	),
}));

describe('UserRolesList', () => {
	test('renders', () => {
		renderComponent(<UserRolesList userRoles={userRolesMock} />);
		expect(screen.getByTestId('UserRolesList')).toBeInTheDocument();
	});

	test('renders StatusChip for every role', () => {
		renderComponent(<UserRolesList userRoles={userRolesMock} />);
		const chips = screen.getAllByTestId('StatusChip');
		expect(chips).toHaveLength(userRolesMock.length);
	});

	test('applies correct color variants', () => {
		renderComponent(<UserRolesList userRoles={userRolesMock} />);

		const chips = screen.getAllByTestId('StatusChip');

		userRolesMock.forEach((role: Role, index: number) => {
			const chip = chips[index];

			expect(chip).toHaveAttribute('data-variant', userRoleColors[role.name]);
		});
	});

	test('renders nothing when userRoles is empty', () => {
		renderComponent(<UserRolesList userRoles={[]} />);
		expect(screen.queryByTestId('StatusChip')).toBeNull();
	});

	test('correct props to Flex', () => {
		renderComponent(<UserRolesList userRoles={userRolesMock} />);

		const flex = screen.getByTestId('UserRolesList');

		expect(flex).toHaveAttribute('data-gap', '12');
		expect(flex).toHaveAttribute('data-align', 'start');
		expect(flex).toHaveAttribute('data-wrap', 'wrap');
	});
});
