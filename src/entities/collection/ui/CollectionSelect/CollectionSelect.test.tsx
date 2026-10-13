import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // ← ДОБАВИТЬ
import { http, HttpResponse } from 'msw';

import { Collections } from '@/shared/config';
import { renderComponent } from '@/shared/libs';
import { setupMockServer } from '@/shared/msw';

import { collectionListMock } from './../../api/__mock__/collectionListMock';
import { collectionsMock } from './../../api/__mock__/data/collectionsMock';
import { collectionApiUrls } from './../../model/constants/collection';
import { CollectionSelect, CollectionSelectProps } from './CollectionSelect';

type OverrideProps = Partial<CollectionSelectProps>;
type RequiredCollectionSelectProps = Pick<CollectionSelectProps, 'value' | 'onChange'>;

const server = setupMockServer([collectionListMock]);

const mockCollections = collectionsMock;

const onChange = jest.fn();

const render = (props: OverrideProps = {}) => {
	const defaultProps: RequiredCollectionSelectProps = {
		value: '',
		onChange,
	};
	renderComponent(<CollectionSelect {...defaultProps} {...props} />);
};

describe('CollectionSelect', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('render', () => {
		test('should render input field', () => {
			render();
			expect(screen.getByRole('textbox')).toBeInTheDocument();
		});

		test('should render placeholder', () => {
			render();
			expect(screen.getByPlaceholderText(Collections.SELECT_CHOOSE)).toBeInTheDocument();
		});

		test('should render title', () => {
			render();
			expect(screen.getByText(Collections.SELECT_TITLE)).toBeInTheDocument();
		});
	});

	describe('state', () => {
		test('should render options after loading', async () => {
			render();

			const input = screen.getByRole('textbox');
			fireEvent.click(input);

			await waitFor(() => {
				expect(screen.getByText(mockCollections.data[0].title)).toBeInTheDocument();
			});
		});

		test('should show empty state when no collections', async () => {
			server.use(
				http.get(collectionApiUrls.getCollectionsList, () => {
					return HttpResponse.json({ data: [], total: 0 });
				}),
			);

			render();

			const input = screen.getByRole('textbox');
			fireEvent.click(input);

			await waitFor(() => {
				expect(screen.getByText(Collections.SELECT_EMPTY)).toBeInTheDocument();
			});
		});

		test('should show error state when request fails', async () => {
			server.use(
				http.get(collectionApiUrls.getCollectionsList, () => {
					return new HttpResponse(null, { status: 500 });
				}),
			);

			render();

			const input = screen.getByRole('textbox');
			fireEvent.click(input);

			await waitFor(() => {
				expect(screen.getByText(Collections.SELECT_EMPTY)).toBeInTheDocument();
			});
		});
	});

	describe('select', () => {
		test('should show selected value', async () => {
			render();

			const input = screen.getByRole('textbox');
			fireEvent.click(input);

			await waitFor(() => {
				expect(screen.getByText(mockCollections.data[0].title)).toBeInTheDocument();
			});

			const option = screen.getByText(mockCollections.data[0].title);
			fireEvent.click(option);

			await waitFor(() => {
				expect(input).toHaveValue(mockCollections.data[0].title);
			});
		});

		test('should call onChange when option is selected', async () => {
			const onChange = jest.fn();
			render({ onChange });

			const input = screen.getByRole('textbox');
			fireEvent.click(input);

			await waitFor(() => {
				expect(screen.getByText(mockCollections.data[0].title)).toBeInTheDocument();
			});

			const option = screen.getByText(mockCollections.data[0].title);
			fireEvent.click(option);

			expect(onChange).toHaveBeenCalledWith(mockCollections.data[0].id.toString());
		});

		test('should open dropdown on input click', async () => {
			render();

			const input = screen.getByRole('textbox');

			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

			fireEvent.click(input);

			await waitFor(() => {
				expect(screen.getByRole('listbox')).toBeInTheDocument();
			});
		});

		test('should close dropdown when clicking outside', async () => {
			render();

			const input = screen.getByRole('textbox');

			fireEvent.click(input);
			await waitFor(() => {
				expect(screen.getByRole('listbox')).toBeInTheDocument();
			});

			fireEvent.mouseDown(document.body);

			await waitFor(() => {
				expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
			});
		});

		test('should close dropdown after option is selected', async () => {
			render();

			const input = screen.getByRole('textbox');

			fireEvent.click(input);
			await waitFor(() => {
				expect(screen.getByText(mockCollections.data[0].title)).toBeInTheDocument();
			});

			const option = screen.getByText(mockCollections.data[0].title);
			fireEvent.click(option);

			await waitFor(() => {
				expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
			});
		});
	});

	describe('search', () => {
		test('should update input value on typing', async () => {
			const user = userEvent.setup();
			render();

			const input = screen.getByRole('textbox');
			await user.type(input, 'Frontend');

			expect(input).toHaveValue('Frontend');
		});

		test('should filter options by search query', async () => {
			const user = userEvent.setup();
			render();

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.type(input, 'Мегафон');

			await waitFor(() => {
				const options = screen.getAllByText(/Мегафон/i);
				expect(options.length).toBeGreaterThan(0);

				expect(screen.queryByText(/Avito/i)).not.toBeInTheDocument();
			});
		});

		test('should show empty state when no search results', async () => {
			const user = userEvent.setup();
			render();

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.type(input, 'НесуществующаяКоллекция');

			await waitFor(() => {
				expect(screen.getByText(Collections.SELECT_EMPTY)).toBeInTheDocument();
			});
		});
	});

	describe('clear button', () => {
		test('should clear input when clear button is clicked', async () => {
			const user = userEvent.setup();
			render();

			const input = screen.getByRole('textbox');
			await user.type(input, 'Frontend');
			expect(input).toHaveValue('Frontend');

			const clearButton = document.querySelector('.clear-button');
			expect(clearButton).toBeInTheDocument();

			fireEvent.click(clearButton!);

			await waitFor(() => {
				expect(input).toHaveValue('');
			});
		});

		test('should hide clear button when input is empty', async () => {
			render();

			const input = screen.getByRole('textbox');
			expect(input).toHaveValue('');

			const clearButton = document.querySelector('.clear-button');
			expect(clearButton).toHaveStyle('display: none');
		});

		test('should show clear button when input has text', async () => {
			const user = userEvent.setup();
			render();

			const input = screen.getByRole('textbox');
			await user.type(input, 'Frontend');
			const clearButton = document.querySelector('.clear-button');
			expect(clearButton).toBeVisible();
		});
	});
	describe('disabled', () => {
		test('should be disabled when disabled prop is true', () => {
			render({ disabled: true });

			const selectElement = screen.getByTestId('dropdown-select');
			expect(selectElement.className).toMatch(/wrapper-disabled/);
		});
	});
});
