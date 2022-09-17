import NavBar from "../../components/NavBar";
import { Grid, Input } from "@nextui-org/react";

const CreatePost = () => {
    return (
        <div>
            <NavBar/>
            <Grid.Container gap={4} style={{"display":"flex","justifyContent":"center","padding":"50px 0"}}>
                <Grid>
                     <Input placeholder="Title" />
                </Grid>
            </Grid.Container>
        </div>
    );
}
 
export default CreatePost;
