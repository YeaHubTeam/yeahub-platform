import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import {
	alignClasses,
	directionClasses,
	gapClasses,
	justifyClasses,
	wrapClasses,
} from './constants';
import { Flex, FlexProps } from './Flex';
import { FlexAlign, FlexDirection, FlexGap, FlexJustify, FlexWrap } from './types';

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
		test.each(Object.entries(justifyClasses) as [FlexJustify, string][])(
			'%s',
			(justify, className) => {
				render({ justify }, className);
			},
		);
	});

	describe('direction', () => {
		test.each(Object.entries(directionClasses) as [FlexDirection, string][])(
			'%s',
			(direction, className) => {
				render({ direction }, className);
			},
		);
	});

	describe('align', () => {
		test.each(Object.entries(alignClasses) as [FlexAlign, string][])('%s', (align, className) => {
			render({ align }, className);
		});
	});

	describe('wrap', () => {
		test.each(Object.entries(wrapClasses) as [FlexWrap, string][])('%s', (wrap, className) => {
			render({ wrap }, className);
		});
	});

	describe('gap', () => {
		test.each(Object.entries(gapClasses) as [FlexGap, string][])('%s', (gap, className) => {
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
