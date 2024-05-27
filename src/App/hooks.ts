import { useEffect } from 'react';

import { fetchFavouritesAction, getAuthCheckedStatus } from '../Store';

import { useAppDispatch, useAppSelector } from '../hooks';

const useFetchFavorites = () => {
  const dispatch = useAppDispatch();
  const authCheckedStatus = useAppSelector(getAuthCheckedStatus);

  useEffect(() => {
    if (authCheckedStatus) {
      dispatch(fetchFavouritesAction());
    }
  }, [dispatch, authCheckedStatus]);
};

export { useFetchFavorites };
