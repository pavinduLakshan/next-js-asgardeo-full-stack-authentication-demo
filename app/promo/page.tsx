import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from 'next/navigation' 

export default async function Promo () {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/")
    }
    
    return (
        <p>{ session !== null && "You are entitled to a discount. contact support for more info."} </p>
    )

}
