import connectDb from "@/database/connection";
import { NextResponse } from "next/server";



export async function GET(request: Request) {
    try {
        const connection = await connectDb()
        await connection.connect()
        try {
            const res = await connection.query(`
            SELECT *
            FROM  (
            SELECT DISTINCT 1 + trunc(random() * 5100000)::integer AS id
            FROM   generate_series(1, 1100) g
            ) r
            JOIN  answers USING (id)
            WHERE status is null and new_type is null
            LIMIT  1;
            `)

            if (res.rowCount > 0) {
                console.log(res.rows[0].id)
                await connection.query("UPDATE answers SET status = 1 WHERE id = $1", [res.rows[0].id])
                return NextResponse.json({
                    values: res.rows[0]
                })
            } else {
                return NextResponse.json({
                    values: []
                })
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


export async function POST(request: Request) {

}