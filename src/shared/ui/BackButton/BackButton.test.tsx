import { fireEvent, screen } from '@testing-library/react';

import { Translation } from '@/shared/config';
import { renderComponent } from '@/shared/libs';

import { BackButton } from './BackButton';
import styles from './BackButton.module.css';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUseNavigate,
}));

describe('BackButton', () => {
	beforeEach(() => {
		renderComponent(<BackButton />);
	});

	test('should render BackButton', () => {
		const component = screen.getByTestId('BackButton');
		expect(component).toBeInTheDocument();
	});

	test('should have button className', () => {
		const component = screen.getByTestId('BackButton');
		expect(component).toHaveClass(styles.button);
	});

	test('should have aria-label from i18n', () => {
		const component = screen.getByTestId('BackButton');
		expect(component).toHaveAttribute('aria-label', Translation.BACK_BUTTON);
	});

	test('should navigate back when clicked', () => {
		const component = screen.getByTestId('BackButton');

		fireEvent.click(component);

		expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
		expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
	});
});
