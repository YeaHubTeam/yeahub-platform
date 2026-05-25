import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { Tasks } from '@/shared/config';
import { renderComponent } from '@/shared/libs';
import { setupMockServer } from '@/shared/msw';
import { dropdownTestIds } from '@/shared/ui/Dropdown';
import { selectWithChipsTestIds } from '@/shared/ui/SelectWithChips';

import { taskCategoriesMock } from './../../api/__mocks__/data/taskCategoriesMock';
import { taskCategoryMock } from './../../api/__mocks__/taskCategoryMock';
import { taskApiUrls, taskCategories } from './../../model/constants/task';
import { TaskCategorySelect, TaskCategorySelectProps } from './TaskCategorySelect';

type OverrideProps = Partial<TaskCategorySelectProps>;

type RequiredTaskCategorySelectProps = Pick<TaskCategorySelectProps, 'value' | 'onChange'>;

const server = setupMockServer([taskCategoryMock]);

const mockTaskCategories = taskCategoriesMock;

const onChange = jest.fn();

const render = (props: OverrideProps = {}) => {
	const defaultProps: RequiredTaskCategorySelectProps = {
		value: [],
		onChange,
	};
	renderComponent(<TaskCategorySelect {...defaultProps} {...props} />);
};

describe('TaskCategorySelect', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('render', () => {
		test('should render Dropdown instead of SelectWithChips', () => {
			render();

			expect(screen.getByTestId(dropdownTestIds.dropdown)).toBeInTheDocument();
			expect(screen.queryByTestId(selectWithChipsTestIds.selectWithChips)).not.toBeInTheDocument();
		});

		test('SelectWithChips should be rendered', () => {
			render({ hasMultiple: true });

			expect(screen.getByTestId(dropdownTestIds.dropdown)).toBeInTheDocument();
			expect(screen.getByTestId(selectWithChipsTestIds.selectWithChips)).toBeInTheDocument();
		});

		test('correct placeholder should be displayed when data is empty', async () => {
			server.use(
				http.get(taskApiUrls.getTaskCategories, () => {
					return HttpResponse.json([]);
				}),
			);

			render();

			await waitFor(() => {
				expect(screen.getByText(Tasks.SELECT_EMPTY)).toBeInTheDocument();
			});
		});

		test('correct placeholder should be displayed when data is not empty', async () => {
			render();

			await waitFor(() => {
				expect(screen.getByText(Tasks.SELECT_CHOOSE)).toBeInTheDocument();
			});
		});

		test('correct value should be displayed when value is selected (SelectWithChips)', () => {
			render({ value: [mockTaskCategories[0].code], hasMultiple: true });
			expect(screen.getByText(Tasks.SELECT_SELECTED)).toBeInTheDocument();
		});

		test('correct value should be displayed when value is selected (Dropdown)', async () => {
			render({ value: [mockTaskCategories[0].code], hasMultiple: false });
			await waitFor(() => {
				expect(screen.getByText(taskCategories[mockTaskCategories[0].code])).toBeInTheDocument();
			});
		});

		test('disabled should be provided correctly', () => {
			render({ value: [mockTaskCategories[0].code], disabled: true });

			const selectElement = screen.getByTestId('dropdown-select');

			expect(selectElement.className).toMatch(/wrapper-disabled/);
		});
	});

	describe('actions', () => {
		beforeEach(async () => {
			render();

			await waitFor(() => {
				expect(screen.getByTestId(dropdownTestIds.dropdown)).toBeInTheDocument();
			});
		});

		test('should display task-categories options after dropdown is opened', () => {
			fireEvent.click(screen.getByText(Tasks.SELECT_CHOOSE));

			mockTaskCategories.forEach((category) => {
				expect(screen.getByText(taskCategories[category.code])).toBeInTheDocument();
			});
		});

		test('should close task-categories options after option is selected', () => {
			fireEvent.click(screen.getByText(Tasks.SELECT_CHOOSE));

			fireEvent.click(screen.getByText(taskCategories[mockTaskCategories[0].code]));

			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});

		test('should close task-categories options after click outside', () => {
			fireEvent.click(screen.getByText(Tasks.SELECT_CHOOSE));

			fireEvent.mouseDown(document.body);

			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});
	});

	describe('handleChange', () => {
		test('should add task-category to selected list (SelectWithChips)', async () => {
			render({ hasMultiple: true });

			await waitFor(() => {
				expect(screen.getByText(Tasks.SELECT_CHOOSE)).toBeInTheDocument();
			});

			fireEvent.click(screen.getByText(Tasks.SELECT_CHOOSE));
			fireEvent.click(screen.getByText(taskCategories[mockTaskCategories[0].code]));
			expect(onChange).toHaveBeenCalledWith([mockTaskCategories[0].code]);
		});

		test('should add task-category to selected list (DropDown)', async () => {
			render({ hasMultiple: false });

			await waitFor(() => {
				expect(screen.getByText(Tasks.SELECT_CHOOSE)).toBeInTheDocument();
			});

			fireEvent.click(screen.getByText(Tasks.SELECT_CHOOSE));
			fireEvent.click(screen.getByText(taskCategories[mockTaskCategories[0].code]));
			expect(onChange).toHaveBeenCalledWith(mockTaskCategories[0].code);
		});

		test('should delete chip and update onChange when delete button is clicked', async () => {
			render({ hasMultiple: true });

			await waitFor(() => {
				expect(screen.getByText(Tasks.SELECT_CHOOSE)).toBeInTheDocument();
			});

			fireEvent.click(screen.getByText(Tasks.SELECT_CHOOSE));
			fireEvent.click(screen.getByText(taskCategories[mockTaskCategories[0].code]));
			expect(onChange).toHaveBeenCalledWith([mockTaskCategories[0].code]);

			const deleteButton = within(
				screen.getByText(taskCategories[mockTaskCategories[0].code]).parentElement!,
			).getByLabelText('delete');

			fireEvent.click(deleteButton);

			expect(screen.queryByLabelText('delete')).not.toBeInTheDocument();
			expect(onChange).toHaveBeenCalledWith([]);
		});
	});
});
