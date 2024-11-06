'use client'
import { useState, useEffect } from "react";
import { InputForm } from "@/components/InputForm";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import Link from "next/link";
// Fetch posts from the API
async function fetchPosts() {
  const response = await fetch('/api/post');
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error('Failed to fetch posts');
}

export default function Home() {
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts on mount
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getPosts(); // Fetch posts initially
  }, []); // Empty dependency array means this runs once on component mount

  // Callback to refresh posts after creation
  const onPostCreated = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data); // Update the posts state with the new list
    } catch (error) {
      console.error("Failed to refresh posts after creation", error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`/api/post/delete/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId)); // Remove the deleted post from state
      } else {
        console.log('Failed to delete post');
      }
    } catch (error) {
      console.log('Error deleting post:', error);
    }
  };

  return (
    <div className="p-24">
      

      <div className="flex flex-row items-center gap-5">
     <h1 className="text-4xl">Posts</h1><Link href="/post/create">
     <Button variant="outline">Create New</Button></Link>
     </div>

      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="flex flex-wrap gap-8 items-center py-5">
        {!loading && posts.length === 0 ? (
          <p>No posts available</p> 
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="p-8">
            <Link href={"/post/"+post.id}>  <h1 className="text-2xl font-bold">{post.title}</h1></Link>
              <p>{post.content}</p>
             
                <Button className="my-6" onClick={() => deletePost(post.id)}>
                  Delete
          </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
