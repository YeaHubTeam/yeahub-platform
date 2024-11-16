import { fireEvent, screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { BaseFilterSection } from './BaseFilterSection';

const mockData = [
	{ id: 1, title: 'Item 1', imageSrc: 'image1.png', active: true },
	{ id: 2, title: 'Item 2', imageSrc: null, active: false },
];

const mockOnClick = jest.fn();
const mockGetDefaultIcon = jest.fn((_item) => <span>Default Icon</span>);

describe('BaseFilterSection', () => {
	test('should render component with title', () => {
		renderComponent(
			<BaseFilterSection
				title="Test Title"
				data={mockData}
				onClick={mockOnClick}
				getDefaultIcon={mockGetDefaultIcon}
			/>,
		);
		expect(screen.getByText('Test Title')).toBeInTheDocument();
	});

	test('should render list of items', () => {
		renderComponent(
			<BaseFilterSection
				title="Test Title"
				data={mockData}
				onClick={mockOnClick}
				getDefaultIcon={mockGetDefaultIcon}
			/>,
			с,
		);
		expect(screen.getAllByRole('button')).toHaveLength(mockData.length);
	});

	test('should call onClick with item id when clicked', () => {
		renderComponent(
			<BaseFilterSection
				title="Test Title"
				data={mockData}
				onClick={mockOnClick}
				getDefaultIcon={mockGetDefaultIcon}
			/>,
		);
		const buttons = screen.getAllByRole('button');
		fireEvent.click(buttons[0]);
		expect(mockOnClick).toHaveBeenCalledWith(1);
	});

	test('should render image or default icon', () => {
		renderComponent(
			<BaseFilterSection
				title="Test Title"
				data={mockData}
				onClick={mockOnClick}
				getDefaultIcon={mockGetDefaultIcon}
			/>,
		);
		expect(screen.getByAltText('Item 1')).toBeInTheDocument();
		expect(screen.getByText('Default Icon')).toBeInTheDocument();
	});
});
