import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Block } from '@/shared/ui/Block';

import { useGetQuestionsListQuery } from '@/entities/question';

import { QuestionsFilterPanel, QuestionsSummaryList } from '@/widgets/Question';

import {
	//getQuestionsPageNum,
	getQuestionsPageFilter,
} from '../../model/selectors/questionsPageSelectors';
import { questionsPageActions } from '../../model/slices/questionsPageSlice';
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
		id: 55,
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
	const params = useSelector(getQuestionsPageFilter);
	const dispatch = useAppDispatch();
	const { data: questions } = useGetQuestionsListQuery(params);

	const onChangeSearchParams = (value: string) => {
		dispatch(questionsPageActions.setTitle(value));
	};

	const onChangeSkills = (skills: number[]) => {
		dispatch(questionsPageActions.setSkills(skills));
	};

	const onChangeComplexity = (complexity: number[]) => {
		dispatch(questionsPageActions.setComplexity(complexity));
	};

	const onChangeRate = (rate: number[]) => {
		dispatch(questionsPageActions.setRate(rate));
	};

	const onChangeStatus = (status: number[]) => {
		dispatch(questionsPageActions.setStatus(status));
	};

	return (
		<section className={styles.wrapper}>
			<div className={styles['main-info-wrapper']}>
				<Block className={styles.content}>
					<QuestionsSummaryList questions={response?.data} />
					<QuestionPagePagination questionsResponse={questions} />
				</Block>
			</div>
			<div className={styles['additional-info-wrapper']}>
				<Block className={styles.search}>
					<QuestionsFilterPanel
						onChangeSearch={onChangeSearchParams}
						onChangeSkills={onChangeSkills}
						onChangeComplexity={onChangeComplexity}
						onChangeRate={onChangeRate}
						onChangeStatus={onChangeStatus}
						filter={params}
					/>
				</Block>
			</div>
		</section>
	);
};

export default QuestionsPage;
