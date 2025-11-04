import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import avosBannerLogo from '@/widgets/Landing/AvosBanner/model/avosBannerLogo.png';

import styles from './AvosBanner.module.css';

export const AvosBanner = () => {
	const { isLaptop } = useScreenSize();
	return (
		<Flex direction="column" className={styles['avos-banner']}>
			<Text variant="body6" color={'black-30'} className={styles.temprorary}>
				Авось прорвёмся & YeaHub
			</Text>
			<Flex justify="between" className={styles.content}>
				<div className={styles.promo}>
					<Text variant={isLaptop ? 'head4' : 'head3'} color={'black-30'} className={styles.title}>
						Реальные собеседования + тренажёр = комплексная подготовка
					</Text>
					<Text variant="body6" color={'black-30'} className={styles.subtitle}>
						1000+ реальных собесов, зарплатные вилки, резюме и разборы — всё в одном месте
					</Text>
				</div>
				<img src={avosBannerLogo} alt="" className={styles.logo} />
			</Flex>
			<Text variant="body5" color={'black-30'} className={styles.info}>
				Все собеседования и вопросы собраны вместе с нашими партнёрами. Записи доступны в закрытых
				чатах.
			</Text>
		</Flex>
	);
};
