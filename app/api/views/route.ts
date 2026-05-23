import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = Redis.fromEnv();

export async function POST() {
  const count = await redis.incr("freedombonsai:views");
  return NextResponse.json({ count });
}

export async function GET() {
  const count = (await redis.get<number>("freedombonsai:views")) || 0;
  return NextResponse.json({ count });
}
