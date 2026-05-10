import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';
import { FlexProps } from '@/shared/ui/Flex';
import { StatusChipProps } from '@/shared/ui/StatusChip';

import { RoleName } from '@/entities/user';

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
		renderComponent(<UserRolesList userRoles={userRolesMock.map((r) => r.name)} />);
		expect(screen.getByTestId('UserRolesList')).toBeInTheDocument();
	});

	test('renders StatusChip for every role', () => {
		renderComponent(<UserRolesList userRoles={userRolesMock.map((r) => r.name)} />);
		const chips = screen.getAllByTestId('StatusChip');
		expect(chips).toHaveLength(userRolesMock.length);
	});

	test('applies correct color variants', () => {
		renderComponent(<UserRolesList userRoles={userRolesMock.map((r) => r.name)} />);

		const chips = screen.getAllByTestId('StatusChip');

		userRolesMock
			.map((r) => r.name)
			.forEach((roleName: RoleName, index: number) => {
				const chip = chips[index];
				expect(chip).toHaveAttribute('data-variant', userRoleColors[roleName]);
			});
	});

	test('renders nothing when userRoles is empty', () => {
		renderComponent(<UserRolesList userRoles={[]} />);
		expect(screen.queryByTestId('StatusChip')).toBeNull();
	});

	test('correct props to Flex', () => {
		renderComponent(<UserRolesList userRoles={userRolesMock.map((r) => r.name)} />);

		const flex = screen.getByTestId('UserRolesList');

		expect(flex).toHaveAttribute('data-gap', '12');
		expect(flex).toHaveAttribute('data-align', 'start');
		expect(flex).toHaveAttribute('data-wrap', 'wrap');
	});
});
