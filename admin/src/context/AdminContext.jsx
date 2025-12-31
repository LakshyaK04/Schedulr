import { createContext, useEffect, useState } from 'react';
import axios from 'axios'

export const AdminContext = createContext({});

const AdminContextProvider = (props) => {
    const [atoken, setAtoken] = useState(localStorage.getItem('atoken') ? localStorage.getItem('atoken') : '');

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    // ensure axios baseURL is set from env
    useEffect(() => {
        if (backendUrl) axios.defaults.baseURL = backendUrl.replace(/\/$/, '')
    }, [backendUrl])

    // persist token and attach it to axios headers
    useEffect(() => {
        console.log('AdminContext atoken changed:', atoken)
        if (atoken) {
            localStorage.setItem('atoken', atoken)
            axios.defaults.headers.common['atoken'] = atoken
        } else {
            localStorage.removeItem('atoken')
            delete axios.defaults.headers.common['atoken']
        }
    }, [atoken])

    const value = {
        atoken,
        setAtoken,
        backendUrl,
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider; 