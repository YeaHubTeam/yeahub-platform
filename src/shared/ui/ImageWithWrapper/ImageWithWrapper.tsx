import classNames from 'classnames';
import { useState } from 'react';

import EmptyStub from '@/shared/assets/icons/EmptyStub.svg';
import ErrorStub from '@/shared/assets/icons/ErrorStub.svg';

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

	let imageToRender;

	if (!src) {
		imageToRender = <EmptyStub className={styles.svg} />;
	} else if (isError) {
		imageToRender = <ErrorStub className={styles.svg} />;
	} else {
		imageToRender = (
			<img className={styles.image} src={src} alt={alt} loading="lazy" onError={handleError} />
		);
	}

	return <div className={classNames(styles.wrapper, className)}>{imageToRender}</div>;
};
