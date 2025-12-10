import { DragEvent, RefObject, useCallback, useState } from 'react';

export function useDragAndDrop(uploaderRef: RefObject<HTMLInputElement>) {
	const [isDragActive, setIsDragActive] = useState<boolean>(false);

	const onDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragActive(false);
	}, []);

	const onDragOverAndEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragActive(true);
	}, []);

	const handleUploader = useCallback(() => {
		if (uploaderRef.current) {
			uploaderRef.current.click();
		}
	}, [uploaderRef]);

	const handleIsDragActive = useCallback((isActive: boolean) => {
		setIsDragActive(isActive);
	}, []);

	return {
		isDragActive,
		onDragLeave,
		handleUploader,
		onDragOverAndEnter,
		handleIsDragActive,
	};
}
