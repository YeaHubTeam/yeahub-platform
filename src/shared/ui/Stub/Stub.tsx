import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import AccessDeniedImg from '@/shared/assets/images/accessDenied.png';
import EmptyImg from '@/shared/assets/images/empty.png';
import LoadError from '@/shared/assets/images/loadError.png';
import SearchImg from '@/shared/assets/images/searchPage.png';
import { i18Namespace, Translation } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { stubTestIds } from '@/shared/ui/Stub/constants';
import { Text } from '@/shared/ui/Text';

import styles from './Stub.module.css';

export type StubType =
	| 'empty'
	| 'filter-empty'
	| 'error'
	| 'access-denied'
	| 'access-denied-verify'
	| 'access-denied-subscription';

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
		empty: t(Translation.STUB_EMPTY_TITLE),
		'filter-empty': t(Translation.STUB_FILTER_TITLE),
		'access-denied': t(Translation.STUB_ACCESS_DENIED_DEFAULT_TITLE),
		'access-denied-verify': t(Translation.STUB_ACCESS_DENIED_VERIFY_TITLE),
		'access-denied-subscription': t(Translation.STUB_ACCESS_DENIED_SUBSCRIPTION_TITLE),
	};

	const subtitleByType: Record<StubType, string> = {
		error: t(Translation.STUB_ERROR_SUBTITLE),
		empty: t(Translation.STUB_EMPTY_SUBTITLE),
		'filter-empty': t(Translation.STUB_FILTER_SUBTITLE),
		'access-denied': t(Translation.STUB_ACCESS_DENIED_DEFAULT_DESCRIPTION),
		'access-denied-verify': t(Translation.STUB_ACCESS_DENIED_VERIFY_DESCRIPTION),
		'access-denied-subscription': t(Translation.STUB_ACCESS_DENIED_SUBSCRIPTION_DESCRIPTION),
	};

	const buttonTextByType: Record<StubType, string> = {
		error: t(Translation.STUB_ERROR_SUBMIT),
		empty: '',
		'filter-empty': t(Translation.STUB_FILTER_SUBMIT),
		'access-denied': t(Translation.STUB_ACCESS_DENIED_DEFAULT_BUTTON),
		'access-denied-verify': t(Translation.STUB_ACCESS_DENIED_VERIFY_BUTTON),
		'access-denied-subscription': t(Translation.STUB_ACCESS_DENIED_SUBSCRIPTION_BUTTON),
	};

	const imgByType: Record<StubType, string> = {
		empty: EmptyImg,
		error: LoadError,
		'filter-empty': SearchImg,
		'access-denied': AccessDeniedImg,
		'access-denied-verify': AccessDeniedImg,
		'access-denied-subscription': AccessDeniedImg,
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
