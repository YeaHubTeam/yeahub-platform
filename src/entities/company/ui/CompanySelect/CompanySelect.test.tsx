import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { companiesMock } from '../../api/__mocks__/data/companiesMock';
import { useGetCompaniesListQuery } from '../../api/companyApi';

import { CompanySelect } from './CompanySelect';

const mockCompanies = companiesMock;
const mockedQuery = useGetCompaniesListQuery as jest.Mock;

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => {
			const translations: Record<string, string> = {
				'companies.select.choose': 'Выберите название компании',
				'companies.select.empty': 'Нет доступных компаний',
				'companies.select.selected': 'Выбранная компания',
			};
			return translations[key] || key;
		},
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

jest.mock('../../api/companyApi', () => {
	return {
		useGetCompaniesListQuery: jest.fn(() => ({
			data: mockCompanies,
			isLoading: false,
			isSuccess: true,
		})),
	};
});

describe('CompanySelect component', () => {
	const onChangeMock = jest.fn();

	beforeEach(() => {
		onChangeMock.mockClear();
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	test('renders CompanySelect component', () => {
		render(<CompanySelect value="" onChange={onChangeMock} />);
		expect(screen.getByTestId('dropdown-select')).toBeInTheDocument();
	});

	test('displays company list', async () => {
		render(<CompanySelect value="" onChange={onChangeMock} />);

		const dropdown = screen.getByTestId('dropdown-select');

		fireEvent.click(dropdown);

		const listbox = await screen.findByRole('listbox');

		expect(listbox).toBeVisible();

		await Promise.all(
			companiesMock.data.map(async (company) => {
				expect(
					await screen.findByRole('option', {
						name: company.title,
					}),
				).toBeVisible();
			}),
		);
	});

	test('renders empty companies list', () => {
		mockedQuery.mockReturnValueOnce({
			data: undefined,
			isLoading: false,
			isSuccess: true,
		});

		render(<CompanySelect value="" onChange={onChangeMock} />);

		expect(screen.getByTestId('dropdown-select')).toBeInTheDocument();
	});

	test('select company', async () => {
		render(<CompanySelect value="" onChange={onChangeMock} />);

		fireEvent.click(screen.getByTestId('dropdown-select'));

		const option = await screen.findByRole('option', {
			name: 'YeaHub',
		});

		fireEvent.click(option);

		await waitFor(() => {
			expect(onChangeMock).toHaveBeenCalledWith('1');
		});
	});

	test('disabled select', () => {
		render(<CompanySelect value="" onChange={onChangeMock} disabled />);

		fireEvent.click(screen.getByTestId('dropdown-select'));

		expect(onChangeMock).not.toHaveBeenCalled();
	});

	test('delete selected company', async () => {
		render(<CompanySelect value="1" onChange={onChangeMock} />);

		const chip = await screen.findByTestId('chip');

		const deleteButton = chip.querySelector('.chip-delete-icon');

		expect(deleteButton).toBeTruthy();

		fireEvent.click(deleteButton!);

		await waitFor(() => {
			expect(onChangeMock).toHaveBeenCalledWith('');
		});
	});

	test('does not delete chip when disabled', async () => {
		render(<CompanySelect value="1" onChange={onChangeMock} disabled />);

		const chip = await screen.findByTestId('chip');

		const deleteButton = chip.querySelector('.chip-delete-icon');

		expect(deleteButton).toBeTruthy();

		fireEvent.click(deleteButton!);

		expect(onChangeMock).not.toHaveBeenCalled();
	});
	test('search input updates value', () => {
		render(<CompanySelect value="" onChange={onChangeMock} />);

		const input = screen.getByRole('textbox');

		fireEvent.change(input, {
			target: {
				value: 'Yea',
			},
		});

		expect(input).toHaveValue('Yea');

		jest.advanceTimersByTime(500);
	});
});
