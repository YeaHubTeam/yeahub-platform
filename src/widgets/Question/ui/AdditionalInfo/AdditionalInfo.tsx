import classnames from 'classnames';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Chip, Icon } from 'yeahub-ui-kit';

import { ROUTES } from '@/shared/config/router/routes';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Card } from '@/shared/ui/Card';
import { QuestionParam } from '@/shared/ui/QuestionParam';

import { getSkillDefaultIcon, Skill } from '@/entities/skill';

import styles from './AdditionalInfo.module.css';

//todo после обновления рейтинга и сложности скорректировать рендер компонента
interface AdditionalInfoProps {
	rate: number;
	complexity: number;
	keywords: string[];
	questionSkills: Skill[];
	authorFullName?: string;
	className?: string;
}

export const AdditionalInfo = ({
	rate,
	complexity,
	questionSkills,
	keywords,
	authorFullName,
	className,
}: AdditionalInfoProps) => {
	const navigate = useNavigate();
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Card className={classnames(styles['normal-hight'], className)} withOutsideShadow>
			<div className={styles.wrapper}>
				<h4 className={styles.title}>Уровень:</h4>
				<ul className={styles['param-wrapper']}>
					<QuestionParam label="Сложность" value={complexity} />
					<QuestionParam label="Рейтинг" value={rate} />
				</ul>
			</div>
			<div className={styles.wrapper}>
				<h4 className={styles.title}>Навыки:</h4>
				<ul className={styles['param-wrapper']}>
					{questionSkills.map((skill) => {
						return (
							<li key={skill.id}>
								<Chip
									className={styles.chip}
									label={skill.title}
									theme="primary"
									active
									preffix={
										skill.imageSrc ? (
											<img
												style={{ width: 20, height: 20 }}
												src={skill.imageSrc}
												alt={skill.title}
											/>
										) : (
											<Icon icon={getSkillDefaultIcon(skill)} />
										)
									}
									onClick={() =>
										navigate(
											`${ROUTES.interview.questions.page}?page=1&status=all&skills=` +
												encodeURIComponent(skill.id),
										)
									}
								/>
							</li>
						);
					})}
				</ul>
			</div>
			<div>
				<h4 className={styles.title}>Ключевые слова:</h4>
				<div className={styles['keywords-wrapper']}>
					{keywords.map((keyword) => {
						return (
							<Link
								key={keyword}
								to={
									`${ROUTES.interview.questions.page}?page=1&status=all&keywords=` +
									encodeURIComponent(keyword)
								}
							>{`#${keyword}`}</Link>
						);
					})}
				</div>
			</div>
			{(isMobile || isTablet) && (
				<div>
					<p className={styles.author}>
						Автор: <NavLink to={`#`}>{authorFullName}</NavLink>
					</p>
				</div>
			)}
		</Card>
	);
};
