import { useState } from 'react';

export const useModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	const onToggle = () => {
		setIsOpen((prev) => !prev);
	};

	const onClose = () => {
		setIsOpen(false);
	};

	const onOpen = () => {
		setIsOpen(true);
	};

	return {
		isOpen,
		onClose,
		onToggle,
		onOpen,
	};
};
