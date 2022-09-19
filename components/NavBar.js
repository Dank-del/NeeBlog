import { Navbar, Link, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";


const NavBar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const handlelogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    }
    useEffect(() => {
        // console.log(localStorage.getItem('token'));
        if (localStorage.getItem('token') !== null) {
            setLoggedIn(true);
        }
    }, [])
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
                        !loggedIn &&
                        <Navbar.Link color="inherit" href="/login">
                            Login
                        </Navbar.Link>
                    }
                    {loggedIn && <Navbar.Link href="/create">Post</Navbar.Link>}
                    {loggedIn && <Navbar.Link onPress={handlelogout}>Logout</Navbar.Link>}
                </Navbar.Content>
            </Navbar>
        </div>
    );
}

export default NavBar;