import { render, screen } from '@testing-library/react';

import { Widget } from './Widget';

describe('Widget', () => {
	test('render', () => {
		render(<Widget />);
		expect(screen.getByText('test')).toBeInTheDocument();
	});
});
