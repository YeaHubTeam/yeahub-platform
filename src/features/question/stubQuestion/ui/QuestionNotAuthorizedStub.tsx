import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace, Questions, ROUTES } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Stub } from '@/shared/ui/Stub';
import { Text } from '@/shared/ui/Text';

import styles from './QuestionNotAuthorizedStub.module.css';

export const QuestionNotAuthorizedStub = () => {
	const { t } = useTranslation(i18Namespace.questions);
	return (
		<Card>
			<Flex direction={'row'} justify={'between'} className={styles.title}>
				<Text variant={'body5-accent'}>{t(Questions.LONG_ANSWER_TITLE)}</Text>
				<Link to={ROUTES.auth.register.page}>
					<Button variant="link" size="large" suffix={<Icon icon="arrowRight" size={24} />}>
						{t(Questions.REGISTER)}
					</Button>
				</Link>
			</Flex>
			<Stub type={'not-authorized'} iconImg={true} />
		</Card>
	);
};
