import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import { Flex, FlexProps } from './Flex';

const render = (props: FlexProps, className: string) => {
	renderComponent(<Flex {...props} />);
	const component = screen.getByTestId('Flex');
	expect(component).toHaveClass(className);
};
describe('Flex', () => {
	test('render', () => {
		renderComponent(<Flex />);
		const component = screen.getByTestId('Flex');
		expect(component).toBeInTheDocument();
		expect(component).toHaveClass('flex');
	});

	describe('justify', () => {
		test.each([
			['start', 'justify-start'],
			['center', 'justify-center'],
			['between', 'justify-between'],
			['end', 'justify-end'],
			['around', 'justify-around'],
		] satisfies Array<[NonNullable<FlexProps['justify']>, string]>)('%s', (justify, className) => {
			render({ justify }, className);
		});
	});

	describe('direction', () => {
		test.each([
			['row', 'direction-row'],
			['column', 'direction-column'],
			['row-reverse', 'direction-row-reverse'],
			['column-reverse', 'direction-column-reverse'],
		] satisfies Array<[NonNullable<FlexProps['direction']>, string]>)(
			'%s',
			(direction, className) => {
				render({ direction }, className);
			},
		);
	});

	describe('align', () => {
		test.each([
			['end', 'align-end'],
			['start', 'align-start'],
			['center', 'align-center'],
			['normal', 'align-normal'],
		] satisfies Array<[NonNullable<FlexProps['align']>, string]>)('%s', (align, className) => {
			render({ align }, className);
		});
	});

	describe('wrap', () => {
		test.each([
			['wrap', 'wrap'],
			['nowrap', 'nowrap'],
		] satisfies Array<[NonNullable<FlexProps['wrap']>, string]>)('%s', (wrap, className) => {
			render({ wrap }, className);
		});
	});

	describe('gap', () => {
		test.each([
			['4', 'gap4'],
			['6', 'gap6'],
			['8', 'gap8'],
			['10', 'gap10'],
			['12', 'gap12'],
			['14', 'gap14'],
			['16', 'gap16'],
			['20', 'gap20'],
			['24', 'gap24'],
			['26', 'gap26'],
			['28', 'gap28'],
			['30', 'gap30'],
			['32', 'gap32'],
			['40', 'gap40'],
			['48', 'gap48'],
			['52', 'gap52'],
			['60', 'gap60'],
			['100', 'gap100'],
			['120', 'gap120'],
		] satisfies Array<[NonNullable<FlexProps['gap']>, string]>)('%s', (gap, className) => {
			render({ gap }, className);
		});
	});

	test('maxWidth', () => {
		render({ maxWidth: true }, 'max-width');
	});

	test('maxHeight', () => {
		render({ maxHeight: true }, 'max-height');
	});

	test('flex', () => {
		render({ flex: 1 }, 'flex1');
	});

	test('applies custom className', () => {
		render({ className: 'custom-class' }, 'custom-class');
	});

	test('renders children', () => {
		renderComponent(<Flex>content</Flex>);

		expect(screen.getByText('content')).toBeInTheDocument();
	});

	test('uses custom dataTestId', () => {
		renderComponent(<Flex dataTestId="CustomFlex" />);

		expect(screen.getByTestId('CustomFlex')).toBeInTheDocument();
	});

	test('renders custom componentType', () => {
		renderComponent(<Flex componentType="section" dataTestId="FlexSection" />);
		const component = screen.getByTestId('FlexSection');

		expect(component.tagName).toBe('SECTION');
	});

	test('passes other props', () => {
		renderComponent(<Flex aria-label="flex layout" />);

		expect(screen.getByLabelText('flex layout')).toBeInTheDocument();
	});
});
