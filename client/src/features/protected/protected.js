import React from 'react';
import { useLocation } from 'react-router-dom';
// COMPONENTS
import Undefined from '../undefined/undefined';
import Profile from '../user/profile'
import Signin from '../../apps/XyForms/Signin'

// FUNCTIONS

//import { authenticated } from '../../apps/XyForms/functions/users'

export default function Protected(props) {
    const routes = ['/profile', '/company/profile','/company/program' ];
    const location = useLocation();
    const index = routes.indexOf(location.pathname);
    const auth = localStorage.getItem('auth')

    if(!auth){
        if(index < 0){
            return(
                <Undefined route={location.pathname} />
            );
        }else{
            return(
                <div>
                    <Signin />
                </div>
            );
        }
    }else{
        // read param for route and view component
        // add routes: user-form, company-form, influencer-form, job-form, school-form, bootcamp-form, program-form 
        switch(location.pathname){
            case "/profile":
                return(
                    <div>
                        <Profile />
                    </div>
                );
            default:
                // if route not recognized go to login
                return(
                    <div>
                        <Undefined route={location.pathname} />
                    </div>
                );
        }
    }
};