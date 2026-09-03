import { render, screen } from '@testing-library/react';

import { Avatar } from './Avatar';

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => key,
		i18n: {
			changeLanguage: jest.fn(),
			language: 'ru',
		},
	}),
	initReactI18next: {
		type: '3rdParty',
		init: jest.fn(),
	},
}));

jest.mock('../AvatarWithoutPhoto', () => ({
	AvatarWithoutPhoto: () => <div data-testid="AvatarWithoutPhoto_Wrapper" />,
}));

describe('Avatar', () => {
	test('should render AvatarWithoutPhoto when image is not provided', () => {
		render(<Avatar />);

		expect(screen.getByTestId('AvatarWithoutPhoto_Wrapper')).toBeInTheDocument();
		expect(screen.queryByRole('img')).not.toBeInTheDocument();
	});

	test('should render img when image prop is provided', () => {
		render(<Avatar image="/test-avatar.jpg" />);

		const img = screen.getByRole('img');
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute('src', '/test-avatar.jpg');
	});

	test('should apply default size (50) as width and height styles', () => {
		const { container } = render(<Avatar />);

		const wrapper = container.firstChild as HTMLElement;
		expect(wrapper).toHaveStyle({ width: '50px', height: '50px' });
	});

	test('should apply custom size as width and height styles', () => {
		const { container } = render(<Avatar size={100} />);

		const wrapper = container.firstChild as HTMLElement;
		expect(wrapper).toHaveStyle({ width: '100px', height: '100px' });
	});

	test('should apply default borderRadius (25) as style', () => {
		const { container } = render(<Avatar />);

		const wrapper = container.firstChild as HTMLElement;
		expect(wrapper).toHaveStyle({ borderRadius: '25px' });
	});

	test('should apply custom borderRadius as style', () => {
		const { container } = render(<Avatar borderRadius={8} />);

		const wrapper = container.firstChild as HTMLElement;
		expect(wrapper).toHaveStyle({ borderRadius: '8px' });
	});

	test('should add border class when withBorder is true', () => {
		const { container } = render(<Avatar withBorder />);

		const wrapper = container.firstChild as HTMLElement;
		expect(wrapper).toHaveClass('border');
	});

	test('should not have border class when withBorder is false', () => {
		const { container } = render(<Avatar withBorder={false} />);

		const wrapper = container.firstChild as HTMLElement;
		expect(wrapper).not.toHaveClass('border');
	});

	test('should apply custom className to wrapper', () => {
		const { container } = render(<Avatar className="my-custom-class" />);

		const wrapper = container.firstChild as HTMLElement;
		expect(wrapper).toHaveClass('my-custom-class');
	});
});
