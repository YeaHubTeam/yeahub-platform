import { screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { userEvent } from 'storybook/test';

import { renderComponent } from '@/shared/libs';
import { useScreenSize } from '@/shared/libs';

import { AnalyticPageTemplate } from './AnalyticPageTemplate';

jest.mock('@/shared/libs', () => ({
	...jest.requireActual('@/shared/libs'),
	useScreenSize: jest.fn(),
}));

jest.mock('@/entities/skill', () => ({
	SkillSelect: ({ onChange }: { onChange: (skills?: number[]) => void }) =>
		require('react').createElement(
			'div',
			null,
			require('react').createElement(
				'button',
				{
					'data-testid': 'skill-select',
					onClick: () => onChange([7]),
				},
				'Skill select',
			),
			require('react').createElement(
				'button',
				{
					'data-testid': 'skill-select-empty',
					onClick: () => onChange(),
				},
				'Empty skill select',
			),
		),
}));

jest.mock('@/entities/specialization', () => ({
	SpecializationSelect: ({
		onChange,
	}: {
		onChange: (specializations: number[] | number) => void;
	}) =>
		require('react').createElement(
			'div',
			null,
			require('react').createElement(
				'button',
				{
					'data-testid': 'specialization-select',
					onClick: () => onChange(5),
				},
				'Specialization select',
			),
			require('react').createElement(
				'button',
				{
					'data-testid': 'specialization-select-array',
					onClick: () => onChange([5, 10]),
				},
				'Specialization select array',
			),
		),
}));

type Props = ComponentProps<typeof AnalyticPageTemplate>;

const renderTemplate = (props: Partial<Props> = {}) => {
	const defaultProps: Props = {
		title: 'Analytics',
		list: <div>Mobile list</div>,
		table: <div>Desktop table</div>,
		filters: {
			onChangeSpecialization: jest.fn(),
		},
	};

	return renderComponent(<AnalyticPageTemplate {...defaultProps} {...props} />);
};

describe('AnalyticPageTemplate', () => {
	beforeEach(() => {
		jest.mocked(useScreenSize).mockReturnValue({
			isMobile: false,
		} as ReturnType<typeof useScreenSize>);
	});

	describe('render', () => {
		test('should render component', () => {
			renderTemplate();

			expect(screen.getByText('Analytics')).toBeInTheDocument();
			expect(screen.getByText('Desktop table')).toBeInTheDocument();
		});
		test('should render mobile list on mobile screen', () => {
			jest.mocked(useScreenSize).mockReturnValue({
				isMobile: true,
			} as ReturnType<typeof useScreenSize>);

			renderTemplate();

			expect(screen.getByText('Mobile list')).toBeInTheDocument();
			expect(screen.queryByText('Desktop table')).not.toBeInTheDocument();
		});
		test('should render tooltip icon when tooltip is provided', async () => {
			const user = userEvent.setup();

			const { container } = renderTemplate({
				tooltip: 'Analytics information',
			});

			const tooltipIcon = container.querySelector('svg');

			expect(tooltipIcon).toBeInTheDocument();

			await user.hover(tooltipIcon!);

			expect(await screen.findByText('Analytics information')).toBeInTheDocument();
		});
	});
	describe('filters', () => {
		test('should call onChangeSpecialization when specialization is changed', async () => {
			const user = userEvent.setup();
			const onChangeSpecialization = jest.fn();

			renderTemplate({
				filters: {
					onChangeSpecialization,
				},
			});

			await user.click(screen.getByTestId('specialization-select'));

			expect(onChangeSpecialization).toHaveBeenCalledWith(5);
		});
		test('should call onResetFilters when reset button is clicked', async () => {
			const user = userEvent.setup();
			const onResetFilters = jest.fn();

			renderTemplate({
				filters: {
					onChangeSpecialization: jest.fn(),
					hasFilters: true,
					onResetFilters,
				},
			});

			const buttons = screen.getAllByRole('button');

			await user.click(buttons[buttons.length - 1]);

			expect(onResetFilters).toHaveBeenCalledTimes(1);
		});
		test('should render pagination when pagination props are provided', () => {
			renderTemplate({
				filters: {
					onChangeSpecialization: jest.fn(),
					page: 1,
					total: 100,
					limit: 10,
					onChangePage: jest.fn(),
				},
			});

			expect(screen.getByRole('button', { name: 'forward button' })).toBeInTheDocument();
			expect(screen.getByRole('button', { name: 'back button' })).toBeInTheDocument();
		});
		test('should call onChangePage when next page button is clicked', async () => {
			const user = userEvent.setup();
			const onChangePage = jest.fn();

			renderTemplate({
				filters: {
					onChangeSpecialization: jest.fn(),
					page: 1,
					total: 100,
					limit: 10,
					onChangePage,
				},
			});

			await user.click(screen.getByRole('button', { name: 'forward button' }));

			expect(onChangePage).toHaveBeenCalledWith(2);
		});
		test('should not render pagination when pagination props are missing', () => {
			renderTemplate();

			expect(screen.queryByRole('button', { name: 'forward button' })).not.toBeInTheDocument();
		});
		test('should call onChangeSkill when skill is changed', async () => {
			const user = userEvent.setup();
			const onChangeSkill = jest.fn();

			renderTemplate({
				filters: {
					onChangeSpecialization: jest.fn(),
					onChangeSkill,
				},
			});

			await user.click(screen.getByTestId('skill-select'));

			expect(onChangeSkill).toHaveBeenCalledWith(7);
		});

		test('should call onChangeSkill with undefined when skill is not selected', async () => {
			const user = userEvent.setup();
			const onChangeSkill = jest.fn();

			renderTemplate({
				filters: {
					onChangeSpecialization: jest.fn(),
					onChangeSkill,
				},
			});

			await user.click(screen.getByTestId('skill-select-empty'));

			expect(onChangeSkill).toHaveBeenCalledWith(undefined);
		});
		test('should call onChangeSpecialization with first specialization from array', async () => {
			const user = userEvent.setup();
			const onChangeSpecialization = jest.fn();

			renderTemplate({
				filters: {
					onChangeSpecialization,
				},
			});

			await user.click(screen.getByTestId('specialization-select-array'));

			expect(onChangeSpecialization).toHaveBeenCalledWith(5);
		});
		test('should render skill select with selected specialization', () => {
			renderTemplate({
				filters: {
					onChangeSpecialization: jest.fn(),
					onChangeSkill: jest.fn(),
					specialization: 5,
				},
			});

			expect(screen.getByTestId('skill-select')).toBeInTheDocument();
		});
	});
});
