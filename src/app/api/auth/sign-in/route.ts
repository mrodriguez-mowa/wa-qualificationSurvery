import { ISignInForm } from "@/components/auth/sign-in/SignIn"
import connectDb from "@/database/connection";

export async function POST(request: Request) {
    const requestBody: ISignInForm = await request.json();

    const { username, password } = requestBody;

    const connection = await connectDb()

    await connection.connect()

    try {
        const res = await connection.query("SELECT username, password, name from public.users WHERE username = $1 AND password = $2", [username, password])
        if (res.rowCount > 0) {
            if (res.rows[0].username == username && res.rows[0].password == password) {
                console.log("Conectado")
            } else {
                console.log("Credenciales incorrectas")
            }
        } else {
            console.log("No results found")
        }


    } catch (e) {
        console.log("Error conectando BD")
        console.log(e)
    } finally {
        await connection.end()
    }


    return new Response('Hello from Next')
}