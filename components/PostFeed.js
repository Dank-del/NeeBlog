import React from 'react';
import { Grid } from '@nextui-org/react';
import PostCard from './PostCard';

const PostFeed = ({ posts }) => {
    return (
        <React.Fragment>
            <Grid.Container gap={2} justify="center">
                {posts && posts.map((post) => {
                    return (
                        <PostCard key={post._id} image={post.image} titleSub={post.titleSub} title={post.title} id={post._id} />
                    );
                })}
                {/* <PostCard image="https://nextui.org/images/card-example-4.jpeg" titleSub="What to watch" title="Stream the Acme event" />
                <PostCard image="https://nextui.org/images/card-example-3.jpeg" titleSub="Plant a tree" title="Contribute to the planet" /> */}
            </Grid.Container>
        </React.Fragment>
    );
}


export default PostFeed;