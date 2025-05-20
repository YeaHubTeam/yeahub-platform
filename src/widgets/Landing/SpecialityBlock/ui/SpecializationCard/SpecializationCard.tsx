import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { IMockSpeciality } from '@/widgets/Landing/SpecialityBlock/ui/SpecializationBlock/mockSpecialization';

import styles from './SpecializationCard.module.css';

export const SpecializationCard = ({ title, description, image, alt, link }: IMockSpeciality) => {
	const { t } = useTranslation(i18Namespace.landing);

	const navigate = useNavigate();

	return (
		<Flex direction={'column'} justify={'between'} className={styles.card}>
			<Flex direction={'row'} justify={'between'} align={'start'} className={styles['card-title']}>
				<Text variant={'body6'}>{title}</Text>
				<img src={image} alt={alt} />
			</Flex>
			<Flex direction={'column'} justify={'end'}>
				<Text variant={'body3'} className={styles['card-description']}>
					{description}
				</Text>
				<Button
					fullWidth={true}
					className={styles['card-button']}
					onClick={() => navigate(link || '')}
				>
					{t(Landing.SPECIALIZATION_CARD_BUTTON)}
				</Button>
			</Flex>
		</Flex>
	);
};
