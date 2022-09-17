import NavBar from "../../components/NavBar";
import { Grid, Input, Textarea, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const CreatePost = () => {
    const router = useRouter();
    const [imageBase64, setImageBase64] = useState("");
    const [title, setTitle] = useState("");
    const [titleSub, setTitleSub] = useState("");
    const [content, setContent] = useState("");
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            router.replace('/login')
        }
    }, [])

    const handleClick = (e) => {
        if (imageBase64 == "" || title == "" || titleSub == "" || content == "") {
            alert('Please fill in all the fields');
        }
        else {
            const data = {
                image: imageBase64,
                title: title,
                subheading: titleSub,
                content: content
            }
            fetch('http://localhost:3000/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    alert('Post created successfully');
                    router.push('/post/' + data._id);
                })
                .catch(err => {
                    console.log(err);
                    alert('Error creating post');
                })
        }
    }

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
                        <Input onChange={(e) => setTitle(e.target.value)} labelPlaceholder="Title" />
                    </Grid>
                    <Grid>
                        <Input onChange={(e) => setTitleSub(e.target.value)} labelPlaceholder="Sub heading" />
                    </Grid>
                    <Grid>
                        <input onChange={handleImageChange} id='imageId' type='file' accept="image/*" hidden />
                        <Textarea onChange={(e) => setContent(e.target.value)} labelPlaceholder="Content" />
                    </Grid>
                    <Grid>
                        <Button.Group>
                            <Button onPress={openDialog}>Upload Image</Button>
                            <Button onPress={handleClick}>Post</Button>
                        </Button.Group>
                    </Grid>
                </Grid.Container>
            </div>
        </div>
    );
}

export default CreatePost;
