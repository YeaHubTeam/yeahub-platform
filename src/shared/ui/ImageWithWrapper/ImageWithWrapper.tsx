import { FC } from 'react';

import styles from './ImageWithWrapper.module.css';

interface ImageWithWrapperProps {
	className?: string;
	src?: string;
	alt?: string;
}

export const ImageWithWrapper: FC<ImageWithWrapperProps> = ({ className, src, alt = '' }) => {
	return (
		<div className={`${styles.wrapper} ${className}`}>
			{src ? <img className={styles.image} src={src} alt={alt} /> : null}
		</div>
	);
};
