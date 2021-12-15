import React from 'react';
import PageContainer from '../components/pageContainer/pageContainer';
import Header from '../components/header/header';
import DashboardPage from '../components/dashboard/dashboard';

const Dashboard = () => {
    return (
        <PageContainer>
            <Header />
            <DashboardPage />
        </PageContainer>
    )
}

export default Dashboard;