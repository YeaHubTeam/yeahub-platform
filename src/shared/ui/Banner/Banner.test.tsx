import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useScreenSize } from '@/shared/libs';

import { Banner } from './Banner';
import { BannerSkeleton } from './Banner.skeleton';
import { bannerTestIds } from './constants';

jest.mock('@/shared/libs', () => ({
	useScreenSize: jest.fn(),
}));

const mockedUseScreenSize = useScreenSize as jest.Mock;

beforeEach(() => {
	mockedUseScreenSize.mockReturnValue({
		isLargeScreen: false,
		isLaptop: false,
	});
});

describe('Banner image', () => {
	test('renders an image with the required src and alt', () => {
		render(<Banner img="/img.png" alt="banner" />);

		const img = screen.getByTestId(bannerTestIds.image);
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute('src', '/img.png');
		expect(img).toHaveAttribute('alt', 'banner');
	});

	test('uses empty alt when alt is not provided', () => {
		render(<Banner img="/img.png" />);

		const img = screen.getByTestId(bannerTestIds.image);
		expect(img).toHaveAttribute('alt', '');
	});
});

describe('Banner', () => {
	test('renders the title and description with the correct text color', () => {
		render(<Banner img="/img.png" title="Title" description="Description" color="white" />);

		const title = screen.getByTestId(bannerTestIds.title);
		const description = screen.getByTestId(bannerTestIds.description);

		expect(title).toBeInTheDocument();
		expect(description).toBeInTheDocument();
		expect(title).toHaveClass('text-black-900');
	});

	test('uses titleVariant if passed', () => {
		render(<Banner img="/img.png" title="Title" titleVariant="body1" />);

		const title = screen.getByTestId(bannerTestIds.title);

		expect(title).toBeInTheDocument();
		expect(title).toHaveClass('body1');
	});

	test('selects a variant by useScreenSize if titleVariant is not passed', () => {
		mockedUseScreenSize.mockReturnValue({
			isLargeScreen: true,
			isLaptop: false,
		});

		render(<Banner img="/img.png" title="title" />);

		const title = screen.getByTestId(bannerTestIds.title);
		expect(title).toBeInTheDocument();
		expect(title).toHaveClass('body6');
	});

	test('selects body6 variant when isLaptop is true and titleVariant not passed', () => {
		mockedUseScreenSize.mockReturnValue({
			isLargeScreen: false,
			isLaptop: true,
		});

		render(<Banner img="/img.png" title="Laptop title" />);

		const title = screen.getByTestId(bannerTestIds.title);
		expect(title).toBeInTheDocument();
		expect(title).toHaveClass('body6');
	});

	test('selects body5-accent when neither isLargeScreen nor isLaptop', () => {
		mockedUseScreenSize.mockReturnValue({
			isLargeScreen: false,
			isLaptop: false,
		});

		render(<Banner img="/img.png" title="Mobile title" />);

		const title = screen.getByTestId(bannerTestIds.title);
		expect(title).toBeInTheDocument();
		expect(title).toHaveClass('body5-accent');
	});

	test('Does not render title and description if there are no props', () => {
		render(<Banner img="/img.png" />);

		expect(screen.queryByTestId(bannerTestIds.title)).toBeNull();
		expect(screen.queryByTestId(bannerTestIds.description)).toBeNull();
	});

	test('renders the button and calls onButtonClick when clicked', async () => {
		const onButtonClick = jest.fn();
		const user = userEvent.setup();

		render(<Banner img="/img.png" buttonLabel="Click me" onButtonClick={onButtonClick} />);

		const button = screen.getByTestId(bannerTestIds.button);
		expect(button).toBeInTheDocument();

		await user.click(button);

		expect(onButtonClick).toHaveBeenCalledTimes(1);
	});

	test('does not render the button if buttonLabel is not passed', () => {
		render(<Banner img="/img.png" />);

		expect(screen.queryByTestId(bannerTestIds.button)).toBeNull();
	});

	test('Applies the alarm class to the image if className="alarm"', () => {
		render(<Banner img="/img.png" className="alarm" />);

		const img = screen.getByTestId(bannerTestIds.image);
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

		const inner = screen.getByTestId(bannerTestIds.innerWrapper);
		expect(inner).toHaveClass('inner-wrap');

		const button = screen.getByTestId(bannerTestIds.button);
		expect(button).toHaveClass('btn-class');
	});

	test('uses violet background and white text when color is violet', () => {
		render(<Banner img="/img.png" title="Title" color="violet" />);

		const wrapper = screen.getByTestId(bannerTestIds.wrapper);
		const title = screen.getByTestId(bannerTestIds.title);

		expect(title).toHaveClass('text-white-900');
		expect(wrapper).toHaveClass('violet');
	});

	test('renders wrapper with default white background when color not provided', () => {
		render(<Banner img="/img.png" title="Default color" />);

		const wrapper = screen.getByTestId(bannerTestIds.wrapper);
		expect(wrapper).toHaveClass('white');
	});
});

describe('BannerSkeleton', () => {
	test('renders BannerSkeleton on page', () => {
		render(<BannerSkeleton />);

		const skeleton = screen.getByTestId(bannerTestIds.skeleton);
		expect(skeleton).toBeInTheDocument();
	});
});
