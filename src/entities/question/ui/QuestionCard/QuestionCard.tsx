import classNames from 'classnames';
import { Chip } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { InfoChip } from '@/shared/ui/InfoChip/ui/InfoChip';
import { TextHtml } from '@/shared/ui/TextHtml';

import { Question } from '../../model/types/question';

import styles from './QuestionCard.module.css';

interface QuestionCardProps {
	question: Question;
}

export const QuestionCard = ({ question }: QuestionCardProps) => {
	const { t } = useI18nHelpers([i18Namespace.questions, i18Namespace.interview]);

	const author = JSON.parse(question.createdBy as string);

	return (
		<Flex gap="24">
			<Flex direction="column" gap="8" style={{ flex: '1 1 740px' }}>
				<Card withShadow className={classNames(styles['title-block'])}>
					<Flex gap="8">
						<div className={classNames(styles['title-img-block'])}>
							{question?.imageSrc && (
								<img
									className={classNames(styles['title-img-block-image'])}
									src={question.imageSrc}
									alt="img"
								/>
							)}
						</div>
						<Flex maxWidth direction="column">
							<h1 className={classNames(styles['title-block-title'])}>{question.title}</h1>
							<p className={classNames(styles['title-block-description'])}>
								{question.description}
							</p>
						</Flex>
						<div className={classNames(styles['title-block-tag'])}>{question.status}</div>
					</Flex>
				</Card>
				<Card
					withShadow
					className={classNames(styles['short-answer-block'])}
					title={t(Questions.SHORT_ANSWER_TITLE)}
				>
					<TextHtml html={question.shortAnswer || ''} />
				</Card>
				<Card withShadow title={t(Questions.LONG_ANSWER_TITLE)}>
					<TextHtml html={question.longAnswer || ''} />
				</Card>
			</Flex>
			<Flex direction="column" align="center" className={classNames(styles['sidebar-wrap'])}>
				<Card className={classNames(styles['sidebar-card'])}>
					<Flex gap="24" direction="column">
						<Flex gap="16" direction="column">
							<h4 className={classNames(styles['sidebar-card-skills-title'])}>
								{t(Questions.LEVEL)}:
							</h4>
							<Flex gap="16">
								<InfoChip label={t(Questions.COMPLEXITY)} value={question.complexity} />
								<InfoChip label={t(Questions.RATE)} value={question.rate} />
							</Flex>
						</Flex>
						<Flex gap="16" direction="column">
							<h4 className={classNames(styles['sidebar-card-skills-title'])}>
								{t(Questions.SKILLS_TITLE)}:
							</h4>
							<Flex gap="8">
								{question.keywords?.map((keyword) => (
									<Chip key={keyword} theme={'primary'} label={keyword} active />
								))}
							</Flex>
						</Flex>
					</Flex>
				</Card>
				<p className={classNames(styles['author'])}>
					{t(Questions.QUESTION_AUTHOR)} :{' '}
					<span className={classNames(styles['author-name'])}>
						{author.lastName} {author.firstName}
					</span>
				</p>
			</Flex>
		</Flex>
	);
};
