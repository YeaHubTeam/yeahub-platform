import classNames from 'classnames';
import { useState } from 'react';

import EmptyStub from '@/shared/assets/icons/EmptyStub.svg';

import styles from './ImageWithWrapper.module.css';

export interface ImageWithWrapperProps {
	className?: string;
	src?: string | null;
	alt?: string;
}

export const ImageWithWrapper = ({ className, src, alt = '' }: ImageWithWrapperProps) => {
	const [isError, setIsError] = useState(false);

	const handleError = () => {
		setIsError(true);
	};

	const shouldShowImage = src && !isError;

	return (
		<div className={classNames(styles.wrapper, className)}>
			{shouldShowImage ? (
				<img className={styles.image} src={src} alt={alt} loading="lazy" onError={handleError} />
			) : (
				<EmptyStub className={styles.svg} />
			)}
		</div>
	);
};
