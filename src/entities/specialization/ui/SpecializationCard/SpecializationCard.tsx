import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Specialization as SpecializationI18 } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { Specialization } from '../../model/types/specialization';

import styles from './SpecializationCard.module.css';

interface SpecializationCardProps {
	specialization: Specialization;
}

export const SpecializationCard = ({ specialization }: SpecializationCardProps) => {
	const { t } = useTranslation(i18Namespace.specialization);

	return (
		<Flex>
			<Flex direction="column" gap="24" style={{ flex: '0 1 740px' }}>
				<Card withShadow className={classNames(styles['title-block'])}>
					<Flex gap="16">
						<div className={classNames(styles['title-img-block'])}>
							{specialization?.imageSrc && (
								<img
									className={classNames(styles['title-img-block-image'])}
									src={specialization.imageSrc}
									alt={t(SpecializationI18.SPECIALIZATION_IMAGE_ALT)}
								/>
							)}
						</div>
						<Flex maxWidth direction="column">
							<h1 className={classNames(styles['title-block-title'])}>{specialization.title}</h1>
						</Flex>
					</Flex>
				</Card>
				<Card withShadow>
					<h2 className={classNames(styles['title-description'])}>
						{t(SpecializationI18.SPECIALIZATION_DESCRIPTION)}
					</h2>
					<p>{specialization.description}</p>
				</Card>
			</Flex>
		</Flex>
	);
};
