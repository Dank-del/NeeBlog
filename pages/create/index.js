import { Input, Textarea, Button, Spacer } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import Head from "next/head";

const CreatePost = () => {
    const router = useRouter();
    const [imageBase64, setImageBase64] = useState("");
    const [title, setTitle] = useState("");
    const [titleSub, setTitleSub] = useState("");
    const [content, setContent] = useState("");
    useEffect(() => {
        console.log(getCookie('token'))
        if (getCookie('token') === undefined) {
            router.replace('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                content: content,
                token: getCookie('token')
            }
            fetch(`/api/create`, {
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
                // console.log(uploadedImageBase64);
                //do something with above data string 
            } catch (err) {
                //handle error
                console.log(err);
            }
        }
    }

    return (
        <div>
            <Head>
                <title>Create New Post</title>
            </Head>
            <div style={{ margin: '5px 3vw 2px 3vw', display: 'grid',  padding: '9px' }}>
                <Spacer y={0.7}></Spacer>
                <Input onChange={(e) => setTitle(e.target.value)} labelPlaceholder="Title" />
                <Spacer y={2}></Spacer>
                <Input onChange={(e) => setTitleSub(e.target.value)} labelPlaceholder="Sub heading" />
                <Spacer y={2}></Spacer>
                <Textarea onChange={(e) => setContent(e.target.value)} labelPlaceholder="Content" />
                <Spacer y={2}></Spacer>
                <div style={{ display: 'flex', direction: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <input onChange={handleImageChange} id='imageId' type='file' accept="image/*" hidden />
                    <Button.Group>
                        <Button onPress={openDialog}>Upload Image</Button>
                        <Button onPress={handleClick}>Post</Button>
                    </Button.Group>
                </div>
                {/* Done */}
            </div>
        </div>
    );
}

export default CreatePost;
