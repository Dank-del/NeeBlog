import { Navbar, Button, Link, Text } from "@nextui-org/react";


const NavBar = () => {
    return (
        <div>
            <Navbar isBordered variant='floating'>
                <Navbar.Brand>
                    <Text b color="inherit" size={30}>
                    مدونة جادي
                    </Text>
                </Navbar.Brand>
                <Navbar.Content>
                    <Navbar.Link href="#">Posts</Navbar.Link>
                    <Navbar.Link href="#">About</Navbar.Link>
                </Navbar.Content>
                <Navbar.Content>
                    <Navbar.Link color="inherit" href="#">
                        Login
                    </Navbar.Link>
                </Navbar.Content>
            </Navbar>
        </div>
    );
}

export default NavBar;