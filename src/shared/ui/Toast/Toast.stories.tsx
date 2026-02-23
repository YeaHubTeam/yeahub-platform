import type { Meta, StoryObj } from '@storybook/react';
import { Toaster } from 'react-hot-toast';

import { Toast, toast } from './Toast';
import { ToastVariant } from './types';

const meta: Meta<typeof Toast> = {
	title: 'shared/Toast',
	component: Toast,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Компонент Toast для отображения уведомлений (success, warning, error). Использует react-hot-toast для тостинга. Варианты: success (зелёный), warning (жёлтый), error (красный). Пропсы: currentToast (ToastType от react-hot-toast), message (строка или JSX), variant (ToastVariant).',
			},
		},
	},
	argTypes: {
		currentToast: {
			description:
				'Объект Toast от react-hot-toast (автоматически генерируется при вызове toast.<variant>).',
			control: 'object',
		},
		message: {
			description: 'Сообщение для тоста (строка или JSX-элемент).',
			control: 'text',
		},
		variant: {
			description: 'Вариант тоста: success, warning или error.',
			control: 'select',
			options: ['success', 'warning', 'error'],
		},
	},
} satisfies Meta<typeof Toast>;

export const Default: Story = {
	args: {
		variant: 'success' as ToastVariant,
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
	args: {
		variant: 'success' as ToastVariant,
		message: 'Это сообщение об успехе!',
	},
	render: (args) => {
		const showToast = () => toast.success(args.message as string);
		return (
			<>
				<Toaster />
				<button onClick={showToast}>Показать success toast</button>
			</>
		);
	},
};

export const Warning: Story = {
	args: {
		variant: 'warning' as ToastVariant,
		message: 'Это предупреждение!',
	},
	render: (args) => {
		const showToast = () => toast.warning(args.message as string);
		return (
			<>
				<Toaster />
				<button onClick={showToast}>Показать warning toast</button>
			</>
		);
	},
};

export const Error: Story = {
	args: {
		variant: 'error' as ToastVariant,
		message: 'Это сообщение об ошибке!',
	},
	render: (args) => {
		const showToast = () => toast.error(args.message as string);
		return (
			<>
				<Toaster />
				<button onClick={showToast}>Показать error toast</button>
			</>
		);
	},
};
