import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Icon, IconButton, Popover } from 'yeahub-ui-kit';

import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { QuestionParam } from '@/shared/ui/QuestionParam';
import { TextHtml } from '@/shared/ui/TextHtml';

import { Question } from '@/entities/question';

import { LearnQuestionButton } from '@/features/quiz/learnQuestion';
import { ResetQuestionStudyProgressButton } from '@/features/quiz/resetQuestionStudyProgress';

import styles from './QuestionPreview.module.css';

type QuestionProps = {
	question: Question;
	profileId: string;
};

export const QuestionPreview = ({ question, profileId }: QuestionProps) => {
	const { id, imageSrc, complexity = 0, rate, shortAnswer } = question;

	const [isOpenQuestionActions, setIsOpenQuestionActions] = useState(false);

	const togglePopup = () => {
		setIsOpenQuestionActions((prev) => !prev);
	};

	const closePopup = () => {
		setIsOpenQuestionActions(false);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles['header-params']}>
					<QuestionParam label="Рейтинг" value={rate} />
					<QuestionParam label="Сложность" value={complexity} />
				</div>
				<Popover
					body={
						<>
							<NavLink
								className={styles.link}
								to={route(ROUTES.interview.questions.detail.page, id)}
							>
								<Button
									className={styles.button}
									theme="tertiary"
									preffix={<Icon icon="gearSix" size={20} />}
									size="medium"
								>
									Подробнее
								</Button>
							</NavLink>
							<LearnQuestionButton profileId={profileId} questionId={id} />
							<ResetQuestionStudyProgressButton profileId={profileId} questionId={id} />
						</>
					}
					className={styles.popup}
					isOpen={isOpenQuestionActions}
					onClickOutside={closePopup}
					placement="left-start"
				>
					<IconButton
						type="button"
						aria-label="details"
						className={styles['details-button']}
						icon={<Icon icon="dotsThreeVertical" />}
						theme="link"
						onClick={togglePopup}
						aria-expanded={isOpenQuestionActions}
					/>
				</Popover>
			</div>
			{imageSrc && <img className={styles.image} alt={'asdasd'} src={imageSrc} />}
			<div className={styles.content}>
				<TextHtml html={shortAnswer} />
			</div>
		</div>
	);
};
