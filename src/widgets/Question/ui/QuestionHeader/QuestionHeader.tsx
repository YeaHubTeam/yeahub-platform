import QuestionImg from '@/shared/assets/images/question_img.png';
import { Block } from '@/shared/ui/Block';

import styles from './QuestionHeader.module.css';

interface props {
	title: string | undefined;
	description: string | undefined;
	status: string | undefined;
}

export const QuestionHeader = ({ title, description, status }: props) => {
	return (
		<div className={styles['question-wrapper']}>
			<Block>
				<div className={styles['question-header-wrapper']}>
					<div className={styles['image-wrapper']}>
						<img src={QuestionImg} alt="Question" />
					</div>
					<div className={styles['title-wrapper']}>
						<h2 className={styles['title']}>{title ?? ''}</h2>
						<p className={styles['description']}>{description ?? ''}</p>
					</div>
					<div className={styles['label-wrapper']}>
						<p className={styles['label']}>{status ?? 'template'}</p>
					</div>
				</div>
			</Block>
		</div>
	);
};
