import { Navbar, Link, Text } from "@nextui-org/react";


const NavBar = () => {
    return (
        <div style={{"position":"sticky","top":"0px","zIndex":"1"}}>
            <Navbar isBordered variant='floating'>
                <Navbar.Brand>
                    <Link color="inherit" href="/">
                    <Text b color="inherit" size={30}>
                        سيتا هارو
                    </Text>
                    </Link>
                </Navbar.Brand>
                <Navbar.Content>
                    <Navbar.Link color="inherit" href="/login">
                        Login
                    </Navbar.Link>
                    <Navbar.Link href="#">About</Navbar.Link>
                </Navbar.Content>
            </Navbar>
        </div>
    );
}

export default NavBar;