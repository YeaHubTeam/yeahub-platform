import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useScreenSize } from '@/shared/libs';

import { Banner } from './Banner';
import { BannerSkeleton } from './Banner.skeleton';

jest.mock('@/shared/libs', () => ({
	useScreenSize: jest.fn(),
}));

const mockedUseScreenSize = useScreenSize as jest.Mock;

describe('Banner', () => {
	beforeEach(() => {
		mockedUseScreenSize.mockReturnValue({
			isLargeScreen: false,
			isLaptop: false,
		});
	});

	test('renders an image with the required src and alt', () => {
		render(<Banner img="/img.png" alt="banner" />);

		const img = screen.getByAltText('banner');
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute('src', '/img.png');
	});

	test('uses empty alt when alt is not provided', () => {
		render(<Banner img="/img.png" />);

		const img = screen.getByRole('img');
		expect(img).toHaveAttribute('alt', '');
	});

	test('renders the title and description with the correct text color', () => {
		render(<Banner img="/img.png" title="Title" description="Description" color="white" />);

		expect(screen.getByText('Title')).toBeInTheDocument();
		expect(screen.getByText('Description')).toBeInTheDocument();

		expect(screen.getByText('Title')).toHaveClass('text-black-900');
	});

	test('uses titleVariant if passed', () => {
		render(<Banner img="/img.png" title="Title" titleVariant="body1" />);

		const title = screen.getByText('Title');

		expect(title).toBeInTheDocument();
		expect(title).toHaveClass('body1');
	});

	test('selects a variant by useScreenSize if titleVariant is not passed', () => {
		mockedUseScreenSize.mockReturnValue({
			isLargeScreen: true,
			isLaptop: false,
		});

		render(<Banner img="/img.png" title="title" />);

		const title = screen.getByText('title');
		expect(title).toBeInTheDocument();
		expect(title).toHaveClass('body6');
	});

	test('selects body6 variant when isLaptop is true and titleVariant not passed', () => {
		mockedUseScreenSize.mockReturnValue({
			isLargeScreen: false,
			isLaptop: true,
		});

		render(<Banner img="/img.png" title="Laptop title" />);

		const title = screen.getByText('Laptop title');
		expect(title).toBeInTheDocument();
		expect(title).toHaveClass('body6');
	});

	test('selects body5-accent when neither isLargeScreen nor isLaptop', () => {
		mockedUseScreenSize.mockReturnValue({
			isLargeScreen: false,
			isLaptop: false,
		});

		render(<Banner img="/img.png" title="Mobile title" />);

		const title = screen.getByText('Mobile title');
		expect(title).toBeInTheDocument();
		expect(title).toHaveClass('body5-accent');
	});

	test('Does not render title and description if there are no props', () => {
		render(<Banner img="/img.png" />);

		expect(screen.queryByText('Title')).toBeNull();
		expect(screen.queryByText('Description')).toBeNull();
	});

	test('renders the button and calls onButtonClick when clicked', async () => {
		const onButtonClick = jest.fn();
		const user = userEvent.setup();

		render(<Banner img="/img.png" buttonLabel="Click me" onButtonClick={onButtonClick} />);

		const button = screen.getByRole('button', { name: 'Click me' });
		expect(button).toBeInTheDocument();

		await user.click(button);

		expect(onButtonClick).toHaveBeenCalledTimes(1);
	});

	test('does not render the button if buttonLabel is not passed', () => {
		render(<Banner img="/img.png" />);

		expect(screen.queryByRole('button', { name: /.+/ })).toBeNull();
	});

	test('Applies the alarm class to the image if className="alarm"', () => {
		render(<Banner img="/img.png" className="alarm" />);

		const img = screen.getByRole('img');
		expect(img).toHaveClass('alarm-img');
	});

	test('applies additional classes to wrappers and buttons', () => {
		render(
			<Banner
				img="/img.png"
				innerWrapClassName="inner-wrap"
				buttonLabel="Button"
				buttonClassName="btn-class"
			/>,
		);

		const inner = screen.getByText('Button').previousSibling;
		expect(inner).toHaveClass('inner-wrap');

		const button = screen.getByRole('button', { name: 'Button' });
		expect(button).toHaveClass('btn-class');
	});

	test('uses violet background and white text when color is violet', () => {
		render(<Banner img="/img.png" title="Title" color="violet" />);

		const wrapper = screen.getAllByTestId('Flex')[0];
		const title = screen.getByText('Title');

		expect(title).toHaveClass('text-white-900');
		expect(wrapper).toHaveClass('violet');
	});

	test('renders wrapper with default white background when color not provided', () => {
		render(<Banner img="/img.png" title="Default color" />);

		const wrapper = screen.getAllByTestId('Flex')[0];
		expect(wrapper).toHaveClass('white');
	});
});

describe('BannerSkeleton', () => {
	test('renders BannerSkeleton on page', () => {
		render(<BannerSkeleton />);

		const skeleton = screen.getAllByTestId('Flex')[0];
		expect(skeleton).toBeInTheDocument();
	});
});
