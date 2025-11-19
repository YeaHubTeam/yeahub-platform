import { fireEvent, screen } from '@testing-library/react';

import { useScreenSize } from '@/shared/hooks';
import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { ACCORDION_TEST_IDS } from '../model/constans';

import { Accordion, AccordionProps } from './Accordion';

jest.mock('@/shared/hooks', () => ({
	useScreenSize: jest.fn(),
}));

const useScreenSizeMock = useScreenSize as jest.Mock;

const render = (props: Partial<AccordionProps> = {}) => {
	renderComponent(
		<Accordion title="Заголовок" {...props}>
			Описание
		</Accordion>,
	);
};

describe('Accordion', () => {
	describe('Rendering', () => {
		beforeEach(() => {
			useScreenSizeMock.mockReturnValue({
				isMobileS: false,
			});
		});

		test('should correctly display the passed Title prop', () => {
			render();
			const title = screen.getByTestId(ACCORDION_TEST_IDS.TITLE);
			expect(title).toHaveTextContent('Заголовок');
		});

		test('should correctly display the passed children', () => {
			render();
			const content = screen.getByTestId(ACCORDION_TEST_IDS.CONTENT);
			expect(content).toHaveTextContent('Описание');
		});

		test('must not contain the "accordion-opened" class ', () => {
			render();
			expect(screen.getByTestId(ACCORDION_TEST_IDS.ACCORDION)).not.toHaveClass('accordion-opened');
			expect(screen.getByTestId(ACCORDION_TEST_IDS.HEADING)).not.toHaveClass('accordion-opened');
			expect(screen.getByTestId(ACCORDION_TEST_IDS.ICON)).not.toHaveClass('accordion-opened');
		});

		test('should correctly display the passed class', () => {
			render({ className: 'custom-class' });
			expect(screen.getByTestId(ACCORDION_TEST_IDS.ACCORDION)).toHaveClass('custom-class');
		});

		test('should display class "body5-accent" if screen size is not isMobileS', () => {
			render();
			expect(screen.getByTestId(ACCORDION_TEST_IDS.TITLE)).toHaveClass('body5-accent');
		});

		test('should display class "body3-accent" if screen size isMobileS', () => {
			useScreenSizeMock.mockReturnValue({
				isMobileS: true,
			});
			render();
			expect(screen.getByTestId(ACCORDION_TEST_IDS.TITLE)).toHaveClass('body3-accent');
		});
	});

	describe('Interactions', () => {
		test('should change class when clicking on "accordion-opened"', () => {
			render();
			fireEvent.click(screen.getByTestId(ACCORDION_TEST_IDS.BUTTON));
			expect(screen.getByTestId(ACCORDION_TEST_IDS.ACCORDION)).toHaveClass('accordion-opened');
			expect(screen.getByTestId(ACCORDION_TEST_IDS.HEADING)).toHaveClass('accordion-opened');
			expect(screen.getByTestId(ACCORDION_TEST_IDS.ICON)).toHaveClass('accordion-opened');
		});

		test('should not contain the "accordion-opened" class on re-click', () => {
			render();
			const button = screen.getByTestId(ACCORDION_TEST_IDS.BUTTON);
			fireEvent.click(button);
			fireEvent.click(button);

			expect(screen.getByTestId(ACCORDION_TEST_IDS.ACCORDION)).not.toHaveClass('accordion-opened');
			expect(screen.getByTestId(ACCORDION_TEST_IDS.HEADING)).not.toHaveClass('accordion-opened');
			expect(screen.getByTestId(ACCORDION_TEST_IDS.ICON)).not.toHaveClass('accordion-opened');
		});
	});
});
