import { fireEvent, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { ProgrammingLanguages } from '@/shared/config';
import { renderComponent } from '@/shared/libs';
import { setupMockServer } from '@/shared/msw';
import { selectWithChipsTestIds } from '@/shared/ui/SelectWithChips';

import { programmingLanguagesMock } from '../../api/__mocks__/data/programmingLanguagesMock';
import { programmingLanguagesListMock } from '../../api/__mocks__/programmingLanguagesListMock';
import { programmingLanguagesApiUrls } from '../../model/constants/programmingLanguageApiUrls';

import {
	ProgrammingLanguageSelect,
	ProgrammingLanguageSelectProps,
} from './ProgrammingLanguageSelect';

type OverrideProps = Partial<ProgrammingLanguageSelectProps>;

type RequiredLanguageSelectProps = Pick<ProgrammingLanguageSelectProps, 'value' | 'onChange'>;

const server = setupMockServer([programmingLanguagesListMock]);

const mockProgrammingLanguages = Object.values(programmingLanguagesMock);

const onChange = jest.fn();

const render = (props: OverrideProps = {}) => {
	const defaultProps: RequiredLanguageSelectProps = {
		value: [],
		onChange,
	};
	renderComponent(<ProgrammingLanguageSelect {...defaultProps} {...props} />);
};

describe('ProgrammingLanguageSelect', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('render', () => {
		test('Dropdown should be rendered for single select', async () => {
			render();

			await waitFor(() => {
				expect(screen.getByTestId('dropdown')).toBeInTheDocument();
				expect(
					screen.queryByTestId(selectWithChipsTestIds.selectWithChips),
				).not.toBeInTheDocument();
			});
		});

		test('selectWithChips should be rendered for multi select', async () => {
			render({ hasMultiple: true });

			await waitFor(() => {
				expect(screen.getByTestId(selectWithChipsTestIds.selectWithChips)).toBeInTheDocument();
			});
		});

		test('should initialize with array when value is array', () => {
			async () => {
				server.use(
					http.get(programmingLanguagesApiUrls.getProgrammingLanguagesList, () => {
						return HttpResponse.json([programmingLanguagesMock.go, programmingLanguagesMock.java]);
					}),
				);

				render({ value: ['60', '62'], hasMultiple: true });

				await waitFor(() => {
					expect(screen.getAllByTestId('chip')).toHaveLength(2);
				});

				expect(screen.getByText(programmingLanguagesMock.go.name)).toBeInTheDocument();
				expect(screen.getByText(programmingLanguagesMock.java.name)).toBeInTheDocument();
			};
		});

		test('should initialize with empty array when value is undefined', async () => {
			server.use(
				http.get(programmingLanguagesApiUrls.getProgrammingLanguagesList, () => {
					return HttpResponse.json([programmingLanguagesMock.go, programmingLanguagesMock.java]);
				}),
			);

			render({ value: undefined, hasMultiple: true });

			await waitFor(() => {
				expect(screen.queryByTestId('chip')).not.toBeInTheDocument();
			});

			expect(screen.getByText(ProgrammingLanguages.SELECT_CHOOSE)).toBeInTheDocument();
		});

		test('correct placeholder should be displayed when data is empty', async () => {
			server.use(
				http.get(programmingLanguagesApiUrls.getProgrammingLanguagesList, () => {
					return HttpResponse.json([]);
				}),
			);

			render();

			await waitFor(() => {
				expect(screen.getByText(ProgrammingLanguages.SELECT_EMPTY)).toBeInTheDocument();
			});
		});

		test('correct placeholder should be displayed when data is not empty', async () => {
			render();

			await waitFor(() => {
				expect(screen.getByText(ProgrammingLanguages.SELECT_CHOOSE)).toBeInTheDocument();
			});
		});

		test('correct title should be displayed when value is selected', async () => {
			render({ value: '54', hasMultiple: true });

			await waitFor(() => {
				expect(screen.getByText(ProgrammingLanguages.SELECT_SELECTED)).toBeInTheDocument();
			});
		});

		test('disabled should be provided correctly', async () => {
			render({ value: '54', disabled: true });

			const dropdownSelect = screen.getByTestId('dropdown-select');

			await waitFor(() => {
				expect(dropdownSelect.className).toMatch(/wrapper-disabled/);
			});

			fireEvent.click(dropdownSelect);

			expect(screen.queryByText(programmingLanguagesMock.go.name)).not.toBeInTheDocument();
		});
	});

	describe('actions', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		test('should display programming languages after dropdown is opened', async () => {
			render();

			await waitFor(() => {
				expect(screen.getByTestId('dropdown')).toBeInTheDocument();
			});

			fireEvent.click(screen.getByText(ProgrammingLanguages.SELECT_CHOOSE));

			mockProgrammingLanguages.forEach((language) => {
				expect(screen.getByText(language.name)).toBeInTheDocument();
			});
		});

		test('should replace programming language when handleChange is called in single select mode', async () => {
			server.use(
				http.get(programmingLanguagesApiUrls.getProgrammingLanguagesList, () => {
					return HttpResponse.json([programmingLanguagesMock.cpp, programmingLanguagesMock.go]);
				}),
			);

			render({
				value: '54',
				hasMultiple: false,
			});

			fireEvent.click(screen.getByTestId('dropdown-select'));

			fireEvent.click(await screen.findByText(programmingLanguagesMock.go.name));

			expect(onChange).toHaveBeenCalledWith('60');
			expect(onChange).toHaveBeenCalledTimes(1);
		});

		test('should add programming language to selected list when handleChange is called in multi select mode', async () => {
			server.use(
				http.get(programmingLanguagesApiUrls.getProgrammingLanguagesList, () => {
					return HttpResponse.json([programmingLanguagesMock.go, programmingLanguagesMock.java]);
				}),
			);

			render({
				value: [],
				hasMultiple: true,
			});

			fireEvent.click(screen.getByTestId('dropdown-select'));

			expect(await screen.findByText(programmingLanguagesMock.go.name)).toBeInTheDocument();

			fireEvent.click(screen.getByText(programmingLanguagesMock.go.name));

			expect(onChange).toHaveBeenLastCalledWith(['60']);
		});

		test('should delete chip and update onChange when delete button is clicked', async () => {
			render({
				value: ['54'],
				hasMultiple: true,
			});

			fireEvent.click(screen.getByTestId('dropdown-select'));
			fireEvent.click(await screen.findByText(programmingLanguagesMock.go.name));

			expect(onChange).toHaveBeenLastCalledWith(['54', String(programmingLanguagesMock.go.id)]);
			expect(screen.getAllByTestId('chip')).toHaveLength(2);

			const deleteButtons = screen.getAllByLabelText('delete');

			fireEvent.click(deleteButtons[1]);

			expect(onChange).toHaveBeenLastCalledWith(['54']);
			expect(screen.getAllByTestId('chip')).toHaveLength(1);
		});
	});
});
