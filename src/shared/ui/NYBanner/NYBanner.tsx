import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { nyDecorations, nyTree } from '@/shared/assets/images/ny';
import { i18Namespace, Translation } from '@/shared/config';
import { SELECT_TARIFF_SETTINGS_TAB, setToLS, useScreenSize } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './NYBanner.module.css';

interface NYBannerProps {
	isOpenBanner?: boolean;
	lsKey: string;
}

export const NYBanner = ({ isOpenBanner, lsKey }: NYBannerProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const navigate = useNavigate();
	const { isLargeScreen, isLaptop, isMobile } = useScreenSize();

	const [isOpen, setIsOpen] = useState(isOpenBanner);

	const onCloseBanner = () => {
		setIsOpen(false);
		setToLS(lsKey, false);
	};
	const onMoveToSubscriptions = () => navigate(SELECT_TARIFF_SETTINGS_TAB);

	if (!isOpen) {
		return null;
	}

	return (
		<Flex
			className={styles.banner}
			direction={isMobile ? 'column' : 'row'}
			justify="between"
			align={isMobile ? 'end' : 'center'}
		>
			<img className={styles['img-start']} src={nyTree} alt="" />
			<Text
				variant={isLargeScreen || isLaptop ? 'body6' : 'body5-accent'}
				className={styles.text}
				color="white-900"
			>
				{t(Translation.BANNER_NY_TEXT)}
			</Text>
			<Button
				className={styles.button}
				onClick={onMoveToSubscriptions}
				variant="destructive"
				size="large"
			>
				{t(Translation.BANNER_NY_BUTTON)}
			</Button>
			{(isLargeScreen || isLaptop) && (
				<img className={styles['img-end']} src={nyDecorations} alt="" />
			)}
			<Icon
				icon="closeCircle"
				type="button"
				className={styles.close}
				color={isMobile ? 'purple-700' : 'white-900'}
				onClick={onCloseBanner}
			/>
		</Flex>
	);
};
