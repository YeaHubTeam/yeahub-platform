import { useDispatch } from 'react-redux';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { AppDispatch } from '@/app/providers/store/config/config';

export const useAppDispatch: () => AppDispatch = useDispatch;
