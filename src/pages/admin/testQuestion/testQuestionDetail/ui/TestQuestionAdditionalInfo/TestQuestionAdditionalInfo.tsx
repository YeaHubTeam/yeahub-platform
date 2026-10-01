import classNames from 'classnames';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, ROUTES, TestQuestions, Translation } from '@/shared/config';
import { formatDate, route } from '@/shared/libs';
import { AuthorInfo } from '@/shared/ui/AuthorInfo';
import { Card } from '@/shared/ui/Card';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { TestQuestion, TestQuestionReference } from '@/entities/testQuestion';

import styles from '../TestQuestionPageContent/TestQuestionPageContent.module.css';

interface TestQuestionInfoSectionProps {
	title: string;
	children: ReactNode;
	tallLabel?: boolean;
	contentClassName?: string;
}

const TestQuestionInfoSection = ({
	title,
	children,
	tallLabel,
	contentClassName,
}: TestQuestionInfoSectionProps) => (
	<Flex direction="column" gap="16">
		<Text
			variant="body3-accent"
			color="black-700"
			className={classNames(styles['info-label'], tallLabel && styles['info-label-tall'])}
		>
			{title}
		</Text>
		<Flex wrap="wrap" gap="8" className={contentClassName}>
			{children}
		</Flex>
	</Flex>
);

interface TestQuestionAdditionalInfoProps {
	question: TestQuestion;
}

export const TestQuestionAdditionalInfo = ({ question }: TestQuestionAdditionalInfoProps) => {
	const { t } = useTranslation(i18Namespace.testQuestion);
	const navigate = useNavigate();
	const { questionSpecializations, questionSkills, keywords, createdBy } = question;
	const renderReferenceChip = (
		reference: TestQuestionReference,
		kind: 'skill' | 'specialization',
	) => (
		<Chip
			key={reference.id}
			label={reference.title || reference.name || `#${reference.id}`}
			className={kind === 'skill' ? styles['compact-chip'] : undefined}
			style={{ maxWidth: '100%' }}
			active={kind === 'skill'}
			onClick={() =>
				navigate(
					route(
						kind === 'skill'
							? ROUTES.admin.skills.details.page
							: ROUTES.admin.specializations.details.page,
						reference.id,
					),
				)
			}
		/>
	);
	const details = [
		{ title: TestQuestions.COMPLEXITY, value: question.complexity ?? '—', tallLabel: true },
		{ title: TestQuestions.RATE, value: question.rate ?? '—', tallLabel: true },
		{
			title: TestQuestions.CREATED_AT,
			value: formatDate(new Date(question.createdAt), 'dd.MM.yyyy'),
			active: true,
			tallLabel: false,
		},
		{
			title: TestQuestions.UPDATED_AT,
			value: formatDate(new Date(question.updatedAt), 'dd.MM.yyyy'),
			active: true,
			tallLabel: false,
		},
	];

	return (
		<Card className={styles['info-card']}>
			<Flex direction="column" gap="20">
				<TestQuestionInfoSection title={t(TestQuestions.SPECIALIZATIONS)} tallLabel>
					{questionSpecializations?.length ? (
						questionSpecializations.map((reference) =>
							renderReferenceChip(reference, 'specialization'),
						)
					) : (
						<Text variant="body3">—</Text>
					)}
				</TestQuestionInfoSection>
				<TestQuestionInfoSection title={t(TestQuestions.SKILLS)}>
					{questionSkills?.length ? (
						questionSkills.map((reference) => renderReferenceChip(reference, 'skill'))
					) : (
						<Text variant="body3">—</Text>
					)}
				</TestQuestionInfoSection>
				{details.map(({ title, value, active, tallLabel }) => (
					<TestQuestionInfoSection key={title} title={t(title)} tallLabel={tallLabel}>
						<Chip
							label={String(value)}
							active={active}
							className={active ? styles['compact-chip'] : undefined}
						/>
					</TestQuestionInfoSection>
				))}
				<TestQuestionInfoSection
					title={t(TestQuestions.KEYWORDS)}
					contentClassName={styles.keywords}
				>
					{keywords?.length ? (
						keywords.map((keyword, index) => (
							<Text
								key={`${keyword}-${index}`}
								variant="body3"
								color="purple-700"
								className={styles.keyword}
							>
								#{keyword}
							</Text>
						))
					) : (
						<Text variant="body3">—</Text>
					)}
				</TestQuestionInfoSection>
				{createdBy ? (
					<AuthorInfo createdBy={createdBy} />
				) : (
					<Text variant="body2">{t(Translation.AUTHOR, { ns: i18Namespace.translation })}: —</Text>
				)}
			</Flex>
		</Card>
	);
};
