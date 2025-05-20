import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useCurrentProject, useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { Collection } from '@/entities/collection';
import { Question } from '@/entities/question';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { PreviewQuestionsItem } from '@/widgets/question/QuestionsList';

import { NoQuestionsCard } from '../NoQuestionsCard/NoQuestionsCard';

import styles from './CollectionBody.module.css';

interface CollectionBodyProps extends Pick<Collection, 'isFree'> {
	questions: Question[];
}

export const CollectionBody = ({ questions, isFree }: CollectionBodyProps) => {
	const { t } = useTranslation(i18Namespace.questions);
	const navigate = useNavigate();
	const { isMobile } = useScreenSize();
	const isLanding = useCurrentProject() === 'landing';

	// TODO: Добавить роут для сообщества
	const onMoveSignup = () => {
		if (isLanding) navigate(ROUTES.auth.register.page, { replace: false });
		else navigate(ROUTES.platformRoute, { replace: false });
	};

	if (isFree)
		return (
			<Card className={styles.wrapper} withOutsideShadow>
				<Text variant="body6" className={styles.title}>
					{t(Questions.PREVIEW_TITLE)}
				</Text>
				{questions.length ? (
					<Flex componentType="ul" direction="column" gap="12">
						{questions?.map((question) => (
							<PreviewQuestionsItem key={question.id} question={question} />
						))}
					</Flex>
				) : (
					<NoQuestionsCard icon="clockSquare" text={t(Questions.PREVIEW_EMPTY_COLLECTION)} />
				)}
			</Card>
		);

	if (!isFree)
		return (
			<Card className={styles.wrapper} withOutsideShadow>
				<Flex justify="between" align="center" className={styles.title}>
					<Text variant="body6">{t(Questions.PREVIEW_TITLE)}</Text>
					{!isMobile && (
						<Button
							variant="link"
							size="large"
							suffix={<Icon icon="arrowRight" size={24} />}
							onClick={onMoveSignup}
						>
							{t(Questions.COMMUNITY_JOIN)}
						</Button>
					)}
				</Flex>
				<NoQuestionsCard
					icon="lockKeyholeMinimalistic"
					text={t(Questions.PREVIEW_LOCKED_COLLECTION)}
				/>
				{isMobile && (
					<Button
						variant="link"
						size="large"
						className={styles['link-mobile']}
						suffix={<Icon icon="arrowRight" size={24} />}
						onClick={onMoveSignup}
					>
						{t(Questions.COMMUNITY_JOIN)}
					</Button>
				)}
			</Card>
		);

	return null;
};
