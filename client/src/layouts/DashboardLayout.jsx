import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';

const DashboardLayout = () => {
    return (
        <div className='relative min-h-screen md:flex'>
            {/* sidebar */}
            <div className=''>
                <Sidebar />
            </div>

            {/* outlet dynamic content */}
            <div className="flex-1 md:ml-64 border-l-2">
                <Outlet />
            </div>

        </div>
    );
};

DashboardLayout.propTypes = {

};

export default DashboardLayout;