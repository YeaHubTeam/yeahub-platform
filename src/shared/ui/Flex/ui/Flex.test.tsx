import { screen } from '@testing-library/react';

import { renderComponent } from '../../../libs/jest';

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
		test('start', () => {
			render({ justify: 'start' }, 'justify-start');
		});

		test('center', () => {
			render({ justify: 'center' }, 'justify-center');
		});

		test('between', () => {
			render({ justify: 'between' }, 'justify-between');
		});

		test('end', () => {
			render({ justify: 'end' }, 'justify-end');
		});

		test('around', () => {
			render({ justify: 'around' }, 'justify-around');
		});
	});

	describe('direction', () => {
		test('row', () => {
			render({ direction: 'row' }, 'direction-row');
		});

		test('column', () => {
			render({ direction: 'column' }, 'direction-column');
		});
	});

	describe('align', () => {
		test('end', () => {
			render({ align: 'end' }, 'align-end');
		});

		test('start', () => {
			render({ align: 'start' }, 'align-start');
		});

		test('center', () => {
			render({ align: 'center' }, 'align-center');
		});
	});

	describe('gap', () => {
		test('4', () => {
			render({ gap: '4' }, 'gap4');
		});

		test('8', () => {
			render({ gap: '8' }, 'gap8');
		});

		test('12', () => {
			render({ gap: '12' }, 'gap12');
		});

		test('16', () => {
			render({ gap: '16' }, 'gap16');
		});

		test('24', () => {
			render({ gap: '24' }, 'gap24');
		});

		test('32', () => {
			render({ gap: '32' }, 'gap32');
		});

		test('40', () => {
			render({ gap: '40' }, 'gap40');
		});
	});

	test('maxWidth', () => {
		render({ maxWidth: true }, 'max-width');
	});

	test('maxHeight', () => {
		render({ maxHeight: true }, 'max-height');
	});
});
