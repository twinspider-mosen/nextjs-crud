'use client'
import { InputForm } from "@/components/InputForm";
import { useEffect, useState } from "react";

// Simulated fetching of a post for editing
async function fetchPost(id) {
  const response = await fetch(`/api/post/${id}`);
  const data = await response.json();
  return data;
}

export default function EditPostPage({ postId }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      const fetchedPost = await fetchPost(postId);
      setPost(fetchedPost);
    };

    loadPost();
  }, [postId]);

  const handlePostUpdated = () => {
    // Trigger re-fetching or refresh of posts
    console.log("Post updated successfully!");
  };

  if (!post) return <p>Loading post...</p>;

  return (
    <div>
      <h1>Edit Post</h1>
      <InputForm
        postId={post.id}
        existingTitle={post.title}
        existingContent={post.content}
        onPostCreated={handlePostUpdated}
        isEdit={true}
      />
    </div>
  );
}
