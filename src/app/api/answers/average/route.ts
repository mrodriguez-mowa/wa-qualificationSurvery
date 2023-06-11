import connectDb from "@/database/connection";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
    try {

        const connection = await connectDb()
        await connection.connect()
        try {

            const res = await connection.query(`SELECT AVG(count_respuestas)::integer AS total, CONCAT (name,' ' ,lastname) as new_type
            FROM (
              SELECT COUNT(*) AS count_respuestas,
                classified_by
              FROM answers
                where status = '2'
              GROUP BY date_trunc('hour', classified_at), classified_by
            ) AS subquery inner join users u on u.id = classified_by  group by  name, lastname
            `)


            return NextResponse.json({
                values: res.rows
            }, { status: 200 })


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

