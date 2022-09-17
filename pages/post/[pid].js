import { Text, Image, Card, Grid, Row, Button } from '@nextui-org/react';
import NavBar from '../../components/NavBar'
import ReactMarkdown from 'react-markdown'
import { styled } from "@nextui-org/react"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const Box = styled("div", {
    boxSizing: "border-box",
});

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3000/api/posts/${context.params.pid}`);
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

    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setLoggedIn(true);
        }
    }, [])

    const deletePost = async () => {
        const res = await fetch(`http://localhost:3000/api/deletepost`, {
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
        setBoxdiv(
            <Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
                <Grid.Container gap={2} justify="center">
                    <Grid xs={12} sm={4}>
                        <Card>
                            <Card.Image
                                src={post.image}
                                objectFit="inherit"
                                width="100%"
                                height={340}
                                alt="Card image background"
                            />
                        </Card>
                    </Grid>
                    <Grid xs={12} sm={4}>
                        <div>
                            <Text h2>{post.title}</Text>
                            <Text h4>{post.titleSub}</Text>
                            {loggedIn && <Button onClick={deletePost} size="xs" color="error">Delete</Button>}
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