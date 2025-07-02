import { type Placement } from '@floating-ui/react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Tooltip } from '@/shared/ui/Tooltip';

import { getIsEmailVerified, getProfileId } from '@/entities/profile';

import {
	useAddFavoriteQuestionMutation,
	useResetFavoriteQuestionMutation,
} from '../api/favoriteQuestionApi';

import styles from './FavoriteQuestionButton.module.css';

export interface FavoriteQuestionProps {
	questionId: number | string;
	isPopover?: boolean;
	variant?: 'tertiary' | 'link-gray';
	placementTooltip?: Placement;
	offsetTooltip?: number;
	isFavorite?: boolean;
	size?: 'small' | 'medium';
}

export const FavoriteQuestionButton = ({
	questionId,
	isPopover = false,
	variant = 'tertiary',
	placementTooltip = 'top',
	offsetTooltip = 10,
	isFavorite,
	size = 'medium',
}: FavoriteQuestionProps) => {
	const profileId = useAppSelector(getProfileId);
	const isEmailVerified = useAppSelector(getIsEmailVerified);

	const [favoriteQuestion, favoriteState] = useAddFavoriteQuestionMutation();
	const [resetFavoriteQuestion, resetState] = useResetFavoriteQuestionMutation();

	const { t } = useTranslation(i18Namespace.questions);

	const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

	useEffect(() => {
		setIsFavoriteState(isFavorite);
	}, [isFavorite]);

	const onToggleFavoriteQuestion = () => {
		const action = isFavoriteState ? resetFavoriteQuestion : favoriteQuestion;
		action({
			profileId: String(profileId),
			questionId: Number(questionId),
		});
		setIsFavoriteState((prev) => !prev);
	};

	const iconSize = isPopover ? 20 : 24;

	return (
		<Tooltip
			title={
				isFavoriteState ? t(Questions.TOOLTIP_FAVORITE_DELETE) : t(Questions.TOOLTIP_FAVORITE_ADD)
			}
			placement={placementTooltip}
			color="violet"
			offsetTooltip={offsetTooltip}
			shouldShowTooltip={true}
		>
			<Button
				className={classNames({ [styles.button]: isPopover }, { [styles.red]: isFavoriteState })}
				preffix={
					isFavoriteState ? (
						<Icon icon="favoriteRed" color="red-800" size={iconSize} />
					) : (
						<Icon icon="favorite" color="black-600" size={iconSize} />
					)
				}
				variant={variant}
				onClick={onToggleFavoriteQuestion}
				disabled={resetState.isLoading || favoriteState.isLoading || !isEmailVerified}
			>
				{size === 'medium' && t(Questions.FAVORITE)}
			</Button>
		</Tooltip>
	);
};
