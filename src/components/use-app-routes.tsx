import { getAuthorizationStatus } from '../Store';
import { useAppSelector } from '../hooks';
import { Routes } from '../const';
import PageLayout from './Layout/layout-page';
import MainScreen from './main-screen';

import MainRouteRedirection from './redirection-main-route';
import PrivateRouteRoute from './priv-route';
import FavoritesScreen from './fav-screen';
import OfferScreen from './OfferScreen/offer';
import LoginScreen from './login';
import ErrorScreen from './error';

function useAppRoutes() {
  const userAuthorizationStatus = useAppSelector(getAuthorizationStatus);

  const routes = [
    {
      path: Routes.Main,
      element: <MainScreen />,
      layout: <PageLayout isHeaderActiveLogo={false} />,
    },
    {
      path: Routes.Login,
      element: (
        <MainRouteRedirection authorizationStatus={userAuthorizationStatus}>
          <LoginScreen />
        </MainRouteRedirection>
      ),
      layout: <PageLayout isHeaderUserNavigation={false} />,
    },
    {
      path: Routes.Favorites,
      element: (
        <PrivateRouteRoute userAuthorizationStatus={userAuthorizationStatus}>
          <FavoritesScreen />
        </PrivateRouteRoute>
      ),
      layout: <PageLayout isFooterShow />,
    },
    {
      path: Routes.Offer,
      element: <OfferScreen />,
      layout: <PageLayout isFooterShow />,
    },
    {
      path: Routes.NotFound,
      element: (
        <PageLayout isFooterShow>
          <ErrorScreen />
        </PageLayout>
      ),
    },
  ];

  return { routes };
}

export default useAppRoutes;
