import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Icon, IconButton, Popover } from 'yeahub-ui-kit';

import { TextHtml } from '@/shared/TextHtml/TextHtml';
import { QuestionParam } from '@/shared/ui/QuestionParam';

import { Question } from '../../model/types/question';

import styles from './QuestionPreview.module.css';

type QuestionProps = {
	question: Question;
};

export const QuestionPreview = ({ question }: QuestionProps) => {
	const { id, imageSrc, complexity = 0, rate, shortAnswer } = question;

	const [isOpen, setIsOpen] = useState(false);

	const togglePopup = () => {
		setIsOpen((prev) => !prev);
	};

	const closePopup = () => {
		setIsOpen(false);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles['header-params']}>
					<QuestionParam label="Рейтинг" value={rate} />
					<QuestionParam label="Сложность" value={complexity} />
				</div>
				<div>
					<Popover
						body={
							<div className={styles.popup}>
								<Button
									className={styles.button}
									theme="tertiary"
									preffix={<Icon icon="gearSix" size={20} />}
								>
									<NavLink className={styles.link} to={`/interview/questions/${id}`}>
										Подробнее
									</NavLink>
								</Button>
								<Button
									className={styles.button}
									theme="tertiary"
									preffix={<Icon icon="student" size={20} />}
								>
									Изучать
								</Button>
								<Button
									className={styles.button}
									theme="tertiary"
									preffix={<Icon icon="thumbsUp" size={20} />}
								>
									Уже знаю
								</Button>
							</div>
						}
						isOpen={isOpen}
						onClickOutside={closePopup}
						placement="left"
					>
						<IconButton
							type="button"
							aria-label="details"
							className={styles['details-button']}
							icon={<Icon icon="dotsThreeVertical" />}
							theme="link"
							onClick={togglePopup}
							aria-expanded={isOpen}
						/>
					</Popover>
				</div>
			</div>
			{imageSrc && <img className={styles.image} alt={'asdasd'} src={imageSrc} />}
			<div className={styles.content}>
				<TextHtml html={shortAnswer} />
			</div>
		</div>
	);
};
