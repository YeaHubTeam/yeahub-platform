import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';
import { Icon } from '@/shared/ui/Icon';

import { Input, InputProps } from './Input';

const getElems = () => ({
	wrapper: screen.getByTestId('Input_Wrapper'),
	input: screen.getByTestId('Input_Field'),
	prefix: screen.queryByTestId('Input_Prefix'),
	suffix: screen.queryByTestId('Input_Suffix'),
});

describe('Input', () => {
	let rerender: ReturnType<typeof renderComponent>['rerender'];

	const focusWithKey = async (key: string) => {
		const { wrapper, input } = getElems();
		await userEvent.click(wrapper);
		await userEvent.keyboard(key);

		expect(input).toHaveFocus();
	};

	beforeEach(() => {
		const renderContent = renderComponent(<Input />);
		rerender = renderContent.rerender;
	});

	function rerenderWith(props: Partial<InputProps>) {
		rerender(<Input {...props} />);
		return getElems();
	}

	test('render component', () => {
		const { wrapper, input } = getElems();
		expect(wrapper).toBeInTheDocument();
		expect(input).toBeInTheDocument();
	});

	describe('Events', () => {
		test('focuses input on wrapper click', async () => {
			const { wrapper, input } = getElems();
			await userEvent.click(wrapper);
			expect(input).toHaveFocus();
		});

		test.each(['Enter', 'Space'])('focuses input after click and %s', async (item) => {
			await focusWithKey(`{${item}}`);
		});

		test('calls onChange when typing', async () => {
			const handleChange = jest.fn();
			const { input } = rerenderWith({ onChange: handleChange });
			await userEvent.type(input, 'Hello');
			expect(handleChange).toHaveBeenCalled();
		});
	});

	describe('Check props', () => {
		test('ref as fn should be called with input', () => {
			const refFn = jest.fn();
			const { input } = rerenderWith({ ref: refFn });
			expect(refFn).toHaveBeenCalledWith(input);
		});

		test('ref should be equal input', () => {
			const ref = useRef<HTMLInputElement>(null);
			const { input } = rerenderWith({ ref });
			expect(ref.current).toBe(input);
		});

		test('disabled', async () => {
			const { wrapper, input } = rerenderWith({ disabled: true });
			await userEvent.click(wrapper);
			expect(input).not.toHaveFocus();
			expect(input).toHaveAttribute('disabled');
			expect(wrapper).toHaveAttribute('tabIndex', '-1');
			expect(wrapper).toHaveClass('wrapper-disabled');
		});

		test('error', () => {
			const { wrapper, input } = rerenderWith({ error: true });
			expect(wrapper).toHaveClass('wrapper-error');
			expect(input).toHaveAttribute('aria-invalid');
		});

		test('placeholder', () => {
			const { input } = rerenderWith({ placeholder: 'test-value' });
			expect(input).toHaveAttribute('placeholder', 'test-value');
		});

		test.each<InputProps['size']>(['L', 'S'])('render %s size correctly', (item) => {
			const { wrapper } = rerenderWith({ size: item });
			expect(wrapper).toHaveClass(`wrapper-${item && item.toLowerCase()}`);
		});
	});

	describe('Check compositions', () => {
		test('prefix and suffix', () => {
			const { prefix, suffix } = rerenderWith({
				suffix: <Icon icon="plusCircle" />,
				prefix: <Icon icon="search" size={20} color="black-300" />,
			});

			expect(prefix).toBeInTheDocument();
			expect(prefix).toHaveClass('input-prefix');
			expect(suffix).toBeInTheDocument();
			expect(suffix).toHaveClass('input-suffix');
		});
	});
});
