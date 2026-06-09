import { screen } from '@testing-library/react';

import { Translation } from '@/shared/config';
import { renderComponent } from '@/shared/libs';

import { AuthorInfo, Author } from './AuthorInfo';

type OverrideProps = {
	createdBy?: Author;
	isCenter?: boolean;
};

const defaultAuthor: Author = {
	id: '123',
	username: 'john_doe',
};

const renderAuthorInfo = (props: OverrideProps = {}, route = '/') => {
	const { createdBy = defaultAuthor, ...rest } = props;

	renderComponent(<AuthorInfo createdBy={createdBy} {...rest} />, { route });
};

describe('AuthorInfo', () => {
	describe('Rendering', () => {
		test('renders author label', () => {
			renderAuthorInfo();

			expect(screen.getByText(`${Translation.AUTHOR}:`)).toBeInTheDocument();
		});

		test('renders username', () => {
			renderAuthorInfo();

			expect(screen.getByText(defaultAuthor.username)).toBeInTheDocument();
		});

		test('renders with justify start by default', () => {
			renderAuthorInfo();
			expect(screen.getByTestId('Flex')).not.toHaveClass('justify-center');
		});

		test('renders with justify center when isCenter is true', () => {
			renderAuthorInfo({ isCenter: true });
			expect(screen.getByTestId('Flex')).toHaveClass('justify-center');
		});
	});

	describe('Navigation', () => {
		test('renders admin user link when project is admin', () => {
			renderAuthorInfo({}, '/admin');

			const link = screen.getByRole('link', { name: defaultAuthor.username });

			expect(link).toHaveAttribute('href', `/admin/users/${defaultAuthor.id}`);
		});

		test('renders platform user link when project is platform', () => {
			renderAuthorInfo({}, '/');

			const link = screen.getByRole('link', { name: defaultAuthor.username });

			expect(link).toHaveAttribute('href', `/users/${defaultAuthor.id}`);
		});
	});
});
