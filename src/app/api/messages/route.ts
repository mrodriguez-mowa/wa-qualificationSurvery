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
            WHERE status is null and new_type is null AND current_type in ('NEGATIVO', 'POSITIVO')
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
    try {
        const {id, type, userId} = await request.json()
        console.log(id, type, userId)
        const connection = await connectDb()
        await connection.connect()
        try {
            if (type) {
                await connection.query("UPDATE answers SET status = 2, new_type = $1, classified_at = NOW(), classified_by = $2 WHERE id = $3", [type.toUpperCase(), userId, id])
            } else {
                await connection.query("UPDATE answers SET status = null, new_type = null WHERE id = $1", [id])
            }
        } catch (error) {
            console.log(error)
            return NextResponse.json({
                detail: "ERROR_PROCESS",
                message: "¡Ups! Error inesperado"
            }, { status: 500 });
        } finally {
            await connection.end()
        }
        return NextResponse.json({
            detail: "UPDATED_RECORD",
            message: "Mensaje actualizado"
        }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            detail: "ERROR_PROCESS",
            message: "¡Ups! Error inesperado"
        }, { status: 500 });
    }
}