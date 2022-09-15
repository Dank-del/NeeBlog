import PostCard from '../components/PostCard';
import Navbar from '../components/NavBar';
import { Grid } from '@nextui-org/react';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Grid.Container gap={2} justify="center">
        <PostCard image="https://nextui.org/images/card-example-4.jpeg" titleSub="What to watch" title="Stream the Acme event" />
        <PostCard image="https://nextui.org/images/card-example-3.jpeg" titleSub="Plant a tree" title="Contribute to the planet" />
      </Grid.Container>
    </div>
  )
}
