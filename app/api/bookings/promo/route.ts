import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"


export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({
      message: 'Sign in to see your offer',
    }, { status: 200 });
  }

  const discount = Math.random() * 100

  return NextResponse.json({
    message: 'Hi, you are entitled to a whopping ' + discount + '% offer. contact support.',
  }, { status: 200 });
}
