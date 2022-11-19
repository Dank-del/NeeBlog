import NavBar from "./NavBar";
import { Fragment } from "react";
import Footer from "./Footer";
import { AuthContext } from "../helpers/context";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export default function Layout({ children }) {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // console.log(localStorage.getItem('token'));
        if (getCookie('token') !== undefined) {
            setLoggedIn(true);
        }
    }, [])

    return (
        <Fragment>
            <AuthContext.Provider value={
                {
                    loggedIn: loggedIn,
                    setLoggedIn: setLoggedIn,
                    // handlelogout: handlelogout
                }}>
                <NavBar />
            </AuthContext.Provider>
            <main>{children}</main>
            <Footer />
        </Fragment>
    )
}