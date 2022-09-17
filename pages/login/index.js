import NavBar from "../../components/NavBar";
import { Input, Spacer, Button } from "@nextui-org/react";
import react from "react";

export default function Login() {
    const [username, setUsername] = react.useState("");
    const [password, setPassword] = react.useState("");


    const handleClick = (e) => {
        // e.preventDefault();
        if (username == "" || password == "") {
            alert('Please enter your username and password');
        }
        // console.log(username, password);
    }

    return (
        <div>
            <NavBar />
            <div className="container">
                {/* <h3 className="center" style={{paddingBottom: "19%"}}>Admin login</h3> */}
                <div className="center" style={{ paddingTop: "30%" }}>
                    <Input size="md"
                        labelLeft="@"
                        labelPlaceholder=""
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Spacer y={1.6} />
                    <Input.Password labelPlaceholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <Spacer y={1.6} />
                    <Button onPress={(e) => handleClick(e)}>Log in</Button>
                </div>
            </div>
        </div>
    );
}
