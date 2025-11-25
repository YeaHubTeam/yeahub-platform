import { fireEvent, screen } from '@testing-library/react';

import { useScreenSize } from '@/shared/hooks';
import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { accordionTestIds } from '../model/constants';

import { Accordion, AccordionProps } from './Accordion';
import { AccordionSkeleton } from './Accordion.skeleton';

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

const renderSkeleton = () => {
	renderComponent(<AccordionSkeleton />);
};

describe('Accordion', () => {
	beforeEach(() => {
		useScreenSizeMock.mockReturnValue({
			isMobileS: false,
		});
	});

	describe('root element', () => {
		test('should render accordion in closed state by default', () => {
			render();
			const accordion = screen.getByTestId(accordionTestIds.accordion);
			expect(accordion).toHaveClass('accordion');
			expect(accordion).not.toHaveClass('accordion-opened');
		});
		test('should apply passed className', () => {
			render({ className: 'custom-class' });
			expect(screen.getByTestId(accordionTestIds.accordion)).toHaveClass('custom-class');
		});
	});

	test('should render heading in closed state', () => {
		render();
		const heading = screen.getByTestId(accordionTestIds.heading);
		expect(heading).toHaveClass('heading');
		expect(heading).not.toHaveClass('accordion-opened');
	});

	describe('title', () => {
		test('should render passed title prop', () => {
			render();
			const title = screen.getByTestId(accordionTestIds.title);
			expect(title).toHaveTextContent('Заголовок');
		});

		test('should use body5-accent variant, if screen size is not isMobileS', () => {
			render();
			expect(screen.getByTestId(accordionTestIds.title)).toHaveClass('body5-accent');
		});

		test('should use body3-accent variant, if screen size isMobileS', () => {
			useScreenSizeMock.mockReturnValue({
				isMobileS: true,
			});
			render();
			expect(screen.getByTestId(accordionTestIds.title)).toHaveClass('body3-accent');
		});
	});

	test('should render icon in closed state', () => {
		render();
		const icon = screen.getByTestId(accordionTestIds.icon);
		expect(icon).toHaveClass('icon');
		expect(icon).not.toHaveClass('accordion-opened');
		expect(icon).toHaveAttribute('width', '24');
		expect(icon).toHaveAttribute('height', '24');
		expect(icon).toHaveAttribute('color', expect.stringContaining('purple-700'));
	});

	test('should display content wrapper correctly', () => {
		render();
		const contentWrapper = screen.getByTestId(accordionTestIds.contentWrapper);
		expect(contentWrapper.scrollHeight).toBe(0);
	});

	describe('content', () => {
		test('should correctly display the passed children', () => {
			render();
			const content = screen.getByTestId(accordionTestIds.content);
			expect(content).toHaveTextContent('Описание');
		});
	});

	test('should add accordion-opened class to all elements when opened', () => {
		render();
		fireEvent.click(screen.getByTestId(accordionTestIds.button));
		expect(screen.getByTestId(accordionTestIds.accordion)).toHaveClass('accordion-opened');
		expect(screen.getByTestId(accordionTestIds.heading)).toHaveClass('accordion-opened');
		expect(screen.getByTestId(accordionTestIds.icon)).toHaveClass('accordion-opened');
	});

	test('should set content wrapper scrollHeight to match content scrollHeight on open', () => {
		render();
		const button = screen.getByTestId(accordionTestIds.button);
		const content = screen.getByTestId(accordionTestIds.content);
		const contentWrapper = screen.getByTestId(accordionTestIds.contentWrapper);
		fireEvent.click(button);

		expect(contentWrapper.scrollHeight).toBe(content.scrollHeight);
	});

	test('should remove "accordion-opened" class when toggled twice', () => {
		render();
		const button = screen.getByTestId(accordionTestIds.button);
		fireEvent.click(button);
		fireEvent.click(button);

		expect(screen.getByTestId(accordionTestIds.accordion)).not.toHaveClass('accordion-opened');
		expect(screen.getByTestId(accordionTestIds.heading)).not.toHaveClass('accordion-opened');
		expect(screen.getByTestId(accordionTestIds.icon)).not.toHaveClass('accordion-opened');
	});
});

describe('AccordionSkeleton', () => {
	test('renders skeleton structure with correct classes', () => {
		useScreenSizeMock.mockReturnValue({
			isMobileS: false,
		});
		renderSkeleton();
		expect(screen.getByTestId(accordionTestIds.accordion)).toHaveClass('accordion');
		expect(screen.getByTestId(accordionTestIds.heading)).toHaveClass('heading');
		expect(screen.getByTestId(accordionTestIds.button)).toHaveClass('button');
		expect(screen.getByTestId(accordionTestIds.title)).toHaveClass('title');
		expect(screen.getByTestId(accordionTestIds.title)).toHaveClass('skeleton');
		expect(screen.getByTestId(accordionTestIds.icon)).toHaveClass('icon');
		expect(screen.getByTestId(accordionTestIds.title)).toHaveStyle({ height: '24px' });
	});

	test('applies body5-accent height when screen size is not MobileS', () => {
		useScreenSizeMock.mockReturnValue({ isMobileS: false });
		renderSkeleton();
		const titleSkeleton = screen.getByTestId(accordionTestIds.title);
		expect(titleSkeleton).toHaveStyle({ height: '24px' });
	});

	test('applies body2-accent height when screen size isMobileS', () => {
		useScreenSizeMock.mockReturnValue({ isMobileS: true });
		renderSkeleton();
		const titleSkeleton = screen.getByTestId(accordionTestIds.title);
		expect(titleSkeleton).toHaveStyle({ height: '16.8px' });
	});
});
