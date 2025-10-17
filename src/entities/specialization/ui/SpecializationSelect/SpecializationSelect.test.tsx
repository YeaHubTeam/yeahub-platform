import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { specializationsMock } from '../../api/__mocks__/data';

const mockSpecializations = specializationsMock;
import { SpecializationSelect } from './SpecializationSelect';

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => {
			const translations: Record<string, string> = {
				'specialization.select.choose': 'Выберите специализацию',
				'specialization.select.empty': 'Нет доступных опций',
				'specialization.select.selected': 'Выбранные специализации',
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

jest.mock('../../api/specializationApi', () => {
	return {
		useGetSpecializationsListQuery: jest.fn(() => ({
			data: mockSpecializations,
			isLoading: false,
			isSuccess: true,
		})),
	};
});

describe('SpecializationSelect component', () => {
	const onChangeMock = jest.fn();
	const SELECT_CHOOSE_KEY = 'select.choose';

	beforeEach(() => {
		onChangeMock.mockClear();
	});

	test('basic single select display', async () => {
		render(<SpecializationSelect value={0} onChange={onChangeMock} />);

		const dropdown = screen.getByTestId('dropdown-select');
		expect(dropdown).toBeInTheDocument();
	});

	test('displays a list of specializations in a single select', async () => {
		render(<SpecializationSelect value={0} onChange={onChangeMock} hasMultiple={false} />);

		const dropdownButton = screen.getByTestId('dropdown-select');

		fireEvent.click(dropdownButton);
		await waitFor(() => {
			expect(dropdownButton).toHaveAttribute('aria-expanded', 'true');
		});

		const listbox = await screen.findByRole('listbox');
		expect(listbox).toBeInTheDocument();
		expect(listbox).toBeVisible();

		await Promise.all(
			specializationsMock.data.map(async (specialization) => {
				const option = await screen.findByRole('option', {
					name: specialization.title,
					hidden: false,
				});

				expect(option).toBeVisible();
				expect(option).toHaveTextContent(specialization.title);
				expect(option).toBeInTheDocument();
				expect(option).not.toHaveClass('hidden');
			}),
		);
	});

	test('checks the correct display and selection of options', async () => {
		render(<SpecializationSelect value={0} onChange={onChangeMock} hasMultiple={false} />);

		await waitFor(() => {
			expect(screen.getByTestId('dropdown')).toBeInTheDocument();
		});

		const dropdownButton = screen.getByTestId('dropdown-select');

		fireEvent.click(dropdownButton);
		await waitFor(() => {
			expect(dropdownButton).toHaveAttribute('aria-expanded', 'true');
		});

		const listbox = await screen.findByRole('listbox');
		expect(listbox).toBeInTheDocument();
		expect(listbox).toBeVisible();

		const options = await screen.findAllByRole('option');
		expect(options).toHaveLength(specializationsMock.data.length);

		await Promise.all(
			specializationsMock.data.map(async (specialization) => {
				const option = await waitFor(() =>
					screen.findByRole('option', {
						name: specialization.title,
						hidden: false,
					}),
				);

				await waitFor(() => {
					expect(option).toBeVisible();
					expect(option).toBeInTheDocument();
					expect(option).toHaveTextContent(specialization.title);
					expect(option).not.toHaveClass('hidden');
				});
			}),
		);
	});

	test('label localization', async () => {
		render(<SpecializationSelect value={0} onChange={onChangeMock} />);

		const label = screen.getByTestId('dropdown-select');
		expect(label).toHaveTextContent(SELECT_CHOOSE_KEY);
	});

	test('checks the operation of the disabled state', async () => {
		render(
			<SpecializationSelect
				value={0}
				onChange={onChangeMock}
				hasMultiple={false}
				disabled={true}
			/>,
		);

		await waitFor(() => {
			expect(screen.getByTestId('dropdown')).toBeInTheDocument();
		});

		fireEvent.click(screen.getByTestId('dropdown-select'));

		expect(onChangeMock).not.toHaveBeenCalled();
	});

	test('return when newValue=undefined', async () => {
		render(
			<SpecializationSelect
				value={0}
				onChange={onChangeMock}
				hasMultiple={false}
				disabled={false}
			/>,
		);

		await waitFor(() => {
			expect(screen.getByTestId('dropdown')).toBeInTheDocument();
		});

		fireEvent.keyDown(screen.getByTestId('dropdown-select'), { key: 'Escape' });
		fireEvent.blur(screen.getByTestId('dropdown-select'));

		expect(onChangeMock).not.toHaveBeenCalled();
	});

	test('checking handleChange in single-select mode', async () => {
		render(<SpecializationSelect value={0} onChange={onChangeMock} />);

		const dropdown = screen.getByTestId('dropdown-select');
		fireEvent.click(dropdown);

		const option = await screen.findByRole('option', { name: 'Python Backend Developer' });
		fireEvent.click(option);

		await waitFor(() => {
			expect(onChangeMock).toHaveBeenCalledWith([19]);
		});
	});

	test('checking handleChange in multiple select modet', async () => {
		render(<SpecializationSelect value={[1]} onChange={onChangeMock} hasMultiple={true} />);

		const dropdown = screen.getByTestId('dropdown-select');
		fireEvent.click(dropdown);

		const option = await screen.findByRole('option', { name: 'Java Backend Developer' });
		fireEvent.click(option);

		await waitFor(() => {
			expect(onChangeMock).toHaveBeenCalledWith([1, 20]);
		});
	});

	test('return check for undefined newValue', async () => {
		render(<SpecializationSelect value={0} onChange={onChangeMock} disabled={false} />);

		const dropdown = screen.getByTestId('dropdown-select');

		fireEvent.change(dropdown, { target: { value: undefined } });

		await waitFor(() => {
			expect(onChangeMock).not.toHaveBeenCalled();
		});
	});

	test('correctly removes the last specialization', async () => {
		render(<SpecializationSelect value={[1]} onChange={onChangeMock} hasMultiple={true} />);
		const chipToDelete = screen.getByTestId('chip');
		const deleteButton = chipToDelete.querySelector('.chip-delete-icon');

		fireEvent.click(deleteButton!);
		await waitFor(() => {
			expect(screen.queryByTestId('chip')).toBeNull();
			expect(onChangeMock).toHaveBeenCalledWith([]);
		});
	});

	test('does not delete if disabled', async () => {
		render(
			<SpecializationSelect
				value={[1]}
				onChange={onChangeMock}
				disabled={true}
				hasMultiple={true}
			/>,
		);

		const chip = await waitFor(() => screen.getByTestId('chip'));
		const deleteButton = chip.querySelector('.chip-delete-icon');

		if (!deleteButton) {
			throw new Error('Кнопка удаления не найдена');
		}

		fireEvent.click(deleteButton);

		await waitFor(() => {
			expect(onChangeMock).not.toHaveBeenCalled();
			expect(screen.getByTestId('chip')).toBeInTheDocument();
		});
	});

	test('checking undefined newValue', async () => {
		render(<SpecializationSelect value={0} onChange={onChangeMock} disabled={false} />);

		const dropdown = screen.getByTestId('dropdown-select');

		fireEvent.change(dropdown, { target: { value: undefined } });

		await waitFor(() => {
			expect(onChangeMock).not.toHaveBeenCalled();
		});
	});
});
