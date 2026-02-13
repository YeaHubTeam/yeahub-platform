import { fireEvent, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';

import { useScreenSize } from '@/shared/libs';
import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';
import {
	stubTestIds,
	titleByType,
	subtitleByType,
	buttonTextByType,
} from '@/shared/ui/Stub/constants';
import { Stub } from '@/shared/ui/Stub/Stub';
import type { StubType } from '@/shared/ui/Stub/types';

jest.mock('@/shared/libs', () => ({
	useScreenSize: jest.fn(),
}));

const mockedUseScreenSize = useScreenSize as jest.Mock;
const renderStub = (props: ComponentProps<typeof Stub>) => renderComponent(<Stub {...props} />);

describe('Stub Component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockedUseScreenSize.mockReturnValue({ isMobile: false });
	});

	const stubTypes: StubType[] = [
		'empty',
		'filter-empty',
		'error',
		'access-denied',
		'access-denied-verify',
		'access-denied-subscription',
	];

	describe.each(stubTypes)('StubType: %s', (type) => {
		describe('Title', () => {
			test('renders default title', () => {
				renderStub({ type });

				const title = screen.getByTestId(stubTestIds.title);
				expect(title).toHaveTextContent(titleByType[type]);
				expect(title).toHaveClass('body4');
			});

			test('renders custom title', () => {
				renderStub({ type, title: 'custom title' });

				const title = screen.getByTestId(stubTestIds.title);
				expect(title).toHaveTextContent('custom title');
				expect(title).toHaveClass('body4');
			});

			test('uses mobile variant when isMobile is true', () => {
				mockedUseScreenSize.mockReturnValue({ isMobile: true });
				renderStub({ type, title: 'custom title' });

				const title = screen.getByTestId(stubTestIds.title);
				expect(title).toHaveClass('body3-strong');
			});
		});

		describe('Subtitle', () => {
			test('renders default subtitle', () => {
				renderStub({ type });

				const subtitle = screen.getByTestId(stubTestIds.subtitle);
				expect(subtitle).toHaveTextContent(subtitleByType[type]);
				expect(subtitle).toHaveClass('body3');
			});

			test('renders custom subtitle', () => {
				renderStub({ type, subtitle: 'custom subtitle' });

				const subtitle = screen.getByTestId(stubTestIds.subtitle);
				expect(subtitle).toHaveTextContent('custom subtitle');
				expect(subtitle).toHaveClass('body3');
			});
		});

		test('does not render text container when title and subtitle are empty', () => {
			renderStub({ type, title: '', subtitle: '' });
			expect(screen.queryByTestId(stubTestIds.container)).not.toBeInTheDocument();
		});

		describe('Button', () => {
			test('renders button correctly or not if empty', () => {
				renderStub({ type });

				const buttonText = buttonTextByType[type];
				if (buttonText) {
					const button = screen.getByTestId(stubTestIds.button);
					expect(button).toHaveTextContent(buttonText);
				} else {
					expect(screen.queryByTestId(stubTestIds.button)).not.toBeInTheDocument();
				}
			});

			test('renders custom button text', () => {
				renderStub({ type, buttonText: 'custom button' });
				const button = screen.getByTestId(stubTestIds.button);
				expect(button).toHaveTextContent('custom button');
			});

			test('button is disabled when onClick is not provided', () => {
				renderStub({ type });
				const buttonText = buttonTextByType[type];
				if (buttonText) {
					const button = screen.getByTestId(stubTestIds.button);
					expect(button).toBeDisabled();
				}
			});

			test('button calls onClick when provided', () => {
				const onClick = jest.fn();
				renderStub({ type, onClick });

				const buttonText = buttonTextByType[type];
				if (buttonText) {
					const button = screen.getByTestId(stubTestIds.button);
					fireEvent.click(button);
					expect(onClick).toHaveBeenCalledTimes(1);
				}
			});

			test('renders outline variant for filter-empty', () => {
				renderStub({ type, onClick: jest.fn() });
				if (type === 'filter-empty') {
					const button = screen.getByTestId(stubTestIds.button);
					expect(button).toHaveClass('button-outline');
				}
			});
		});

		test('applies custom className', () => {
			renderStub({ type, className: 'custom-class' });
			const wrapper = screen.getByTestId(stubTestIds.container)?.closest('.custom-class');
			const buttonText = buttonTextByType[type];
			if (screen.queryByTestId(stubTestIds.container) || buttonText) {
				expect(wrapper).toBeInTheDocument();
			}
		});
	});
});
