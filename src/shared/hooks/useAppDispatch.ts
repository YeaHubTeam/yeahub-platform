import { useDispatch } from 'react-redux';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { createReduxStore } from '@/app/providers/store';

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
