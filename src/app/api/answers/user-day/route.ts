import connectDb from "@/database/connection";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export async function GET (request: NextRequest) {
    try {
        
        const connection = await connectDb()
        await connection.connect()
        try {

            const res = await connection.query(`select count(u.*) as total, CONCAT(u.name, ' ', u.lastname) as new_type from answers a inner join users u on u.id = a.classified_by where date_trunc('day', classified_at) = CURRENT_DATE group by u.name, u.lastname`)

            return NextResponse.json({
                values: res.rows
            }, {status: 200})
            

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

