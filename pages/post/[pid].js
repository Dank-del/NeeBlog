import { Text, Card, Grid, Button, Container, Row, Spacer } from '@nextui-org/react';
import ReactMarkdown from 'react-markdown'
import { styled } from "@nextui-org/react"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import Head from 'next/head';
import { useContext } from 'react';
import { AuthContext } from '../../helpers/context';
import { Posts } from '../../database/models';

export const Box = styled("div", {
    boxSizing: "border-box",
});

export async function getServerSideProps(context) {
    // console.log(context);
    try {
        const p = await Posts.findOne({ _id: context.params.pid });
        return {
            props: {
                post: {
                    title: p.title,
                    titleSub: p.titleSub,
                    content: p.content,
                    image: p.image,
                    _id: context.params.pid
                }
            }, // will be passed to the page component as props
        }
    }
    catch (err) {
        console.log(err);
        return { props: { post: null } }
    }
}

const Post = ({ post }) => {
    const router = useRouter();

    const auth = useContext(AuthContext);

    const deletePost = async () => {
        const conf = confirm('Are you sure you want to delete this post?');
        if (!conf) {
            return;
        }
        const res = await fetch(`/api/deletepost`, {
            method: 'POST',
            body: JSON.stringify({ _id: post._id, token: getCookie('token') }),
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
        console.log(auth);

        // alert(JSON.stringify(process.env))
        const show_delete_button = false;
        if (getCookie('token') !== undefined) {
            show_delete_button = true;
        }
        setBoxdiv(
            <Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
                <Grid.Container gap={2} justify="center">
                    <Grid style={{
                        height: "fit-content",
                    }} xs={12} sm={4}>
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
                    <Grid style={{
                        display: "flex",
                        justifyContent: "center",

                    }} xs={12} sm={4}>
                        <div>
                            <div style={{
                                textAlign: "center",
                            }}>
                                <Text h2>{post.title}</Text>
                                <Text h4>{post.titleSub}</Text>
                            </div>
                            <Container>
                                <Row style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}>
                                    {show_delete_button && <Button onPress={deletePost} size="sm" style={{ backgroundColor: "red" }}>Delete</Button>}
                                    <Spacer z={0.5} />
                                    {show_delete_button && <Button onPress={
                                        () => router.push(`/edit/${post._id}`)
                                    } size="sm" style={{ backgroundColor: "green" }}>Edit</Button>}
                                </Row>
                            </Container>
                            <Text style={{
                                marginLeft: "5px",
                                marginRight: "5px",
                            }} size="$lg">
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
            <Head>
                <title>{post.title}</title>
            </Head>
            {post &&
                boxdiv}
        </div>
    )
}

export default Post