import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Vacancies, i18Namespace } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './VacancyActions.module.css';

interface VacancyActionsProps {
	applyVacancyUrl: string;
}

export const VacancyActions = ({ applyVacancyUrl }: VacancyActionsProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	return (
		<Card withOutsideShadow className={styles.card}>
			<Flex align="center" direction="column" gap="12">
				<Button size="large" variant="tertiary" preffix={<Icon icon="arrowUpRight" size={24} />}>
					<Link to={applyVacancyUrl} target="_blank" rel="noopener noreferrer">
						<Text variant="body3">{t(Vacancies.BUTTONS_RESPOND)}</Text>
					</Link>
				</Button>
			</Flex>
		</Card>
	);
};
