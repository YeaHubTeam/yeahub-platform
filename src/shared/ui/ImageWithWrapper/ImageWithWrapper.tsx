import { FC } from 'react';

import styles from './ImageWithWrapper.module.css';

interface ImageWithWrapperProps {
	width?: string;
	height?: string;
	src?: string;
	alt?: string;
}

export const ImageWithWrapper: FC<ImageWithWrapperProps> = ({ width, height, src, alt = '' }) => {
	return (
		<div className={styles.wrapper} style={width && height ? { width, height } : undefined}>
			{src ? <img className={styles.image} src={src} alt={alt} /> : null}
		</div>
	);
};
