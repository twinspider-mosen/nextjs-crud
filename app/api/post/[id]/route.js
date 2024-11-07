
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 

export async function DELETE(req,{params} ) {

  // Await the params to ensure that it's resolved and accessible
  const resolvedParams = await params;

  // Now you can safely access the id
  const { id } = resolvedParams;

  try {
   
    const deletedPost = await prisma.post.delete({
      where: {
        id: id, 
      },
    });

    return NextResponse.json(req) 


  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}


export async function GET(req, {params}) {
    const {id} = params; 
    console.log(req);
    // return NextResponse.json([])
    try {
        // Fetch the post from the database using Prisma's `findUnique`
        const post = await prisma.post.findUnique({
          where: {
            id: id, // Assuming 'id' is the unique identifier
          },
        });
    
        // If no post is found, return a 404 error
        if (!post) {
          return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }
    
        // Return the post as a JSON response
        return NextResponse.json(post);
    
      } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
      }
  }


export async function PUT(req) {
    const { id } = req.query;
    
    try {
      const data = await req.text();
  
      const { title, content } = JSON.parse(data);
  
      const updatedPost = await prisma.post.update({
        where: { id: parseInt(id) }, 
        data: {
          title,
          content,
        },
      });

      // Return the updated post
      return NextResponse.json(updatedPost);
    } catch (error) {
      console.error('Error updating post:', error);
      return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
  }