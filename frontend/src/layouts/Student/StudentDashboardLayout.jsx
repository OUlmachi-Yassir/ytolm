import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, STUDENT_DASHBOARD_ROUTE } from '../../router';

import { useUserContext } from '../../context/UserContext';
import StudentApi from '../../services/Api/Student/StudentApi';
import { Button } from '../../components/ui/button';
import StudentDropDownMenu from './StudentDropDownMenu';




export default function StudentDashboardLayout() {
    const navigate = useNavigate();
    const [Itinerary, setItinerary] = useState([]);
    const { setUser, setAuthenticated, logout:ContextLogout,authenticated, user } = useUserContext();

    useEffect(() => {
        StudentApi.getUser().then(({ data }) => {
                setUser({ name: data.name, email: data.email });
                setAuthenticated(true);
                
            })
            .catch((reason) => {
                ContextLogout();
                navigate(LOGIN_ROUTE)
            });
    }, []);

 

    
    return <>
        <header>
        <nav className="bg-blue-200 shadow-md w-full px-8 md:px-auto">
    <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        
        <div className="text-gray-700 order-3 w-full md:w-auto md:order-2">
        <div className="text-yellow-500 md:order-1 flex items-center">
             <img src="data:image/png;base64,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"/>
                <span className="text-xl font-bold">OLM</span>
        </div>
            <ul className="flex font-semibold justify-between">
                <li className="md:px-4 md:py-2 text-[#EF4A81]">
                    <Link to={STUDENT_DASHBOARD_ROUTE}>Dashboard</Link>
                </li>
                <li className="md:px-4 md:py-2 hover:text-[#ffb703]">
                    <Link to={'/IteneraryForm'}>Create Itinerary</Link>
                </li>
            </ul>
        </div>
        <div className="order-2 md:order-3">
            <StudentDropDownMenu/>
        </div>
    </div>
</nav>

        </header >
       
       
        <Outlet className />
     

    </>
}

