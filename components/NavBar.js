import { Navbar, Link, Text } from "@nextui-org/react";
import { useContext } from "react";
import { deleteCookie } from 'cookies-next';
import { AuthContext } from "../helpers/context";

const NavBar = () => {
    const auth = useContext(AuthContext);
    const handlelogout = () => {
        deleteCookie('token');
        auth.setLoggedIn(false);
    }
    // console.log(auth);

    return (
        <div style={{ "position": "sticky", "top": "0px", "zIndex": "1" }}>
            <Navbar isBordered variant='floating'>
                <Navbar.Brand>
                    <Link color="inherit" href="/">
                        <Text b color="inherit" size={30}>
                            سيتّا هارو 
                        </Text>
                    </Link>
                </Navbar.Brand>
                <Navbar.Content>
                    {
                        !auth.loggedIn &&
                        <Navbar.Link color="inherit" href="/login">
                            Login
                        </Navbar.Link>
                    }
                    {auth.loggedIn && <Navbar.Link href="/create">Post</Navbar.Link>}
                    {auth.loggedIn && <Navbar.Link onPress={handlelogout}>Logout</Navbar.Link>}
                </Navbar.Content>
            </Navbar>
        </div>
    );
}

export default NavBar;