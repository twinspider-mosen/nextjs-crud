import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Initialize Prisma Client
const prisma = new PrismaClient();


export async function POST(req) {
    try {
        // Read the raw body as text
        const data = await req.text(); 

        // Parse the text as JSON
        const { title, content } = JSON.parse(data);
      const post = await prisma.post.create({
        data: {
          title,
          content,
        },
      });

 
        return NextResponse.json({ title, content });
    } catch (error) {
          console.error('Error creating post:', error);
          res.status(500).json({ error: 'Failed to create post' });
        }
}
  
  