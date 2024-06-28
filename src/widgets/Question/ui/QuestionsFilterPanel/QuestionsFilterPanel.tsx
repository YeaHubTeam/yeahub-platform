import { Chip, Icon } from 'yeahub-ui-kit';

import { useDebounce } from '@/shared/hooks/useDebounced';

import { useGetSkillsListQuery } from '@/entities/skill';

import { SearchInput } from '@/features/common/search-input';

import styles from './QuestionsFilterPanel.module.css';

const complexity = {
	easy: '1-3',
	medium: '4-6',
	hard: '7-8',
	expert: '9-10',
};

const rate = ['1', '2', ' 3', ' 4', ' 5'];

const progressStatus = [
	{ id: 1, title: 'Изученные' },
	{ id: 2, title: 'Неизученные' },
	{ id: 3, title: 'Сохраненные' },
	{ id: 4, title: 'Все' },
];

interface QuestionsFilterPanelProps {
	className?: string;
	onChange: (params: unknown) => void;
}
export const QuestionsFilterPanel = ({ onChange }: QuestionsFilterPanelProps) => {
	const { data: skills } = useGetSkillsListQuery({});

	const handleSearch = (value: string) => {
		console.log(value);
		onChange({ title: value });
	};
	const debouncedSearch = useDebounce(handleSearch, 500);

	const handleSkill = (id: string) => () => {
		onChange({ skill: [id] });
	};

	return (
		<div className={styles.wrapper}>
			<SearchInput placeholder="Введите запрос" onSearch={debouncedSearch} />
			<div className={styles.section}>
				<h4 className={styles.title}>Категория вопросов</h4>
				<div className={styles['category-wrapper']}>
					{skills &&
						skills.data?.map((skill) => {
							return (
								<Chip
									onClick={handleSkill(skill.id)}
									key={skill.id}
									className={styles.chip}
									label={skill.title}
									theme="primary"
									preffix={skill.imageSrc ? <Icon icon="fileHtml" /> : null}
								/>
							);
						})}
				</div>
			</div>
			<div className={styles.section}>
				<h4 className={styles.title}>Сложность вопросов</h4>
				<div className={styles['category-wrapper']}>
					{Object.entries(complexity).map(([key, value]) => {
						return <Chip key={key} className={styles.chip} label={value} theme="primary" active />;
					})}
				</div>
			</div>
			<div className={styles.section}>
				<h4 className={styles.title}>Рейтинг</h4>
				<div className={styles['category-wrapper']}>
					{rate.map((value) => {
						return <Chip key={value} className={styles.chip} label={value} theme="primary" />;
					})}
				</div>
			</div>
			<div className={styles.section}>
				<h4 className={styles.title}>Статус</h4>
				<div className={styles['category-wrapper']}>
					{progressStatus.map((value) => {
						return (
							<Chip
								key={value.id}
								className={styles.chip}
								label={value.title}
								theme="primary"
								active
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};
