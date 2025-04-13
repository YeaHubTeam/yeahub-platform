import { fireEvent, screen } from '@testing-library/react';
import { useState } from 'react';

import { getKeyboardFireEventObject } from '@/shared/libs/jest/getKeyboardFireEventObject';
import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { Drawer, DrawerProps } from './Drawer';

const DrawerWrapper = ({
	isOpen = true,
	position,
	rootName,
	hasCloseButton,
}: Partial<DrawerProps>) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(isOpen);

	return (
		<Drawer
			isOpen={isDrawerOpen}
			onClose={() => setIsDrawerOpen(false)}
			rootName={rootName}
			position={position}
			hasCloseButton={hasCloseButton}
		>
			<div>Drawer children</div>
		</Drawer>
	);
};

const defaultProps: Partial<DrawerProps> = {
	isOpen: true,
	position: 'right',
	rootName: 'body',
	hasCloseButton: false,
};

const renderDrawer = (props: Partial<DrawerProps> = defaultProps) => {
	const mergedProps = { ...defaultProps, ...props };
	return renderComponent(<DrawerWrapper {...mergedProps} />);
};

describe('Drawer component with default props', () => {
	beforeEach(() => {
		renderDrawer();
	});

	test('should render has class drawer-container if isOpen=true', () => {
		const drawerContainer = screen.getByTestId('drawer-container');
		expect(drawerContainer).toHaveClass('drawer-container');
	});

	test('should render not in the <main/>', () => {
		const drawerContainer = screen.getByTestId('drawer-container');
		const main = document.querySelector('main');
		expect(main?.contains(drawerContainer)).not.toBe(true);
		expect(drawerContainer).toBeInTheDocument();
	});

	test('should close after click to the backdrop', () => {
		const drawerContainer = screen.getByTestId('drawer-container');
		expect(drawerContainer).toBeInTheDocument();
		const closeBackdrop = screen.getByTestId('close-backdrop');
		expect(closeBackdrop).toBeInTheDocument();
		fireEvent.click(closeBackdrop);
		expect(drawerContainer).not.toBeInTheDocument();
	});

	test('should render with children and check it by text if isOpen=true', () => {
		const children = screen.getByText('Drawer children');
		expect(children).toBeInTheDocument();
	});

	test('should close after ESC key down on the backdrop', () => {
		const drawerContainer = screen.getByTestId('drawer-container');
		expect(drawerContainer).toBeInTheDocument();
		const closeBackdrop = screen.getByTestId('close-backdrop');
		expect(closeBackdrop).toBeInTheDocument();
		fireEvent.keyDown(closeBackdrop, getKeyboardFireEventObject('Escape', 27));
		expect(drawerContainer).not.toBeInTheDocument();
	});

	test('should have position=right', () => {
		const drawer = screen.getByTestId('drawer');
		expect(drawer).toHaveClass('right');
	});

	test('should not show icon if hasCloseButton=false', () => {
		const drawer = screen.queryByTestId('drawer-header');
		expect(drawer).not.toBeInTheDocument();
	});

	test('should not has style overflow:hidden', () => {
		const closeBackdrop = screen.getByTestId('close-backdrop');
		expect(closeBackdrop).toBeInTheDocument();
		fireEvent.click(closeBackdrop);
		const body = document.querySelector('body');
		expect(body).not.toHaveStyle('overflow: hidden');
	});

	test('should has style overflow:hidden', () => {
		const body = document.querySelector('body');
		expect(body).toHaveStyle('overflow: hidden');
	});
});

describe('Drawer component without default props', () => {
	test("shouldn't render if isOpen=false", () => {
		renderDrawer({ isOpen: false });

		const drawerContainer = screen.queryByTestId('drawer-container');
		expect(drawerContainer).not.toBeInTheDocument();
	});

	test('should has position=left', () => {
		renderDrawer({ position: 'left' });
		const drawer = screen.getByTestId('drawer');
		expect(drawer).toHaveClass('left');
	});

	test('should has position=bottom', () => {
		renderDrawer({ position: 'bottom' });
		const drawer = screen.getByTestId('drawer');
		expect(drawer).toHaveClass('bottom');
	});

	test('should have hasCloseButton=true', () => {
		renderDrawer({ hasCloseButton: true });
		const drawer = screen.queryByTestId('drawer-header');
		expect(drawer).toBeInTheDocument();
	});

	test('should render Drawer in the main tag with default props', () => {
		const main = document.createElement('main');
		document.body.appendChild(main);

		renderComponent(<DrawerWrapper />);

		const drawerContainer = screen.getByTestId('drawer-container');
		expect(drawerContainer).toBeInTheDocument();

		const drawer = screen.getByTestId('drawer');

		expect(drawer).toHaveClass('right');
		expect(drawer).toHaveClass('absolute');

		const mainElement = document.querySelector('main');
		expect(mainElement?.contains(drawerContainer)).toBe(true);
	});
});
