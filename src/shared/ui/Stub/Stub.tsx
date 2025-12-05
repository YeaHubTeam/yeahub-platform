import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import LoadError from '@/shared/assets/images/LoadError.png';
import SearchImg from '@/shared/assets/images/SearchPage.png';
import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './Stub.module.css';

type StubType = 'empty' | 'error' | 'emptyResources';

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

	const titleByType: Record<StubType, string> = {
		error: t(Translation.STUB_ERROR_TITLE),
		empty: '',
		emptyResources: t(Translation.STUB_EMPTY_RESOURCES_TITLE),
	};

	const subtitleByType: Record<StubType, string> = {
		error: t(Translation.STUB_ERROR_SUBTITLE),
		empty: '',
		emptyResources: t(Translation.STUB_EMPTY_RESOURCES_SUBTITLE),
	};

	const buttonTextByType: Record<StubType, string> = {
		error: t(Translation.STUB_ERROR_SUBMIT),
		empty: '',
		emptyResources: t(Translation.STUB_EMPTY_RESOURCES_SUBMIT),
	};

	const imgByType: Record<StubType, string> = {
		empty: SearchImg,
		error: LoadError,
		emptyResources: SearchImg,
	};

	const resolvedTitle = title ?? titleByType[type];
	const resolvedSubtitle = subtitle ?? subtitleByType[type];
	const resolvedButtonText = buttonText ?? buttonTextByType[type];

	return (
		<Card withOutsideShadow className={classNames(styles.wrapper, className)}>
			<Flex gap="20" justify="between" align="center" direction="column">
				<img src={imgByType[type]} alt="" loading="lazy" className={styles.img} />

				{(resolvedTitle || resolvedSubtitle) && (
					<Flex gap="6" align="center" direction="column">
						{Boolean(resolvedTitle) && <Text variant={titleVariant}>{resolvedTitle}</Text>}
						{Boolean(resolvedSubtitle) && <Text variant="body3">{resolvedSubtitle}</Text>}
					</Flex>
				)}

				{Boolean(resolvedButtonText) && (
					<Button
						size="large"
						variant="primary"
						onClick={onClick}
						disabled={!onClick}
						className={styles.button}
					>
						{resolvedButtonText}
					</Button>
				)}
			</Flex>
		</Card>
	);
};
