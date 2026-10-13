import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { Topics } from '@/shared/config';
import { renderComponent } from '@/shared/libs';
import { setupMockServer } from '@/shared/msw';
import { dropdownTestIds } from '@/shared/ui/Dropdown';
import { selectWithChipsTestIds } from '@/shared/ui/SelectWithChips';

import { topicsMocks } from '../../api/__mock__/data';
import { topicListMock } from '../../api/__mock__/topicListMock';
import { topicApiUrl } from '../../model/constants/topicConstants';

import { TopicSelect, TopicSelectProps } from './TopicSelect';

type OverrideProps = Partial<TopicSelectProps>;

type RequiredTopicSelectProps = Pick<TopicSelectProps, 'value' | 'onChange'>;

const server = setupMockServer([topicListMock]);

const mockTopics = topicsMocks;

const onChange = jest.fn();

const render = (props: OverrideProps = {}) => {
	const defaultProps: RequiredTopicSelectProps = {
		value: [],
		onChange,
	};
	renderComponent(<TopicSelect {...defaultProps} {...props} />);
};

describe('TopicSelect', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('render', () => {
		test('skeleton should be rendered when isLoading is true', () => {
			render({
				selectedSkills: [1],
			});

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

		test('should display empty placeholder in single select mode', async () => {
			server.use(
				http.get(topicApiUrl.getTopicsList, () => {
					return HttpResponse.json({ data: [] });
				}),
			);

			render({
				value: [],
				selectedSkills: [6],
				hasMultiple: false,
			});

			await waitFor(() => {
				expect(screen.getByText(Topics.SELECT_EMPTY)).toBeInTheDocument();
			});
		});

		test('correct placeholder should be displayed when data is empty', async () => {
			server.use(
				http.get(topicApiUrl.getTopicsList, () => {
					return HttpResponse.json({ data: [] });
				}),
			);

			render();

			await waitFor(() => {
				expect(screen.getByText(Topics.SELECT_EMPTY)).toBeInTheDocument();
			});
		});

		test('correct placeholder should be displayed when data is not empty', async () => {
			render({
				selectedSkills: [1],
			});

			await waitFor(() => {
				expect(screen.getByText(Topics.SELECT_CHOOSE)).toBeInTheDocument();
			});
		});

		test('correct title should be displayed when value is selected', async () => {
			render({ value: [3] });

			await waitFor(() => {
				expect(screen.getByText(Topics.SELECT_SELECTED)).toBeInTheDocument();
			});
		});

		test('should display selected topic chip for array value', async () => {
			render({ value: [1], selectedSkills: [6] });

			await waitFor(() => {
				expect(screen.getByText(mockTopics.data[0].title)).toBeInTheDocument();
			});
		});

		test('should display selected topic chip for single value', async () => {
			render({ value: 1, selectedSkills: [6] });

			await waitFor(() => {
				expect(screen.getByText(mockTopics.data[0].title)).toBeInTheDocument();
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
		test('should display topic options after dropdown is opened', async () => {
			render({ value: [], selectedSkills: [6] });

			await waitFor(() => {
				expect(screen.getByText(Topics.SELECT_CHOOSE)).toBeInTheDocument();
			});

			fireEvent.click(screen.getByText(Topics.SELECT_CHOOSE));

			const filteredTopics = mockTopics.data.filter((topic) => topic.skill.id === 6);

			filteredTopics.forEach((topic) => {
				expect(screen.getByText(topic.title)).toBeInTheDocument();
			});
		});

		test('should select single topic when hasMultiple is false', async () => {
			render({
				value: [],
				selectedSkills: [6],
				hasMultiple: false,
			});

			await waitFor(() => {
				expect(screen.getByText(Topics.SELECT_CHOOSE)).toBeInTheDocument();
			});

			fireEvent.click(screen.getByText(Topics.SELECT_CHOOSE));

			await waitFor(() => {
				expect(screen.getByText(mockTopics.data[0].title)).toBeInTheDocument();
			});

			fireEvent.click(screen.getByText(mockTopics.data[0].title));

			expect(onChange).toHaveBeenCalledWith([mockTopics.data[0].id]);
		});

		test('should add topic when hasMultiple is true', async () => {
			render({
				value: [],
				selectedSkills: [6],
				hasMultiple: true,
			});

			await waitFor(() => {
				expect(screen.getByText(Topics.SELECT_CHOOSE)).toBeInTheDocument();
			});

			fireEvent.click(screen.getByText(Topics.SELECT_CHOOSE));

			await waitFor(() => {
				expect(screen.getByText(mockTopics.data[0].title)).toBeInTheDocument();
			});

			fireEvent.click(screen.getByText(mockTopics.data[0].title));

			expect(onChange).toHaveBeenCalledWith([mockTopics.data[0].id]);
		});

		test('should remove topic when delete button is clicked', async () => {
			render({
				value: [mockTopics.data[0].id],
				selectedSkills: [6],
				hasMultiple: true,
			});

			await waitFor(() => {
				expect(screen.getByTestId('chip')).toBeInTheDocument();
			});

			const deleteButton = within(screen.getByTestId('chip')).getByLabelText('delete');

			fireEvent.click(deleteButton);

			expect(screen.queryByText(mockTopics.data[0].title)).not.toBeInTheDocument();
			expect(onChange).toHaveBeenCalledWith([]);
		});
	});
});
