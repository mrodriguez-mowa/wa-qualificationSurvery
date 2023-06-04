import { ISignInForm } from "@/components/auth/sign-in/SignIn"
import connectDb from "@/database/connection";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const requestBody: ISignInForm = await request.json();

        const { username, password } = requestBody;

        const connection = await connectDb()

        await connection.connect()

        try {
            const res = await connection.query("SELECT id, username, password, name from public.users WHERE username = $1 AND password = $2", [username, password])
            if (res.rowCount > 0) {
                if (res.rows[0].username == username && res.rows[0].password == password) {
                    return NextResponse.json({
                        detail: "LOGGED",
                        message: "¡Bienvenido!",
                        values: {
                            id: res.rows[0].id,
                            username: res.rows[0].username
                        }
                    }, {
                        status: 200
                    });
                } else {
                    return NextResponse.json({
                        detail: "WRONG_CREDENTIALS",
                        message: "Credenciales incorrectas"
                    }, { status: 200 });
                }
            } else {
                return NextResponse.json({
                    detaiL: "NO_RESULTS",
                    message: "Credenciales incorrectas"
                }, { status: 200 });
            }

        } catch (e) {
            console.log(e)
            return NextResponse.json({
                detail: "ERROR_BD",
                message: "¡Ups! Error inesperado"
            }, { status: 500 });
        } finally {
            await connection.end()
        }
    } catch (e) {
        console.log(e)
        return NextResponse.json({
            detail: "ERROR_PROCESS",
            message: "¡Ups! Error inesperado"
        }, { status: 500 });
    }
}