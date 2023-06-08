import connectDb from "@/database/connection";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    try {
        console.log("ENTRO A REPORTE")
        
        const { id } = await request.json()
        console.log("Reports User", id)

        const connection = await connectDb()
        await connection.connect()
        try {
            const res = await connection.query(`
            SELECT 
                COUNT(a.id) AS classified_today,
                (SELECT 
                    COUNT(a.id)
                FROM
                    answers a
                INNER JOIN users u ON u.id = a.classified_by
                WHERE
                    u.id = $1
                        AND status = '2') AS classified_total,
                u.name,
                u.lastname
            FROM
                answers a
            INNER JOIN users u ON u.id = a.classified_by
            WHERE
                u.id = $1
                    AND date_trunc('day', classified_at) = CURRENT_DATE 
                    AND status = '2'
            GROUP BY
                u.name,
                u.lastname;
            `, [id])

            if (res.rowCount > 0) {
               
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