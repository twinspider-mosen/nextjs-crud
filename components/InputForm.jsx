'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { useState, useEffect } from "react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

// Define the validation schema for the form
const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  }),
});

export function InputForm({
  postId,             // Used for editing
  existingTitle = "", // Used to pre-fill form for editing
  existingContent = "", // Used to pre-fill form for editing
  onPostCreated,      // Callback after creating or editing a post
  isEdit = false,     // Flag to determine whether it's for editing or creating a post
}) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: existingTitle,
      content: existingContent,
    },
  });

    const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form submit handler
  async function onSubmit(data) {
    setIsSubmitting(true); // Set submitting state
    try {
      // Check if it's an edit or create operation
      const endpoint = isEdit
        ? `/api/post/edit/${postId}`  // Use postId if editing
        : "/api/post/create";         // Use create endpoint if creating

      const response = await fetch(endpoint, {
        method: isEdit ? "PUT" : "POST", // Use PUT for editing and POST for creating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check if the response is ok
      if (!response.ok) {
        throw new Error(isEdit ? 'Failed to update post' : 'Failed to create post');
      }

      const post = await response.json();

      // Show success toast
      toast({
        title: isEdit ? "Post updated successfully!" : "Post created successfully!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(post, null, 2)}</code>
          </pre>
        ),
      });

      // Trigger the parent callback to refresh the posts
      onPostCreated();
      revalidatePath('/')
      revalidatePath('/post')
     
      
      // Reset form values after successful submission
      form.reset();

    } catch (error) {
      // Show error toast
      toast({
        title: isEdit ? "Error updating post" : "Error creating post",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false); // Reset the submitting state
      router.push("/")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Post title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Post content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : isEdit ? 'Update Post' : 'Create Post'}
        </Button>
      </form>
    </Form>
  );
}
