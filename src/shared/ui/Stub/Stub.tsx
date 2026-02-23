import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import type { StubType } from '@/shared/ui/Stub/types';
import { Text } from '@/shared/ui/Text';

import { stubTestIds, titleByType, subtitleByType, buttonTextByType, imgByType } from './constants';
import styles from './Stub.module.css';

type StubProps = {
	type: StubType;
	title?: string;
	subtitle?: string;
	buttonText?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	className?: string;
};

export const Stub = ({ type, title, subtitle, buttonText, onClick, className }: StubProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const { isMobile } = useScreenSize();
	const titleVariant = isMobile ? 'body3-strong' : 'body4';

	const resolvedTitle = title ?? t(titleByType[type]);
	const resolvedSubtitle = subtitle ?? t(subtitleByType[type]);
	const resolvedButtonText = buttonText ?? t(buttonTextByType[type]);
	const resolvedButtonType = type === 'filter-empty' ? 'outline' : 'primary';

	return (
		<Card withOutsideShadow className={classNames(styles.wrapper, className)}>
			<Flex gap="20" justify="between" align="center" direction="column">
				<img src={imgByType[type]} alt="" loading="lazy" className={styles.img} />

				{(resolvedTitle || resolvedSubtitle) && (
					<Flex dataTestId={stubTestIds.container} gap="6" align="center" direction="column">
						{Boolean(resolvedTitle) && (
							<Text dataTestId={stubTestIds.title} variant={titleVariant}>
								{resolvedTitle}
							</Text>
						)}
						{Boolean(resolvedSubtitle) && (
							<Text dataTestId={stubTestIds.subtitle} variant="body3">
								{resolvedSubtitle}
							</Text>
						)}
					</Flex>
				)}

				{Boolean(resolvedButtonText) && (
					<Button
						size="large"
						variant={resolvedButtonType}
						onClick={onClick}
						disabled={!onClick}
						className={styles.button}
						dataTestId={stubTestIds.button}
					>
						{resolvedButtonText}
					</Button>
				)}
			</Flex>
		</Card>
	);
};
