import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Slider } from '@/shared/ui/Slider';

import { CollectionPreview } from '@/entities/collection';

import sberImg from '@/widgets/Landing/CollectionBlock/model/assets/sber.avif';
import tbankImg from '@/widgets/Landing/CollectionBlock/model/assets/tbank.avif';
import vkImg from '@/widgets/Landing/CollectionBlock/model/assets/vk.avif';

import { sliderSettings } from '../../model/constants';

import styles from './MainBlock.module.css';

export const MainBlock = () => {
	const { t } = useTranslation(i18Namespace.landing);
	const { isMobile } = useScreenSize();

	const mockCards = [
		{
			id: 1,
			title: t(Landing.COLLECTION_CARD_SBER),
			description: '',
			imageSrc: sberImg,
			keywords: ['Frontend'],
			specializations: [
				{
					id: 1,
					title: 'Frontend',
					description: '',
				},
			],
			tariff: 'premium' as const,
			isFree: false,
		},
		{
			id: 2,
			title: t(Landing.COLLECTION_CARD_TBANK),
			description: '',
			imageSrc: tbankImg,
			keywords: ['Frontend'],
			specializations: [
				{
					id: 2,
					title: 'Frontend',
					description: '',
				},
			],
			tariff: 'premium' as const,
			isFree: false,
		},
		{
			id: 3,
			title: t(Landing.COLLECTION_CARD_VK),
			description: '',
			imageSrc: vkImg,
			keywords: ['Backend'],
			specializations: [
				{
					id: 3,
					title: 'Backend',
					description: '',
				},
			],
			tariff: 'premium' as const,
			isFree: false,
		},
	];

	const renderCards = mockCards.map((collection, index) => (
		<div key={index} data-testid="MainBlock_Card">
			<CollectionPreview variant="column" collection={collection} />
		</div>
	));

	if (isMobile) {
		return (
			<Flex
				dataTestId="MainBlock_Mobile"
				gap="20"
				className={styles['main-block']}
				direction="column"
			>
				{renderCards}
			</Flex>
		);
	}

	return (
		<div data-testid="MainBlock_Desktop" className={styles['main-block']}>
			<Slider {...sliderSettings} className={styles['slider-container']}>
				{renderCards}
			</Slider>
		</div>
	);
};
