import { Input, Spacer, Button } from "@nextui-org/react";
import react from "react";
import { setCookie } from 'cookies-next';
import Head from "next/head";
import { AuthContext } from "../../helpers/context";

export default function Login() {
    const [username, setUsername] = react.useState("");
    const [password, setPassword] = react.useState("");
    const auth = react.useContext(AuthContext);

    const handleClick = (e) => {
        // e.preventDefault();
        if (username == "" || password == "") {
            alert('Please enter your username and password');
        }
        else {
            const data = {
                username: username,
                password: password
            }
            fetch(`/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.token) {
                        // localStorage.setItem('token', data.token);
                        setCookie('token', data.token);
                        auth.setLoggedIn(true);
                        auth.user = data.user;
                        alert('Logged in successfully');
                        window.location.href = '/';
                        // router.push('/');
                    }
                    else {
                        alert('Invalid username or password');
                    }
                })
                .catch(err => {
                    console.log(err);
                    alert('Error logging in');
                })
        }
    }

    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <div className="container" style={{
                marginTop: "50px"
            }}>
                {/* <h3 className="center" style={{paddingBottom: "19%"}}>Admin login</h3> */}
                <div className="center">
                    <Input size="md"
                        labelRight="@"
                        labelPlaceholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Spacer y={1.6} />
                    <Input.Password labelPlaceholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <Spacer y={1.6} />
                    <Button style={{ width: '100%' }} onPress={(e) => handleClick(e)}>Log in</Button>
                </div>
            </div>
        </div>
    );
}
