import { ISignUpForm } from "@/components/auth/sign-up/SignUp";
import connectDb from "@/database/connection";

export async function POST(request: Request) {
    const requestBody:ISignUpForm = await request.json();

    const { name, lastName, username, password } = requestBody;

    const connection = await connectDb()

    await connection.connect()

    try {
        await connection.query("INSERT INTO public.users(name, lastname, username, password, created_at, modified_at) VALUES ($1, $2, $3, $4, NOW(), NOW())", [name, lastName, username, password])
        
    } catch(e) {
        console.log("Error conectando BD")
        console.log(e)
    } finally {
        await connection.end()
    }

    return new Response('Hello from Next')

    
}