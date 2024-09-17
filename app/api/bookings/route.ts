import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

// Mock booking data (you can replace this with a real database connection)
let bookings: any[] = [];

// POST request handler (Create a booking)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({
        message: 'Please sign in to continue',
      }, { status: 401 });
    }

    const scopes = session.user.scope?.split(" ")

    if(scopes?.includes("create_bookings")) {
      const data = await request.json();
      const newBooking = {
        id: bookings.length + 1,
        name: data.name,
        email: data.email,
        date: data.date,
        time: data.time,
      };
  
      bookings.push(newBooking);
  
      return NextResponse.json({
        message: 'Booking created successfully',
        booking: newBooking,
      }, { status: 201 });
    } else {
      return NextResponse.json({
        message: 'You don\'t have permission to create a booking.',
      }, { status: 403 });
    }

  } catch (error) {
    return NextResponse.json({
      message: 'Error creating booking',
      error: error,
    }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({
      message: 'Please sign in to continue',
    }, { status: 401 });
  }

  const scopes = session?.user?.scope

  if(scopes?.includes("read_bookings")) {
    return NextResponse.json({
      message: 'All bookings',
      bookings,
    });
  } else {
    return NextResponse.json({
      message: 'You don\'t have permission to read bookings',
    }, { status: 403 });
  }


}
