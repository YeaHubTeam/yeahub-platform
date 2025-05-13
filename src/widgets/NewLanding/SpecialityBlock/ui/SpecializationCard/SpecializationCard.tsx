import i18n, { i18Namespace } from '@/shared/config/i18n/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { IMockSpeciality } from '@/widgets/NewLanding/SpecialityBlock/ui/SpecializationBlock/mockSpecialization';

import styles from './SpecializationCard.module.css';

export const SpecializationCard = ({ title, description, image, alt }: IMockSpeciality) => {
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
				<Button fullWidth={true} className={styles['card-button']}>
					{i18n.t(Landing.SPECIALITY_CARD_BUTTON, { ns: i18Namespace.landing })}
				</Button>
			</Flex>
		</Flex>
	);
};
