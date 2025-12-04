import { screen } from '@testing-library/react';

import { Translation } from '@/shared/config';
import { renderComponent } from '@/shared/libs/jest';

import { Loader } from './Loader';

describe('Loader', () => {
	test('should render wrapper with default class', () => {
		renderComponent(<Loader />);

		const wrapper = screen.getByTestId('Loader_Wrapper');
		expect(wrapper).toBeInTheDocument();
		expect(wrapper).toHaveClass('wrapper');
	});

	test('should render Card with loader content inside', () => {
		renderComponent(<Loader />);

		expect(screen.getByTestId('LoaderCard')).toBeInTheDocument();
		expect(document.querySelector('.loader')).toBeInTheDocument();
	});

	test('should render loading text when hasText is true (default)', () => {
		renderComponent(<Loader />);

		expect(screen.getByTestId('Loader_Wrapper')).toHaveTextContent(Translation.LOADING);
	});

	test('should not render loading text when hasText is false', () => {
		renderComponent(<Loader hasText={false} />);

		expect(screen.getByTestId('Loader_Wrapper')).not.toHaveTextContent(Translation.LOADING);
	});

	test('should apply custom className and style', () => {
		renderComponent(<Loader className="custom-class" style={{ color: 'red' }} />);

		const wrapper = screen.getByTestId('Loader_Wrapper');
		expect(wrapper).toHaveClass('wrapper');
		expect(wrapper).toHaveClass('custom-class');
		expect(wrapper).toHaveStyle({ color: 'red' });
	});
});
