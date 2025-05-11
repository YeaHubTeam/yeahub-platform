import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import sberImg from '@/widgets/Landing/CollectionBlock/model/assets/sber.avif';
import tbankImg from '@/widgets/Landing/CollectionBlock/model/assets/tbank.avif';
import vkImg from '@/widgets/Landing/CollectionBlock/model/assets/vk.avif';

import { sliderSettings } from '../../model/constants';
import { CollectionCard } from '../CollectionCard/CollectionCard';

import styles from './MainBlock.module.css';

export const MainBlock = () => {
	const { t } = useTranslation(i18Namespace.landing);
	const { isMobile } = useScreenSize();

	const mockCards = [
		{
			imageSrc: sberImg,
			description: t(Landing.COLLECTION_CARD_SBER),
			specialization: 'Frontend',
			isPublic: false,
		},
		{
			imageSrc: tbankImg,
			description: t(Landing.COLLECTION_CARD_TBANK),
			specialization: 'Frontend',
			isPublic: false,
		},
		{
			imageSrc: vkImg,
			description: t(Landing.COLLECTION_CARD_VK),
			specialization: 'Backend',
			isPublic: false,
		},
	];

	if (isMobile) {
		return (
			<Flex gap="20" className={styles['main-block']} direction="column">
				{mockCards.map(({ specialization, description, isPublic, imageSrc }, index) => (
					<CollectionCard
						key={index}
						specialization={specialization}
						description={description}
						isPublic={isPublic}
						imageSrc={imageSrc}
					/>
				))}
			</Flex>
		);
	}

	return (
		<div className={styles['main-block']}>
			<Slider {...sliderSettings} className={styles['slider-container']}>
				{mockCards.map(({ specialization, description, isPublic, imageSrc }, index) => (
					<CollectionCard
						key={index}
						specialization={specialization}
						description={description}
						isPublic={isPublic}
						imageSrc={imageSrc}
					/>
				))}
			</Slider>
		</div>
	);
};
