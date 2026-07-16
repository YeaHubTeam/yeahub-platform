import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Specializations } from '@/shared/config';
import { Card } from '@/shared/ui/Card';

import { Specialization } from '../../model/types/specialization';

import styles from './SpecializationCard.module.css';

interface SpecializationCardProps {
	specialization: Specialization;
}

export const SpecializationCard = ({ specialization }: SpecializationCardProps) => {
	const { t } = useTranslation(i18Namespace.specialization);

	return (
		<Card withOutsideShadow>
			<h2 className={classNames(styles['title-description'])}>
				{t(Specializations.DESCRIPTION_FULL)}
			</h2>
			<p>{specialization.description}</p>
		</Card>
	);
};
