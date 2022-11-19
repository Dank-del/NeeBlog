import { createContext } from "react";

export const AuthContext = createContext({
    loggedIn: false,
    setLoggedIn: () => { },
    user: null,
    // setUser: () => { },
    //handlelogout: () => { },
});