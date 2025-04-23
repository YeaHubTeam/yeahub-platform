import { render, screen } from '@testing-library/react';

import { Text } from './Text';

describe('Text component', () => {
	test('Рендерится без ошибок', () => {
		render(<Text variant="body1">Hello World</Text>);
		expect(screen.getByText('Hello World')).toBeInTheDocument();
	});

	test('Рендерит правильный тег на основе variant', () => {
		render(<Text variant="head2">Heading 2</Text>);
		expect(screen.getByText('Heading 2').tagName).toBe('H2');
	});

	test('Если isMainTitle=true, тег всегда h1', () => {
		render(
			<Text variant="body1" isMainTitle>
				Hello
			</Text>,
		);
		expect(screen.getByText('Hello').tagName).toBe('H1');
	});

	test('Добавляет корректные классы на основе variant и color', () => {
		render(
			<Text variant="body1" color="black-700">
				Styled Text
			</Text>,
		);
		const element = screen.getByText('Styled Text');
		expect(element).toHaveClass('text-black-700');
		expect(element).toHaveClass('body1');
	});

	test('Добавляет класс для maxRows, если параметр передан', () => {
		render(
			<Text variant="body1" maxRows={3}>
				Max Rows
			</Text>,
		);
		expect(screen.getByText('Max Rows')).toHaveClass('text-rows-3');
	});

	test('Добавляет className, если передан', () => {
		render(
			<Text variant="body1" className="custom-class">
				Custom
			</Text>,
		);
		expect(screen.getByText('Custom')).toHaveClass('custom-class');
	});

	test('Применяет width, если передан', () => {
		render(
			<Text variant="body1" width="200px">
				Width Test
			</Text>,
		);
		expect(screen.getByText('Width Test')).toHaveStyle('width: 200px');
	});
});
