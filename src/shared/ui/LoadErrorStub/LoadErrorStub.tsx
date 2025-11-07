import React from 'react';

import LoadError from '@/shared/assets/images/LoadError.png';
import { useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './LoadErrorStub.module.css';

type LoadErrorStubProps = {
	title: string;
	subTitle: string;
	retryLabel: string;
	onRetry: () => void;
};

export const LoadErrorStub = ({ title, subTitle, retryLabel, onRetry }: LoadErrorStubProps) => {
	const isMobile = useScreenSize();

	const titleVariant = isMobile ? 'body3-strong' : 'body4';

	return (
		<Card withOutsideShadow className={styles.wrapper}>
			<Card withOutsideShadow>
				<Flex gap="20" justify="between" align="center" direction="column">
					<img src={LoadError} alt="load error" className={styles.img} />
					<Flex gap="6" align={'center'} direction={'column'}>
						<Text variant={titleVariant} className={styles.title}>
							{title}
						</Text>
						<Text variant={'body3'}>{subTitle}</Text>
					</Flex>
					<Button className={styles.button} size="large" variant="primary" onClick={onRetry}>
						{retryLabel}
					</Button>
				</Flex>
			</Card>
		</Card>
	);
};
