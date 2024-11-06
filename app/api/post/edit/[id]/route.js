
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 
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
