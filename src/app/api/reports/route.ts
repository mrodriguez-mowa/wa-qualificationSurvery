import connectDb from "@/database/connection";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export async function POST(request: Request) {

    try {
        console.log("ENTRO A REPORTE")
        
        const { id, date } = await request.json()
        console.log("Reports User", id)

        const connection = await connectDb()
        await connection.connect()
        try {

            const userData = await connection.query(`
            SELECT * FROM users WHERE id = $1
            `, [id])

            const res = await connection.query(`
            SELECT COUNT(A.ID) AS CLASSIFIED_TODAY,
                (SELECT COUNT(A.ID)
                    FROM ANSWERS A
                    WHERE A.CLASSIFIED_BY = $1
                    AND A.STATUS = '2') AS CLASSIFIED_TOTAL,
                (SELECT COUNT(*)
                    FROM ANSWERS B
                    WHERE B.CLASSIFIED_BY = $1
                    AND DATE_TRUNC('day', B.CLASSIFIED_AT) BETWEEN CURRENT_DATE - 4 AND CURRENT_DATE
                    AND B.STATUS = '2') AS LAST_FOUR_DAYS
            FROM ANSWERS A
            WHERE A.CLASSIFIED_BY = $1
            AND DATE_TRUNC('day', A.CLASSIFIED_AT) = CURRENT_DATE
            AND A.STATUS = '2';

            `, [id])

            if (res.rowCount > 0) {
               
                return NextResponse.json({
                    // values: res.rows[0],
                    values: {
                        classified_today: res.rows[0].classified_today,
                        classified_total: res.rows[0].classified_total,
                        classified_four_days: res.rows[0].last_four_days,
                        daily_goal: userData.rows[0].daily_goal,
                        name: userData.rows[0].name,
                        lastname: userData.rows[0].lastname
                    }
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