import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import t from 'react-hot-toast';

import { renderComponent } from '@/shared/libs/jest';
import { IconName } from '@/shared/ui/Icon';
import { toastColor, toastIcon, toastTestIds, toastTitle } from '@/shared/ui/Toast/constants';

import { toast } from './Toast';
import { ToastVariant } from './types';

jest.mock('react-hot-toast', () => ({
	__esModule: true,
	default: { custom: jest.fn(), dismiss: jest.fn() },
}));

jest.mock('@/shared/ui/Icon', () => ({
	Icon: ({ icon, color }: { icon: IconName; color: string }) => (
		<svg data-testid="Toast_Icon" data-icon={icon} data-color={color} />
	),
}));

const custom = t.custom as jest.Mock;
const dismiss = t.dismiss as jest.Mock;

const callAndRender = (
	variant: ToastVariant,
	message: JSX.Element | string | null,
	visible: boolean,
) => {
	const ct = { id: `${variant}`, visible };
	toast[variant](message);
	const renderFn = custom.mock.calls[0][0] as (ct: {
		id: string;
		visible: boolean;
	}) => React.ReactElement;
	return renderComponent(renderFn(ct));
};

describe('Toast component', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test.each<ToastVariant>(['error', 'success', 'warning'])(
		'render %s toast with message and root classes; Icon and Text props depending on variant',
		(variant) => {
			const message = `It is ${variant} toast`;
			callAndRender(variant, message, true);

			expect(custom).toHaveBeenCalledTimes(1);

			expect(screen.getByTestId(toastTestIds.toastRoot)).toBeInTheDocument();
			expect(screen.getByTestId(toastTestIds.toastIcon)).toBeInTheDocument();
			expect(screen.getByTestId(toastTestIds.toastText)).toBeInTheDocument();
			expect(screen.getByTestId(toastTestIds.toastCloseBtn)).toBeInTheDocument();

			const root = screen.getByTestId(toastTestIds.toastRoot);
			expect(root).toHaveTextContent(message);
			expect(root).toHaveClass('toaster', variant);

			const icon = screen.getByTestId(toastTestIds.toastIcon);
			expect(icon).toHaveAttribute('data-icon', toastIcon[variant]);
			expect(icon).toHaveAttribute('data-color', toastColor[variant]);

			const text = screen.getByTestId(toastTestIds.toastText);
			expect(text).toHaveTextContent(toastTitle[variant]);
			expect(text).toHaveStyle({ color: toastColor[variant] });
		},
	);

	test('render message as string', () => {
		const messageText = 'Text message';
		callAndRender('success', messageText, true);
		expect(screen.getByTestId(toastTestIds.toastRoot)).toHaveTextContent(messageText);
	});

	test('render message as JSX ', () => {
		const messageJSX = <span data-testid={toastTestIds.toastMessage}>jsx</span>;
		callAndRender('success', messageJSX, true);
		expect(screen.getByTestId(toastTestIds.toastMessage)).toBeInTheDocument();
	});

	test('should not render message when null', () => {
		callAndRender('success', null, true);
		expect(screen.queryByTestId(toastTestIds.toastMessage)).toBeNull();
		expect(screen.getByTestId(toastTestIds.toastRoot)).not.toHaveTextContent('any text');
	});

	test('CloseBtn click calls dismiss with toastId', async () => {
		callAndRender('success', null, true);
		await user.click(screen.getByTestId(toastTestIds.toastCloseBtn));
		expect(dismiss).toHaveBeenCalledWith(`success`);
	});

	test('added fade-in and fade-out class', () => {
		const rendered = callAndRender('success', null, true);
		expect(screen.getByTestId(toastTestIds.toastRoot)).toHaveClass('fade-in');
		rendered.unmount();
		callAndRender('success', null, false);
		expect(screen.getByTestId(toastTestIds.toastRoot)).toHaveClass('fade-out');
	});
});
