import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import t from 'react-hot-toast';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { toast } from './Toast';
import { ToastVariant } from './types';

jest.mock('react-hot-toast', () => ({
	__esModule: true,
	default: { custom: jest.fn(), dismiss: jest.fn() },
}));

const custom = t.custom as jest.Mock;
const dismiss = t.dismiss as jest.Mock;

const callAndRender = (variant: ToastVariant, visible: boolean) => {
	const ct = { id: `${variant}`, visible };
	toast[variant](`It is ${variant} toast`);
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
		'render %s toast with correct text and style',
		(variant) => {
			callAndRender(variant, true);
			expect(custom).toHaveBeenCalledTimes(1);
			expect(screen.getByTestId('Toast_Root')).toBeInTheDocument();
			expect(screen.getByText(`It is ${variant} toast`)).toBeInTheDocument();
			expect(document.querySelector(`.${variant}`)).not.toBeNull();
		},
	);

	test('CloseBtn click calls dismiss with toastId', async () => {
		callAndRender('success', true);
		await user.click(screen.getByTestId('Toast_CloseBtn'));
		expect(dismiss).toHaveBeenCalledWith(`success`);
	});

	test('added fade-in and fade-out class', () => {
		const rendered = callAndRender('success', true);
		expect(document.querySelector('.fade-in')).not.toBeNull();
		rendered.unmount();
		callAndRender('success', false);
		expect(document.querySelector('.fade-out')).not.toBeNull();
	});
});
