import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Translation } from '@/shared/config';

import { AvatarWithoutPhoto } from '../AvatarWithoutPhoto';

import styles from './Avatar.module.css';

interface AvatarProps {
	image?: string;
	size?: number;
	className?: string;
	borderRadius?: number;
	withBorder?: boolean;
}

export const Avatar = ({
	image,
	size = 50,
	borderRadius = 25,
	withBorder = false,
	className,
	...props
}: AvatarProps) => {
	const { t } = useTranslation();
	return (
		<div
			className={classNames(styles.wrapper, { [styles.border]: withBorder }, className)}
			style={{ width: size, height: size, borderRadius: borderRadius }}
			{...props}
		>
			{image ? (
				<img className={styles.image} src={image} alt={t(Translation.AVATAR)} />
			) : (
				<AvatarWithoutPhoto />
			)}
		</div>
	);
};
