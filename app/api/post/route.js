// /pages/api/post/index.js (Create this file to fetch posts)

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Assuming you have Prisma setup

export async function GET() {
  try {
    const posts = await prisma.post.findMany(); // Fetch posts from the database
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
