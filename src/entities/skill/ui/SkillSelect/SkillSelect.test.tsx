import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { Skills } from '@/shared/config';
import { renderComponent } from '@/shared/libs';
import { setupMockServer } from '@/shared/msw';
import { dropdownTestIds } from '@/shared/ui/Dropdown';
import { selectWithChipsTestIds } from '@/shared/ui/SelectWithChips';

import { skillsMock } from '../../api/__mocks__/data/skillsMock';
import { skillListMock } from '../../api/__mocks__/skillListMock';
import { skillApiUrls } from '../../model/constants/skillConstants';

import { SkillSelect, SkillSelectProps } from './SkillSelect';

type OverrideProps = Partial<SkillSelectProps>;

type RequiredSkillSelectProps = Pick<SkillSelectProps, 'value' | 'onChange'>;

const server = setupMockServer([skillListMock]);

const mockSkills = skillsMock;

const onChange = jest.fn();

const render = (props: OverrideProps = {}) => {
	const defaultProps: RequiredSkillSelectProps = {
		value: [],
		onChange,
	};
	renderComponent(<SkillSelect {...defaultProps} {...props} />);
};

describe('SkillSelect', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('render', () => {
		test('skeleton should be rendered when isLoading is true', () => {
			render();

			expect(screen.getByTestId(dropdownTestIds.dropdownSkeleton)).toBeInTheDocument();
			expect(screen.queryByTestId(selectWithChipsTestIds.selectWithChips)).not.toBeInTheDocument();
		});

		test('selectWithChips should be rendered', async () => {
			render();

			await waitFor(() => {
				expect(screen.queryByTestId(dropdownTestIds.dropdownSkeleton)).not.toBeInTheDocument();
				expect(screen.getByTestId(selectWithChipsTestIds.selectWithChips)).toBeInTheDocument();
			});
		});

		test('correct placeholder should be displayed when data is empty', async () => {
			server.use(
				http.get(skillApiUrls.getSkillsList, () => {
					return HttpResponse.json({ data: [] });
				}),
			);

			render();

			await waitFor(() => {
				expect(screen.getByText(Skills.SELECT_EMPTY)).toBeInTheDocument();
			});
		});

		test('correct placeholder should be displayed when data is not empty', async () => {
			render();

			await waitFor(() => {
				expect(screen.getByText(Skills.SELECT_CHOOSE)).toBeInTheDocument();
			});
		});

		test('correct title should be displayed when value is selected', async () => {
			render({ value: [6] });

			await waitFor(() => {
				expect(screen.getByText(Skills.SELECT_SELECTED)).toBeInTheDocument();
			});
		});

		test('disabled should be provided correctly', async () => {
			render({ value: [1], disabled: true });

			await waitFor(() => {
				expect(screen.getByTestId(selectWithChipsTestIds.selectWithChips)).toBeInTheDocument();
			});

			const selectWithChips = screen.getByTestId(selectWithChipsTestIds.selectWithChips);
			const button = within(selectWithChips).getByRole('button');

			expect(button.className).toMatch(/disabled/);
		});
	});

	describe('actions', () => {
		beforeEach(async () => {
			render();

			await waitFor(() => {
				expect(screen.getByTestId(selectWithChipsTestIds.selectWithChips)).toBeInTheDocument();
			});
		});

		test('should display skill options after dropdown is opened', () => {
			fireEvent.click(screen.getByText(Skills.SELECT_CHOOSE));

			mockSkills.data.forEach((skill) => {
				expect(screen.queryByText(skill.title)).toBeInTheDocument();
			});
		});

		test('should add skill to selected list when handleChange is called', () => {
			fireEvent.click(screen.getByText(Skills.SELECT_CHOOSE));
			fireEvent.click(screen.getByText(mockSkills.data[0].title));

			expect(onChange).toHaveBeenCalledWith([mockSkills.data[0].id]);
		});

		test('should delete chip and update onChange when delete button is clicked', () => {
			fireEvent.click(screen.getByText(Skills.SELECT_CHOOSE));
			fireEvent.click(screen.getByText(mockSkills.data[0].title));

			expect(onChange).toHaveBeenCalledWith([mockSkills.data[0].id]);

			const selectedSkill = screen.getByText(mockSkills.data[0].title);
			const deleteButton = within(selectedSkill.parentElement!).getByLabelText('delete');
			expect(deleteButton).toBeInTheDocument();

			fireEvent.click(deleteButton);

			expect(selectedSkill).not.toBeInTheDocument();
			expect(onChange).toHaveBeenCalledWith([]);
		});
	});

	describe('specializations', () => {
		test('skills should be fetched according to the provided specialization', async () => {
			render({ selectedSpecializations: [16] });

			const filteredSkills = mockSkills.data.filter((skill) => {
				return skill.specializations?.some((specialization) => specialization.id === 16);
			});

			await waitFor(() => {
				expect(screen.getByTestId(selectWithChipsTestIds.selectWithChips)).toBeInTheDocument();
			});

			fireEvent.click(screen.getByText(Skills.SELECT_CHOOSE));

			filteredSkills.forEach((skill) => {
				expect(screen.getByText(skill.title)).toBeInTheDocument();
			});

			expect(screen.getAllByRole('option')).toHaveLength(filteredSkills.length);
		});
	});
});
