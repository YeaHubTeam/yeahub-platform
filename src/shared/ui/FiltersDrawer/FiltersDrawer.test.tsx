import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '@/shared/libs/jest/renderComponent';

import { DrawerProps } from '../Drawer/Drawer';

import { filtersDrawerTestIds } from './constants';
import { FiltersDrawer, FiltersDrawerProps } from './FiltersDrawer';
import styles from './FiltersDrawer.module.css';
import { FiltersDrawerSkeleton } from './FiltersDrawer.skeleton';

const mockUseCurrentProject = jest.fn();
const mockUseScreenSize = jest.fn();
const mockUseModal = jest.fn();

const mockOnToggle = jest.fn();
const mockOnClose = jest.fn();

jest.mock('@/shared/libs', () => ({
	useCurrentProject: () => mockUseCurrentProject(),
	useScreenSize: () => mockUseScreenSize(),
	useModal: () => mockUseModal(),
}));

jest.mock('@/shared/ui/Drawer', () => {
	const MockDrawer = ({ children, className, rootName, isOpen }: DrawerProps) => {
		if (!isOpen) return null;
		return (
			<div role="dialog" className={className} data-root-name={rootName}>
				{children}
			</div>
		);
	};

	return {
		__esModule: true,
		default: MockDrawer,
		Drawer: MockDrawer,
	};
});

const render = (
	{ ...props }: FiltersDrawerProps,
	dataTestId: keyof typeof filtersDrawerTestIds,
) => {
	renderComponent(<FiltersDrawer {...props} />);
	const component = screen.getByTestId(filtersDrawerTestIds[dataTestId]);
	return component;
};

const renderSkeleton = () => {
	renderComponent(<FiltersDrawerSkeleton />);
	const skeleton = screen.getByTestId(filtersDrawerTestIds.filtersDrawerSkeletonChildren);
	return skeleton;
};

describe('FiltersDrawer', () => {
	beforeEach(() => {
		jest.clearAllMocks();

		mockUseCurrentProject.mockReturnValue('platform');
		mockUseScreenSize.mockReturnValue({ isMobileS: false });
		mockUseModal.mockReturnValue({
			isOpen: false,
			onToggle: mockOnToggle,
			onClose: mockOnClose,
		});
	});

	test('constants are defined', () => {
		expect(filtersDrawerTestIds).toBeDefined();
		expect(filtersDrawerTestIds.filtersDrawerChildren).toBeDefined();
		expect(filtersDrawerTestIds.filtersDrawerSkeletonChildren).toBeDefined();
	});

	test('render button and click handler', async () => {
		const button = render({ children: <div /> }, 'filtersDrawerChildren');

		expect(button).toBeInTheDocument();
		expect(button).toHaveClass(styles['filter-button']);

		await userEvent.click(button);
		expect(mockOnToggle).toHaveBeenCalledTimes(1);
	});

	test('filter icon size for platform', () => {
		mockUseCurrentProject.mockReturnValue('platform');
		const button = render({ children: <div /> }, 'filtersDrawerChildren');

		expect(button).toHaveClass('icon-button-medium');
	});

	test('filter icon size for admin', () => {
		mockUseCurrentProject.mockReturnValue('admin');
		const button = render({ children: <div /> }, 'filtersDrawerChildren');

		expect(button).toHaveClass('icon-button-large');
	});

	test('should handle hasFilters prop correctly', () => {
		const button = render({ children: <div />, hasFilters: true }, 'filtersDrawerChildren');

		expect(button).toHaveClass('icon-button-is-active');
	});

	test('drawer should be hidden when isOpen is false', () => {
		render({ children: <div data-testid="child-content">Фильтры</div> }, 'filtersDrawerChildren');
		expect(screen.queryByTestId('child-content')).not.toBeInTheDocument();
	});

	test('drawer should be visible when isOpen is true', () => {
		mockUseModal.mockReturnValue({
			isOpen: true,
			onToggle: mockOnToggle,
			onClose: mockOnClose,
		});

		render({ children: <div data-testid="child-content">Фильтры</div> }, 'filtersDrawerChildren');
		expect(screen.getByTestId('child-content')).toBeInTheDocument();
	});

	test('should render empty drawer props for admin project', () => {
		mockUseCurrentProject.mockReturnValue('admin');
		mockUseModal.mockReturnValue({
			isOpen: true,
			onToggle: mockOnToggle,
			onClose: mockOnClose,
		});

		render({ children: <div data-testid="child" /> }, 'filtersDrawerChildren');

		const drawer = screen.getByRole('dialog');

		expect(drawer).not.toHaveClass(styles.drawer);
	});

	test('should render drawer with desktop props on platform', () => {
		mockUseCurrentProject.mockReturnValue('platform');
		mockUseScreenSize.mockReturnValue({ isMobileS: false });
		mockUseModal.mockReturnValue({ isOpen: true, onToggle: mockOnToggle, onClose: mockOnClose });

		render({ children: <div data-testid="child" /> }, 'filtersDrawerChildren');

		const drawer = screen.getByRole('dialog');

		expect(drawer).toHaveClass(styles.drawer);
		expect(drawer).not.toHaveClass(styles['drawer-mobile']);
	});

	test('should render drawer with mobile props on platform', () => {
		mockUseCurrentProject.mockReturnValue('platform');
		mockUseScreenSize.mockReturnValue({ isMobileS: true });
		mockUseModal.mockReturnValue({ isOpen: true, onToggle: mockOnToggle, onClose: mockOnClose });

		render({ children: <div data-testid="child" /> }, 'filtersDrawerChildren');

		const drawer = screen.getByRole('dialog');

		expect(drawer).toHaveClass(styles.drawer);
		expect(drawer).toHaveClass(styles['drawer-mobile']);
	});
});

describe('FiltersDrawerSkeleton', () => {
	test('render skeleton', () => {
		const skeleton = renderSkeleton();

		expect(skeleton).toBeInTheDocument();
	});
});
