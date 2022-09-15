import NavBar from "../../components/NavBar";
import { Input, Spacer, Button } from "@nextui-org/react";

export default function Login() {
    return (
        <div>
            <NavBar />
            <div className="container">
            <h2 className="center" style={{paddingBottom: "10%"}}>Admin login</h2>
                <div className="center" style={{paddingTop: "70%"}}>
                    <Input size="md"
                        labelLeft="@"
                        labelPlaceholder=""
                    />
                    <Spacer y={1.6} />
                    <Input.Password labelPlaceholder="Password" />
                    <Spacer y={1.6} />
                    <Button>Log in</Button>
                </div>
            </div>
        </div>
    );
}
