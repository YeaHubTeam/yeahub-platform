import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import AccessDeniedImg from '@/shared/assets/images/AccessDenied.png';
import LoadError from '@/shared/assets/images/LoadError.png';
import FilterEmptyImg from '@/shared/assets/images/notFound.avif';
import SearchImg from '@/shared/assets/images/SearchPage.png';
import { i18Namespace } from '@/shared/config';
import { Translation } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './Stub.module.css';

type StubType = 'empty' | 'error' | 'access-denied' | 'filter-empty';

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
		'access-denied': t(Translation.ACCESS_DENIED_TITLE),
		'filter-empty': t(Translation.STUB_FILTER_TITLE),
	};

	const subtitleByType: Record<StubType, string> = {
		error: t(Translation.STUB_ERROR_SUBTITLE),
		empty: '',
		'access-denied': t(Translation.ACCESS_DENIED_DESCRIPTION),
		'filter-empty': t(Translation.STUB_FILTER_SUBTITLE),
	};

	const buttonTextByType: Record<StubType, string> = {
		error: t(Translation.STUB_ERROR_SUBMIT),
		empty: '',
		'access-denied': t(Translation.ACCESS_DENIED_BUTTON),
		'filter-empty': t(Translation.STUB_FILTER_SUBMIT),
	};

	const imgByType: Record<StubType, string> = {
		empty: SearchImg,
		error: LoadError,
		'access-denied': AccessDeniedImg,
		'filter-empty': FilterEmptyImg,
	};

	const resolvedTitle = title ?? titleByType[type];
	const resolvedSubtitle = subtitle ?? subtitleByType[type];
	const resolvedButtonText = buttonText ?? buttonTextByType[type];
	const resolvedButtonType = type === 'filter-empty' ? 'outline' : 'primary';

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
						variant={resolvedButtonType}
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
