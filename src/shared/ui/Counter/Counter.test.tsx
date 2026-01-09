import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '@/shared/libs';

import { Counter, CounterProps } from './Counter';

describe('Counter', () => {
	const user = userEvent.setup();
	const onChange = jest.fn();

	const component = (props?: Partial<CounterProps>) => {
		renderComponent(<Counter count={props?.count ?? 1} onChange={onChange} {...props} />);
	};

	test('render ', () => {
		component({ count: 7 });

		expect(screen.getByText('7')).toBeInTheDocument();
		expect(screen.getByTestId('Counter_IconMinus')).toBeInTheDocument();
		expect(screen.getByTestId('Counter_IconPlus')).toBeInTheDocument();
	});

	describe('counter change', () => {
		test('decrement the counter', async () => {
			component({ count: 2 });

			await user.click(screen.getByTestId('Counter_IconMinus'));

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange).toHaveBeenCalledWith(1);
		});
		test('increment the counter', async () => {
			component({ count: 6 });

			await user.click(screen.getByTestId('Counter_IconPlus'));

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange).toHaveBeenCalledWith(7);
		});
		test('the counter does not drop below 1 (count = 1)', async () => {
			component({ count: 1 });

			await user.click(screen.getByTestId('Counter_IconMinus'));

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange).toHaveBeenCalledWith(1);
		});
		test('the counter does not increase when the maximum value is reached (count = 10; maxCount = 10)', async () => {
			component({ count: 10, maxCount: 10 });

			await user.click(screen.getByTestId('Counter_IconPlus'));

			expect(onChange).not.toHaveBeenCalled();
		});
	});
});
