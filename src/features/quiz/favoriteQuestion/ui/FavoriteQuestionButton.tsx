import { type Placement } from '@floating-ui/react';
import classNames from 'classnames';
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
	const onToggleFavoriteQuestion = () => {
		isFavorite
			? resetFavoriteQuestion({
					profileId: String(profileId),
					questionId: Number(questionId),
				})
			: favoriteQuestion({
					profileId: String(profileId),
					questionId: Number(questionId),
				});
	};

	const iconSize = isPopover ? 20 : 24;

	return (
		<Tooltip
			title={isFavorite ? t(Questions.TOOLTIP_FAVORITE_DELETE) : t(Questions.TOOLTIP_FAVORITE_ADD)}
			placement={placementTooltip}
			color="violet"
			offsetTooltip={offsetTooltip}
			shouldShowTooltip={true}
		>
			<Button
				className={classNames({ [styles.button]: isPopover }, { [styles.red]: isFavorite })}
				preffix={
					!isFavorite ? (
						<Icon icon="favorite" color="black-600" size={iconSize} />
					) : (
						<Icon icon="favoriteRed" color="red-800" size={iconSize} />
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
