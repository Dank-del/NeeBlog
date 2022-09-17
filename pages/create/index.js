import NavBar from "../../components/NavBar";
import { Grid, Input, Textarea, Spacer, Button } from "@nextui-org/react";
import { useState } from "react";

const CreatePost = () => {
    const [imageBase64, setImageBase64] = useState("");

    function convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            // Typescript users: use following line
            // reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
        });
    }

    function openDialog() {
        document.getElementById('imageId').click();
    }

    const handleImageChange = async (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length) {
            try {
                const uploadedImageBase64 = await convertFileToBase64(e.target.files[0]);
                setImageBase64(uploadedImageBase64);
                console.log(uploadedImageBase64);
                //do something with above data string 
            } catch (err) {
                //handle error
                console.log(err);
            }
        }
    }

    return (
        <div>
            <NavBar />
            <div style={{ padding: '9px' }}>
                <Grid.Container gap={4} style={{ "display": "flex", "justifyContent": "center", "padding": "50px 0" }}>
                    <Grid>
                        <Input labelPlaceholder="Title" />
                    </Grid>
                    <Grid>
                        <Input labelPlaceholder="Sub heading" />
                    </Grid>
                    <Grid>
                        <input onChange={handleImageChange} id='imageId' type='file' accept="image/*" hidden />
                        <Textarea labelPlaceholder="Content" />
                    </Grid>
                    <Grid>
                        <Button.Group>
                            <Button onPress={openDialog}>Upload Image</Button>
                            <Button>Post</Button>
                        </Button.Group>
                    </Grid>
                </Grid.Container>
            </div>
        </div>
    );
}

export default CreatePost;
