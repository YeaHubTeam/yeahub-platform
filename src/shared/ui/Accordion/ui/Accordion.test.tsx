import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { Accordion } from './Accordion';
import styles from './Accordion.module.css';

describe('Accordion', () => {
	test('render', () => {
		renderComponent(
			<Accordion title="Как выглядит базовая структура HTML страницы?">
				<div>content</div>
			</Accordion>,
		);
		const content = screen.getByText('content');
		const title = screen.getByText('Как выглядит базовая структура HTML страницы?');
		expect(content).toBeInTheDocument();
		expect(title).toBeInTheDocument();
	}),
		test('content is visible after button click', async () => {
			renderComponent(
				<Accordion title="Как выглядит базовая структура HTML страницы?">
					<div>content</div>
				</Accordion>,
			);
			const content = screen.getByText('content');
			const collapsed = content.parentElement?.parentElement;
			expect(collapsed).toHaveStyle('height: 0');
			const button = screen.getByRole('button');
			await userEvent.click(button);
			expect(collapsed).toHaveStyle(`height: ${content.scrollHeight}px`);
		}),
		test('arrow styles are changed after button click', async () => {
			renderComponent(
				<Accordion title="Как выглядит базовая структура HTML страницы?">
					<div>content</div>
				</Accordion>,
			);
			const arrow = screen.getByTestId('Arrow');
			expect(arrow).not.toHaveClass(styles['icon-opened']);
			expect(arrow).toHaveClass(styles['icon']);
			const button = screen.getByRole('button');
			await userEvent.click(button);
			expect(arrow).toHaveClass(styles['icon-opened']);
		});
});
