import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { renderComponent } from '@/shared/libs';

import { counterTestIds } from './constants';
import { Counter, CounterProps } from './Counter';

describe('Counter', () => {
	const user = userEvent.setup();
	const onChange = jest.fn();

	const component = (props?: Partial<CounterProps>) => {
		renderComponent(<Counter count={props?.count ?? 1} onChange={onChange} {...props} />);
	};

	const componentWithState = (initialCount: number, maxCount?: number) => {
		const Wrapper = () => {
			const [count, setCount] = useState(initialCount);
			return <Counter count={count} onChange={setCount} maxCount={maxCount} />;
		};
		renderComponent(<Wrapper />);
	};

	describe('render component', () => {
		test('render', () => {
			component({ count: 7 });

			const counterDiv = screen.getByTestId(counterTestIds.counter);
			const counterValue = screen.getByTestId(counterTestIds.counterValue);

			expect(counterDiv).toBeInTheDocument();

			expect(counterValue).toBeInTheDocument();
			expect(counterValue).toHaveTextContent('7');

			expect(screen.getByTestId(counterTestIds.counterIconMinus)).toBeInTheDocument();
			expect(screen.getByTestId(counterTestIds.counterIconPlus)).toBeInTheDocument();
		});
		test('component has correct css class', () => {
			component({ count: 5 });

			expect(screen.getByTestId(counterTestIds.counter)).toHaveClass('wrapper');
			expect(screen.getByTestId(counterTestIds.counterValue)).toHaveClass('count');
		});
		test('icons minus has correct attributes', () => {
			component({ count: 9 });

			const iconMinus = screen.getByTestId(counterTestIds.counterIconMinus);

			expect(iconMinus).toHaveAttribute('width', '20');
			expect(iconMinus).toHaveAttribute('height', '20');
			expect(iconMinus).toHaveClass('clickable');
			expect(iconMinus).toHaveAttribute('color', 'var(--color-purple-700)');
			expect(iconMinus).toHaveAttribute('data-testid', 'Counter_IconMinus');
		});
		test('icons plus has correct attributes', () => {
			component({ count: 8 });

			const iconPlus = screen.getByTestId(counterTestIds.counterIconPlus);

			expect(iconPlus).toHaveAttribute('width', '20');
			expect(iconPlus).toHaveAttribute('height', '20');
			expect(iconPlus).toHaveClass('clickable');
			expect(iconPlus).toHaveAttribute('color', 'var(--color-purple-700)');
			expect(iconPlus).toHaveAttribute('data-testid', 'Counter_IconPlus');
		});
	});

	describe('counter change', () => {
		test('decrement the counter', async () => {
			component({ count: 2 });

			await user.click(screen.getByTestId(counterTestIds.counterIconMinus));

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange).toHaveBeenCalledWith(1);
			expect(screen.getByTestId(counterTestIds.counterValue)).toHaveTextContent('2');
		});
		test('increment the counter', async () => {
			component({ count: 6 });

			await user.click(screen.getByTestId(counterTestIds.counterIconPlus));

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange).toHaveBeenCalledWith(7);
			expect(screen.getByTestId(counterTestIds.counterValue)).toHaveTextContent('6');
		});
		test('the counter does not drop below 1 (count = 1)', async () => {
			component({ count: 1 });

			await user.click(screen.getByTestId(counterTestIds.counterIconMinus));

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange).toHaveBeenCalledWith(1);
			expect(screen.getByTestId(counterTestIds.counterValue)).toHaveTextContent('1');
		});
		test('the counter does not increase when the maximum value is reached (count = 10; maxCount = 10)', async () => {
			component({ count: 10, maxCount: 10 });

			await user.click(screen.getByTestId(counterTestIds.counterIconPlus));

			expect(onChange).not.toHaveBeenCalled();
			expect(screen.getByTestId(counterTestIds.counterValue)).toHaveTextContent('10');
		});
		test('if the counter does not have a maximum value, then it increases constantly', async () => {
			component({ count: 999 });

			await user.click(screen.getByTestId(counterTestIds.counterIconPlus));

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange).toHaveBeenCalledWith(1000);
			expect(screen.getByTestId(counterTestIds.counterValue)).toHaveTextContent('999');
		});
	});

	describe('Count value in componentWithState', () => {
		test('count updates correctly in componentWithState', async () => {
			componentWithState(3);

			const counterValue = screen.getByTestId(counterTestIds.counterValue);
			const iconMinus = screen.getByTestId(counterTestIds.counterIconMinus);
			const iconPlus = screen.getByTestId(counterTestIds.counterIconPlus);

			expect(counterValue).toHaveTextContent('3');

			await user.click(iconMinus);
			expect(counterValue).toHaveTextContent('2');

			await user.click(iconPlus);
			expect(counterValue).toHaveTextContent('3');

			await user.click(iconPlus);
			expect(counterValue).toHaveTextContent('4');
		});
		test('count does not exceed maxCount in componentWithState', async () => {
			componentWithState(9, 10);

			const counterValue = screen.getByTestId(counterTestIds.counterValue);
			const iconPlus = screen.getByTestId(counterTestIds.counterIconPlus);

			await user.click(iconPlus);
			expect(counterValue).toHaveTextContent('10');
			await user.click(iconPlus);
			expect(counterValue).toHaveTextContent('10');
		});

		test('count does not go below 1 in componentWithState', async () => {
			componentWithState(1);

			const counterValue = screen.getByTestId(counterTestIds.counterValue);

			expect(counterValue).toHaveTextContent('1');
			await user.click(screen.getByTestId(counterTestIds.counterIconMinus));
			expect(counterValue).toHaveTextContent('1');
		});
	});
});
