import PostFeed from '../components/PostFeed';
import Head from "next/head";
import { useState } from 'react';
import { useEffect } from 'react';

export default function Home() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    fetch(`/api/posts`).then(res => res.json()).then(data => setPosts(data));
  }, [])
  return (
    <div>
      <Head>
        <title>سيتّا هارو</title>
        {/* add author and site description in meta */}
        <meta name="description" content="A blog site of CettaHaru" />
        <meta name="author" content="Sayan Biswas" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <PostFeed posts={posts}/>
    </div>
  )
}
