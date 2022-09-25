import { Text, Card, Grid, Button } from '@nextui-org/react';
import NavBar from '../../components/NavBar'
import ReactMarkdown from 'react-markdown'
import { styled } from "@nextui-org/react"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const Box = styled("div", {
    boxSizing: "border-box",
});

export async function getServerSideProps(context) {
    const res = await fetch(`${process.env.API_ENDPOINT}/posts/${context.params.pid}`);
    try {
        const post = await res.json();
        return {
            props: { post }, // will be passed to the page component as props
        }
    }
    catch (err) {
        console.log(err);
        return { props: { post: null } }
    }
}

const Post = ({ post }) => {
    const router = useRouter();

    // const [loggedIn, setLoggedIn] = useState(false);

    const deletePost = async () => {
        const res = await fetch(`${process.env.API_ENDPOINT}/deletepost`, {
            method: 'POST',
            body: JSON.stringify({ _id: post._id, token: localStorage.getItem('token') }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        try {
            const data = await res.json();
            console.log(data);
            alert('Post deleted successfully');
        }
        catch (err) {
            console.log(err);
            alert('Error deleting post');
        }
        router.push('/');
    }

    const [boxdiv, setBoxdiv] = useState(null);
    useEffect(() => {
        // alert(JSON.stringify(process.env))
        const show_delete_button = false;
        if (localStorage.getItem('token') !== null) {
            show_delete_button = true;
        }
        setBoxdiv(
            <Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
                <Grid.Container gap={2} justify="center">
                    <Grid xs={12} sm={4}>
                        <Card>
                            <Card.Image
                                src={post.image}
                                objectFit="contain"
                                // width="100%"
                                // height={340}
                                alt="Card image background"
                            />
                        </Card>
                    </Grid>
                    <Grid xs={12} sm={4}>
                        <div>
                            <Text h2>{post.title}</Text>
                            <Text h4>{post.titleSub}</Text>
                            {show_delete_button && <Button onClick={deletePost} size="xs" color="error">Delete</Button>}
                            <Text size="$lg">
                                <ReactMarkdown>
                                    {post.content}
                                </ReactMarkdown>
                            </Text>
                        </div>
                    </Grid>
                </Grid.Container>
            </Box>
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post])

    return (
        <div>
            <NavBar />
            {post &&
                boxdiv}
        </div>
    )
}

export default Post