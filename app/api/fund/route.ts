import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = Redis.fromEnv();

export async function GET() {
  const amount = (await redis.get<number>("freedombonsai:fund")) || 0;
  return NextResponse.json({ amount });
}

export async function POST(req: Request) {
  const { amount } = await req.json();
  if (typeof amount !== "number" || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }
  const newAmount = await redis.incrbyfloat("freedombonsai:fund", amount);
  return NextResponse.json({ amount: newAmount });
}
