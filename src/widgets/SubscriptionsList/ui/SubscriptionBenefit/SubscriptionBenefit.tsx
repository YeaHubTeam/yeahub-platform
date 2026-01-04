import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { SubscriptionInfoBenefit } from '../../libs/constants/benefitsConstants';

import styles from './SubscriptionBenefit.module.css';

interface SubscriptionBenefitProps {
	benefit: SubscriptionInfoBenefit;
}

export const SubscriptionBenefit = ({ benefit }: SubscriptionBenefitProps) => {
	const { t } = useTranslation(i18Namespace.subscription);

	return (
		<Flex align="center" gap="8">
			<Icon
				icon="sealCheckOutlined"
				size={20}
				color={benefit.isActive ? 'purple-700' : 'black-500'}
			/>
			<Text
				variant="body2"
				className={classNames({ [styles['crossed-out-text']]: !benefit.isActive })}
			>
				{t(benefit.title)}
			</Text>
		</Flex>
	);
};
