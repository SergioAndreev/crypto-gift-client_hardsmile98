import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes as RactRoutes } from 'react-router-dom';
import { BottomNavigation, Layout, LoadingPage } from './components';

const Gifts = lazy(() => import('@/pages/Gifts'));
const Leaderboard = lazy(() => import('@/pages/Leaderboard'));
const Profile = lazy(() => import('@/pages/Profile'));
const Store = lazy(() => import('@/pages/Store'));
const GiftDetail = lazy(() => import('@/pages/GiftDetail'));
const ProfileHistory = lazy(() => import('@/pages/ProfileHistory'));
const GiftOrder = lazy(() => import('@/pages/GiftOrder'));

function Routes() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RactRoutes>
        <Route
          path='store'
          element={
            <Layout bottomBar={<BottomNavigation />}>
              <Store />
            </Layout>
          }
        />

        <Route
          path='gifts'
          element={
            <Layout bottomBar={<BottomNavigation />}>
              <Gifts />
            </Layout>
          }
        />

        <Route
          path='leaderboard'
          element={
            <Layout bottomBar={<BottomNavigation />}>
              <Leaderboard />
            </Layout>
          }
        />

        <Route
          path='leaderboard/:id'
          element={
            <Layout bottomBar={<BottomNavigation />}>
              <Profile />
            </Layout>
          }
        />

        <Route
          path='profile'
          element={
            <Layout bottomBar={<BottomNavigation />}>
              <Profile />
            </Layout>
          }
        />

        <Route
          path='gift/:id'
          element={
            <Layout>
              <GiftDetail />
            </Layout>
          }
        />

        <Route
          path='profile/history'
          element={
            <Layout>
              <ProfileHistory />
            </Layout>
          }
        />

        <Route
          path='order/:id'
          element={
            <Layout>
              <GiftOrder />
            </Layout>
          }
        />

        <Route path='*' element={<Navigate to='/store' />} />
      </RactRoutes>
    </Suspense>
  );
}

export default Routes;
