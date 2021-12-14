import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Leaderboard = React.lazy(() => import('../pages/Leaderboard'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));

function PageRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <React.Suspense fallback={<>...</>}>
                        <Leaderboard />
                    </React.Suspense>
                } />
            <Route
                path="/dashboard"
                element={
                    <React.Suspense fallback={<>...</>}>
                        <Dashboard />
                    </React.Suspense>
                }>
            </Route>
        </Routes>
    )
}

export default PageRoutes;