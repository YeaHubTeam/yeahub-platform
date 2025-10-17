import t from 'react-hot-toast';

import styles from './Toast.module.css';

export const CloseBtn = ({ toastId, dataTestId }: { toastId: string; dataTestId: string }) => (
	<button
		onClick={() => t.dismiss(toastId)}
		className={styles['close-btn']}
		data-testid={dataTestId}
	>
		<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1 1L9 9" stroke="#303030" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M9 1L1 9" stroke="#303030" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	</button>
);
