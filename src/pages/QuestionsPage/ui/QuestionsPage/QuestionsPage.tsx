import { useSelector } from 'react-redux';

import { Accordion } from '@/shared/ui/Accordion';
import { Block } from '@/shared/ui/Block';
/* import { ErrorElement } from '@/shared/ui/ErrorElement';
import { Loader } from '@/shared/ui/Loader'; */

import { QuestionPreview } from '@/entities/question';
import { useGetQuestionsListQuery } from '@/entities/question';

import { QuestionsSearchBar } from '@/widgets/Question';

import { getQuestionsPageNum } from '../../model/selectors/questionsPageSelectors';
import { QuestionPagePagination } from '../QuestionsPagePagination/QuestionPagePagination';

import styles from './QuestionsPage.module.css';

// временные данные
const interviewQuestionsData = [
	{
		id: 1,
		title: 'Что такое Virtual DOM, и как он работает?',
		description: 'What is a Virtual DOM and how it works?',
		imageSrc:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu5c-sFOyXeJ-tFKlQBs_mmr9fgDnXybh7WA&s',
		keywords: ['javascript'],
		shortAnswer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisi Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisiLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisi',
		longAnswer: '2+2=4',
		status: 'draft',
		rate: 8,
		rating: 10,
		specializations: [1, 3],
		skills: [10, 23],
	},
	{
		id: 2,
		title: 'Что такое Virtual DOM, и как он работает?',
		description: 'What is a Virtual DOM and how it works?',
		imageSrc:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu5c-sFOyXeJ-tFKlQBs_mmr9fgDnXybh7WA&s',
		keywords: ['javascript'],
		shortAnswer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisi Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisiLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisi',
		longAnswer: '2+2=4',
		status: 'draft',
		rate: 8,
		rating: 10,
		specializations: [1, 3],
		skills: [10, 23],
	},
	{
		id: 2,
		title: 'Что такое Virtual DOM, и как он работает?',
		description: 'What is a Virtual DOM and how it works?',
		imageSrc:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu5c-sFOyXeJ-tFKlQBs_mmr9fgDnXybh7WA&s',
		keywords: ['javascript'],
		shortAnswer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisi Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisiLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisi',
		longAnswer: '2+2=4',
		status: 'draft',
		rate: 8,
		rating: 10,
		specializations: [1, 3],
		skills: [10, 23],
	},
	{
		id: 3,
		title: 'Что такое Virtual DOM, и как он работает?',
		description: 'What is a Virtual DOM and how it works?',
		imageSrc:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu5c-sFOyXeJ-tFKlQBs_mmr9fgDnXybh7WA&s',
		keywords: ['javascript'],
		shortAnswer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisi Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisiLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisi',
		longAnswer: '2+2=4',
		status: 'draft',
		rate: 8,
		rating: 10,
		specializations: [1, 3],
		skills: [10, 23],
	},
	/* {
		id: 4,
		title: 'Что такое Virtual DOM, и как он работает?',
		description: 'What is a Virtual DOM and how it works?',
		imageSrc:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu5c-sFOyXeJ-tFKlQBs_mmr9fgDnXybh7WA&s',
		keywords: ['javascript'],
		shortAnswer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisi Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisiLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisi',
		longAnswer: '2+2=4',
		status: 'draft',
		rate: 8,
		rating: 10,
		specializations: [1, 3],
		skills: [10, 23],
	},
	{
		id: 5,
		title: 'Что такое Virtual DOM, и как он работает?',
		description: 'What is a Virtual DOM and how it works?',
		imageSrc:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu5c-sFOyXeJ-tFKlQBs_mmr9fgDnXybh7WA&s',
		keywords: ['javascript'],
		shortAnswer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisi Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisiLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisi',
		longAnswer: '2+2=4',
		status: 'draft',
		rate: 8,
		rating: 10,
		specializations: [1, 3],
		skills: [10, 23],
	},
	{
		id: 6,
		title: 'Что такое Virtual DOM, и как он работает?',
		description: 'What is a Virtual DOM and how it works?',
		imageSrc:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu5c-sFOyXeJ-tFKlQBs_mmr9fgDnXybh7WA&s',
		keywords: ['javascript'],
		shortAnswer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisi Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisiLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisi',
		longAnswer: '2+2=4',
		status: 'draft',
		rate: 8,
		rating: 10,
		specializations: [1, 3],
		skills: [10, 23],
	},
	{
		id: 7,
		title: 'Что такое Virtual DOM, и как он работает?',
		description: 'What is a Virtual DOM and how it works?',
		imageSrc:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu5c-sFOyXeJ-tFKlQBs_mmr9fgDnXybh7WA&s',
		keywords: ['javascript'],
		shortAnswer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisi Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisiLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisi',
		longAnswer: '2+2=4',
		status: 'draft',
		rate: 8,
		rating: 10,
		specializations: [1, 3],
		skills: [10, 23],
	},
	{
		id: 8,
		title: 'Что такое Virtual DOM, и как он работает?',
		description: 'What is a Virtual DOM and how it works?',
		imageSrc:
			'https://www.in2code.de/fileadmin/_processed_/0/b/csm_code_javascript_49d002a67e.webp',
		keywords: ['javascript'],
		shortAnswer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisi Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisi',
		longAnswer: '2+2=4',
		status: 'draft',
		rate: 8,
		rating: 10,
		specializations: [1, 3],
		skills: [10, 23],
	},
	{
		id: 9,
		title: 'Что такое Virtual DOM, и как он работает?',
		description: 'What is a Virtual DOM and how it works?',
		imageSrc:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu5c-sFOyXeJ-tFKlQBs_mmr9fgDnXybh7WA&s',
		keywords: ['javascript'],
		shortAnswer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc sit amet, ultrices nisl. Nulla facilisi',
		longAnswer: '2+2=4',
		status: 'draft',
		rate: 8,
		rating: 10,
		specializations: [1, 3],
		skills: [10, 23],
	}, */
];

const response = {
	data: interviewQuestionsData,
	total: 100,
	page: 2,
	limit: 10,
};

const QuestionsPage = () => {
	const page = useSelector(getQuestionsPageNum);
	const { data: questions } = useGetQuestionsListQuery({ page });

	return (
		<section className={styles.wrapper}>
			<div className={styles['main-info-wrapper']}>
				<Block className={styles.content}>
					<h1>Вопросы React, JS555</h1>
					<hr />
					{response.data &&
						response.data.map((question) => {
							return (
								<Accordion key={question.id} title={question.title}>
									<QuestionPreview question={question} />
								</Accordion>
							);
						})}
					<QuestionPagePagination questionsResponse={questions} />
				</Block>
			</div>
			<div className={styles['additional-info-wrapper']}>
				<Block className={styles.search}>
					<QuestionsSearchBar />
				</Block>
			</div>
		</section>
	);
};

export default QuestionsPage;

//QuestionPreview with short answer for accordion with details button which will be redirect to the question page
//QuestionsFilter for aside menu
