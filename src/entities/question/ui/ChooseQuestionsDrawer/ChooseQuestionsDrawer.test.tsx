import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import type { ComponentProps } from 'react';

import { Translation } from '@/shared/config';
import { renderComponent } from '@/shared/libs';
import { setupMockServer } from '@/shared/msw';

import { questionsMock } from '../../api/__mocks__/data';
import { questionListMock } from '../../api/__mocks__/questionListMock';
import { questionApiUrls } from '../../model/constants/question';

import { ChooseQuestionsDrawer } from './ChooseQuestionsDrawer';

type ChooseQuestionsDrawerProps = ComponentProps<typeof ChooseQuestionsDrawer>;

const server = setupMockServer([questionListMock]);

const handleSelectQuestion = jest.fn();
const handleUnselectQuestion = jest.fn();

const renderDrawer = (props: Partial<ChooseQuestionsDrawerProps> = {}) => {
	const defaultProps: ChooseQuestionsDrawerProps = {
		selectedQuestions: [],
		handleSelectQuestion,
		handleUnselectQuestion,
	};

	return renderComponent(<ChooseQuestionsDrawer {...defaultProps} {...props} />);
};

const openDrawer = async () => {
	fireEvent.click(
		screen.getByRole('button', {
			name: Translation.CREATE,
		}),
	);

	return screen.findByRole('dialog', {
		hidden: true,
	});
};

describe('ChooseQuestionsDrawer', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should display selected questions', async () => {
		renderDrawer({
			selectedQuestions: [
				{ id: 1, title: 'Question 1' },
				{ id: 2, title: 'Question 2' },
			],
		});

		expect(await screen.findByText('Question 1')).toBeInTheDocument();

		expect(await screen.findByText('Question 2')).toBeInTheDocument();
	});

	test('should open drawer after add button is clicked', async () => {
		renderDrawer();

		expect(screen.queryByPlaceholderText(Translation.SEARCH)).not.toBeInTheDocument();

		await openDrawer();

		expect(await screen.findByPlaceholderText(Translation.SEARCH)).toBeInTheDocument();
	});

	test('should call handleUnselectQuestion when chip delete button is clicked', async () => {
		const selectedQuestion = {
			id: 1,
			title: 'Question 1',
		};

		renderDrawer({
			selectedQuestions: [selectedQuestion],
		});

		const selectedQuestionElement = await screen.findByText(selectedQuestion.title);

		const deleteButton = within(selectedQuestionElement.parentElement!).getByLabelText('delete');

		fireEvent.click(deleteButton);

		expect(handleUnselectQuestion).toHaveBeenCalledWith(selectedQuestion.id);

		expect(handleUnselectQuestion).toHaveBeenCalledTimes(1);
	});

	test('should call handleSelectQuestion when question is clicked', async () => {
		const question = questionsMock.data[0];

		renderDrawer();

		const drawer = await openDrawer();

		const questionElement = await within(drawer).findByText(question.title);

		fireEvent.click(questionElement);

		expect(handleSelectQuestion).toHaveBeenCalledWith({
			id: question.id,
			title: question.title,
		});

		expect(handleUnselectQuestion).not.toHaveBeenCalled();
	});

	test('should call handleUnselectQuestion when selected question is clicked', async () => {
		const question = questionsMock.data[0];

		renderDrawer({
			selectedQuestions: [
				{
					id: question.id,
					title: question.title,
				},
			],
		});

		const drawer = await openDrawer();

		const questionElement = await within(drawer).findByText(question.title);

		fireEvent.click(questionElement);

		expect(handleUnselectQuestion).toHaveBeenCalledWith(question.id);

		expect(handleSelectQuestion).not.toHaveBeenCalled();
	});

	test('should request and display another page', async () => {
		renderDrawer();

		const drawer = await openDrawer();

		expect(await within(drawer).findByText(questionsMock.data[0].title)).toBeInTheDocument();

		fireEvent.click(within(drawer).getByText('2'));

		expect(await within(drawer).findByText(questionsMock.data[10].title)).toBeInTheDocument();

		expect(within(drawer).queryByText(questionsMock.data[0].title)).not.toBeInTheDocument();
	});

	test('should search questions and reset page to one', async () => {
		const requests: Array<{
			page: string | null;
			title: string | null;
		}> = [];

		server.use(
			http.get(process.env.API_URL + questionApiUrls.getQuestionsList, ({ request }) => {
				const url = new URL(request.url);

				const page = Number(url.searchParams.get('page') || 1);

				const limit = Number(url.searchParams.get('limit') || 10);

				const title = url.searchParams.get('title') || '';

				requests.push({
					page: String(page),
					title,
				});

				const filteredQuestions = questionsMock.data.filter((question) =>
					question.title.toLowerCase().includes(title.toLowerCase()),
				);

				return HttpResponse.json({
					data: filteredQuestions.slice((page - 1) * limit, page * limit),
					page,
					limit,
					total: filteredQuestions.length,
				});
			}),
		);

		renderDrawer();

		const drawer = await openDrawer();

		expect(await within(drawer).findByText(questionsMock.data[0].title)).toBeInTheDocument();

		fireEvent.click(within(drawer).getByText('2'));

		await waitFor(() => {
			expect(requests).toContainEqual({
				page: '2',
				title: '',
			});
		});

		fireEvent.change(within(drawer).getByPlaceholderText(Translation.SEARCH), {
			target: {
				value: 'Shadow DOM',
			},
		});

		await waitFor(() => {
			expect(requests).toContainEqual({
				page: '1',
				title: 'Shadow DOM',
			});
		});

		const searchedQuestion = questionsMock.data.find((question) =>
			question.title.includes('Shadow DOM'),
		);

		expect(searchedQuestion).toBeDefined();

		expect(await within(drawer).findByText(searchedQuestion!.title)).toBeInTheDocument();
	});

	test('should pass specializations to questions request', async () => {
		let receivedSpecializationId: string | null = null;

		server.use(
			http.get(process.env.API_URL + questionApiUrls.getQuestionsList, ({ request }) => {
				const url = new URL(request.url);

				receivedSpecializationId = url.searchParams.get('specializationId');

				return HttpResponse.json({
					data: [],
					page: 1,
					limit: 10,
					total: 0,
				});
			}),
		);

		renderDrawer({
			specializations: [11, 12],
		});

		await waitFor(() => {
			expect(receivedSpecializationId).toBe('11,12');
		});
	});
});
