import { fireEvent, screen } from '@testing-library/react';
import { ComponentProps } from 'react';

import { useScreenSize } from '@/shared/libs';
import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';
import { stubTestIds } from '@/shared/ui/Stub/constants';
import { Stub } from '@/shared/ui/Stub/Stub';

jest.mock('@/shared/libs', () => ({
	useScreenSize: jest.fn(),
}));

const mockedUseScreenSize = useScreenSize as jest.Mock;

const mockScreenSize = [
	{ name: 'Desktop', isMobile: false, titleClass: 'body4' },
	{ name: 'Mobile', isMobile: true, titleClass: 'body3-strong' },
];

const mockScreen = (isMobile: boolean) => {
	mockedUseScreenSize.mockReturnValue({ isMobile });
};

const renderStub = (props: ComponentProps<typeof Stub>) => renderComponent(<Stub {...props} />);

describe('Stub Component', () => {
	describe.each(mockScreenSize)('$name layout', ({ isMobile, titleClass }) => {
		beforeEach(() => {
			jest.clearAllMocks();
			mockScreen(isMobile);
		});

		describe('Title', () => {
			test('renders custom title', () => {
				renderStub({ type: 'empty', title: 'title' });

				const title = screen.getByTestId(stubTestIds.title);

				expect(title).toHaveTextContent('title');
				expect(title).toHaveClass(titleClass);
			});

			test('renders default title', () => {
				renderStub({ type: 'empty' });

				const title = screen.getByTestId(stubTestIds.title);

				expect(title).toHaveTextContent('stub.empty.title');
				expect(title).toHaveClass(titleClass);
			});
		});

		describe('Subtitle', () => {
			test('renders custom subtitle', () => {
				renderStub({ type: 'empty', subtitle: 'subtitle' });

				const subtitle = screen.getByTestId(stubTestIds.subtitle);

				expect(subtitle).toHaveTextContent('subtitle');
				expect(subtitle).toHaveClass('body3');
			});

			test('renders default subtitle', () => {
				renderStub({ type: 'empty' });

				const subtitle = screen.getByTestId(stubTestIds.subtitle);

				expect(subtitle).toHaveTextContent('stub.empty.subtitle');
				expect(subtitle).toHaveClass('body3');
			});
		});

		test('does not render text container when title and subtitle are empty', () => {
			renderStub({ type: 'empty', title: '', subtitle: '' });

			expect(screen.queryByTestId(stubTestIds.container)).not.toBeInTheDocument();
		});

		describe('Button', () => {
			test('does not render button when buttonText is empty', () => {
				renderStub({ type: 'empty' });

				expect(screen.queryByTestId(stubTestIds.button)).not.toBeInTheDocument();
			});

			test('renders button with custom text', () => {
				renderStub({ type: 'empty', buttonText: 'button' });

				expect(screen.getByTestId(stubTestIds.button)).toHaveTextContent('button');
			});

			test('button is disabled when onClick is not provided', () => {
				renderStub({ type: 'error' });

				expect(screen.getByTestId(stubTestIds.button)).toBeDisabled();
			});

			test('button is enabled and calls onClick', () => {
				const onClick = jest.fn();

				renderStub({ type: 'error', onClick });

				const button = screen.getByTestId(stubTestIds.button);

				expect(button).not.toBeDisabled();
				fireEvent.click(button);
				expect(onClick).toHaveBeenCalledTimes(1);
			});

			test('renders outline button for filter-empty type', () => {
				renderStub({ type: 'filter-empty', onClick: jest.fn() });

				const button = screen.getByTestId(stubTestIds.button);

				expect(button).toHaveClass('button-outline');
			});
		});

		test('applies custom className', () => {
			renderStub({ type: 'empty', className: 'custom-class' });

			const wrapper = screen.getByTestId(stubTestIds.container).closest('.custom-class');

			expect(wrapper).toBeInTheDocument();
		});
	});
});
