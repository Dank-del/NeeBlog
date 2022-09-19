import PostFeed from '../components/PostFeed';
import Navbar from '../components/NavBar';

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_ENDPOINT}/posts`);
  const posts = await res.json();
  // console.log(posts);
  return {
      props: { posts }, // will be passed to the page component as props
  }
}

export default function Home({ posts }) {
  return (
    <div>
      <Navbar />
      {/* <Grid.Container gap={2} justify="center">
        <PostCard image="https://nextui.org/images/card-example-4.jpeg" titleSub="What to watch" title="Stream the Acme event" />
        <PostCard image="https://nextui.org/images/card-example-3.jpeg" titleSub="Plant a tree" title="Contribute to the planet" />
      </Grid.Container> */}
      <PostFeed posts={posts}/>
    </div>
  )
}
