import { fireEvent, screen } from '@testing-library/react';
import { useState } from 'react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { Drawer, DrawerProps } from './Drawer';

const DrawerWrapper = ({
	isOpen = true,
	position = 'right',
	rootName = 'mainLayout',
	hasCloseButton = false,
}: Partial<DrawerProps>) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(isOpen);

	return (
		<Drawer
			isOpen={isDrawerOpen}
			onClose={() => setIsDrawerOpen(false)}
			rootName={rootName}
			hasCloseButton={hasCloseButton}
			position={position}
		>
			<div>Drawer children</div>
		</Drawer>
	);
};

describe('Drawer in the body tag', () => {
	test('should render if isOpen=true', () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="body" />);

		const drawerContainer = screen.getByTestId('drawer-container');
		expect(drawerContainer).toBeInTheDocument();
	});

	test('should render has class drawer-container if isOpen=true', () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="body" />);

		const drawerContainer = screen.getByTestId('drawer-container');
		expect(drawerContainer).toHaveClass('drawer-container');
	});

	test('should render not in the <main/>', () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="body" />);

		const drawerContainer = screen.getByTestId('drawer-container');
		const main = document.querySelector('main');

		expect(main?.contains(drawerContainer)).not.toBe(true);
		expect(drawerContainer).toBeInTheDocument();
	});

	test('should render with children and check it by text if isOpen=true', async () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="body" />);

		const children = screen.getByText('Drawer children');
		expect(children).toBeInTheDocument();
	});

	test("shouldn't render if isOpen=false", () => {
		renderComponent(<DrawerWrapper isOpen={false} rootName="body" />);

		const drawerContainer = screen.queryByTestId('drawer-container');
		expect(drawerContainer).not.toBeInTheDocument();
	});

	test('should close after click to the backdrop', async () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="body" />);

		const drawerContainer = screen.getByTestId('drawer-container');
		expect(drawerContainer).toBeInTheDocument();

		const closeBackdrop = screen.getByTestId('close-backdrop');
		expect(closeBackdrop).toBeInTheDocument();

		fireEvent.click(closeBackdrop);

		expect(drawerContainer).not.toBeInTheDocument();
	});

	test('should close after ESC key down on the backdrop', async () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="body" />);

		const drawerContainer = screen.getByTestId('drawer-container');
		expect(drawerContainer).toBeInTheDocument();

		const closeBackdrop = screen.getByTestId('close-backdrop');
		expect(closeBackdrop).toBeInTheDocument();

		fireEvent.keyDown(closeBackdrop, {
			key: 'Escape',
			code: 'Escape',
			keyCode: 27,
			charCode: 27,
		});

		expect(drawerContainer).not.toBeInTheDocument();
	});

	test('should have position=right', () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="body" />);

		const drawer = screen.getByTestId('drawer');
		expect(drawer).toHaveClass('right');
	});

	test('should have position=left', () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="body" position="left" />);

		const drawer = screen.getByTestId('drawer');
		expect(drawer).toHaveClass('left');
	});

	test('should have position=bottom', () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="body" position="bottom" />);

		const drawer = screen.getByTestId('drawer');
		expect(drawer).toHaveClass('bottom');
	});

	test('should have hasCloseButton=true', () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="body" hasCloseButton={true} />);

		const drawer = screen.queryByTestId('drawer-header');
		expect(drawer).toBeInTheDocument();
	});

	test('should not show icon if hasCloseButton=false', () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="body" hasCloseButton={false} />);

		const drawer = screen.queryByTestId('drawer-header');
		expect(drawer).not.toBeInTheDocument();
	});

	test('should not has style overflow:hidden', () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="body" hasCloseButton={false} />);

		const body = document.querySelector('body');

		const closeBackdrop = screen.getByTestId('close-backdrop');
		expect(closeBackdrop).toBeInTheDocument();

		fireEvent.click(closeBackdrop);

		expect(body).not.toHaveStyle('overflow: hidden');
		screen.debug();
	});

	test('should has style overflow:hidden', () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="body" hasCloseButton={false} />);

		const body = document.querySelector('body');

		expect(body).toHaveStyle('overflow: hidden');
	});
});

describe('Drawer in the main tag', () => {
	beforeEach(() => {
		const main = document.createElement('main');
		document.body.appendChild(main);
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	test('should render', async () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="mainLayout" />);

		const drawerContainer = screen.getByTestId('drawer-container');
		expect(drawerContainer).toBeInTheDocument();

		const main = document.querySelector('main');
		expect(main?.contains(drawerContainer)).toBe(true);
	});

	test('should close after click to the backdrop', async () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="mainLayout" />);

		const drawerContainer = screen.getByTestId('drawer-container');
		expect(drawerContainer).toBeInTheDocument();

		const main = document.querySelector('main');
		expect(main?.contains(drawerContainer)).toBe(true);

		const closeBackdrop = screen.getByTestId('close-backdrop');
		expect(closeBackdrop).toBeInTheDocument();
		fireEvent.click(closeBackdrop);

		expect(drawerContainer).not.toBeInTheDocument();
	});

	test('should has absolute class on the drawer', async () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="mainLayout" />);

		const drawer = screen.getByTestId('drawer');
		expect(drawer).toBeInTheDocument();

		const main = document.querySelector('main');
		expect(main?.contains(drawer)).toBe(true);

		expect(drawer).toHaveClass('absolute');
	});

	test('should close after ESC key down on the backdrop', async () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="mainLayout" />);

		const drawerContainer = screen.getByTestId('drawer-container');
		expect(drawerContainer).toBeInTheDocument();

		const closeBackdrop = screen.getByTestId('close-backdrop');
		expect(closeBackdrop).toBeInTheDocument();

		fireEvent.keyDown(closeBackdrop, {
			key: 'Escape',
			code: 'Escape',
			keyCode: 27,
			charCode: 27,
		});

		expect(drawerContainer).not.toBeInTheDocument();
	});

	test('should not show icon if hasCloseButton=false', () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="mainLayout" hasCloseButton={false} />);

		const drawer = screen.queryByTestId('drawer-header');
		expect(drawer).not.toBeInTheDocument();
	});

	test('should drawer has right class position=right', () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="mainLayout" />);

		const drawer = screen.getByTestId('drawer');
		expect(drawer).toHaveClass('right');
	});

	test('should drawer has left class position=left', () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="mainLayout" position="left" />);

		const drawer = screen.getByTestId('drawer');
		expect(drawer).toHaveClass('left');
	});

	test('should drawer has bottom class position=bottom', () => {
		renderComponent(<DrawerWrapper isOpen={true} rootName="mainLayout" position="bottom" />);

		const drawer = screen.getByTestId('drawer');
		expect(drawer).toHaveClass('bottom');
	});
});
