import NavBar from "./NavBar";
import { Fragment } from "react";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <Fragment>
            <NavBar />
            <main>{children}</main>
            <Footer />
        </Fragment>
    )
}