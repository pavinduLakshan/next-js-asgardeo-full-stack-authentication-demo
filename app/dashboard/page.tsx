"use client";

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard () {
    const { data, status } = useSession();
    const router = useRouter()

    const userScopes = data?.user?.scope?.split(" ") || []

    const isUserReadingAllBookingsAllowed: boolean = userScopes?.includes("read_bookings")
    const isUserCreatingBookingAllowed: boolean = userScopes?.includes("create_bookings")

    const [bookings, setBookings] = useState([]);

    const createBooking = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const requestBody: Record<string, any> = {}

      for (const [key, value] of formData.entries()) { 
        requestBody[key] = value;
      }

      const rawResponse = await fetch("http://localhost:3000/api/bookings",{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
      
      const response = await rawResponse.json();
      
      console.log(response)
      alert("Booking created")
    }

    useEffect(() => {
        if (status === "unauthenticated") {
          router.push('/')
        }
      }, [status])

    useEffect(() => {
      const getAllBookings = async () => {
        const response = await fetch("http://localhost:3000/api/bookings")
        const bookingList = await response.json()
        
        setBookings(bookingList.bookings)
      }

      if(isUserReadingAllBookingsAllowed) {
        getAllBookings()  
      }      
    },[data])

    return (
        <>            
            <button onClick={() => signOut()}>sign out</button>

            { isUserReadingAllBookingsAllowed && (
              <>
                <h1>Bookings</h1>
              
                <ol>
                {bookings.map(booking => (
                  <li>{ JSON.stringify(booking) }</li>
                ))}
                </ol>
              </>
            )}

            { isUserCreatingBookingAllowed && (
              <form onSubmit={createBooking}>
                <label>Name</label>
                <input type="text" name="name" />

                <label>Email</label>
                <input type="email" name="email" />

                <label>Time</label>
                <input type="time" name="time"/>

                <label>Date</label>
                <input type="date" name="date" />
                
                <input type="submit" />
              </form>
            )}

        </>
    )
}