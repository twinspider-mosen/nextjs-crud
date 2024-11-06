
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 

export async function DELETE(req) {
//   const { id } = NextRequest.query; 
  console.log(req)
//   try {
//     // Delete the post by ID
//     const deletedPost = await prisma.post.delete({
//       where: {
//         id: parseInt(id), 
//       },
//     });

//     // Return a success message
//     return NextResponse.json({ message: 'Post deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting post:', error);
//     return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
//   }
}
