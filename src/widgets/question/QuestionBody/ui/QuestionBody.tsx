import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions, ROUTES } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { SimpleStub } from '@/shared/ui/SimpleStub';
import { TextHtml } from '@/shared/ui/TextHtml';

import styles from './QuestionBody.module.css';

interface QuestionBodyProps {
	shortAnswer: string;
	longAnswer: string;
	isAuthorized?: boolean;
}

export const QuestionBody = ({
	shortAnswer,
	longAnswer,
	isAuthorized = true,
}: QuestionBodyProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	return (
		<>
			<Card
				title={t(Questions.SHORT_ANSWER_TITLE)}
				withOutsideShadow
				className={styles['short-block']}
			>
				<TextHtml html={shortAnswer} />
			</Card>
			<Card
				expandable
				title={t(Questions.LONG_ANSWER_TITLE)}
				withOutsideShadow
				className={styles['long-block']}
				actionRoute={!isAuthorized ? ROUTES.auth.register.page : undefined}
				actionTitle={!isAuthorized ? t(Questions.REGISTER) : undefined}
			>
				{!isAuthorized ? (
					<SimpleStub variant="no-authorized" text={t(Questions.STUB_NOT_AUTH_TITLE)} />
				) : (
					<TextHtml html={longAnswer} />
				)}
			</Card>
		</>
	);
};
