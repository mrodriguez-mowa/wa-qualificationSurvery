import connectDb from "@/database/connection";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET (request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id")
        const connection = await connectDb()
        await connection.connect()
        try {

            let res 

            if (id != "all") {
                res = await connection.query(`select count(new_type) as total, new_type from answers where status = '2' and new_type is not null and id = $1 group by new_type`, [id])
            } else {
                res = await connection.query(`select count(new_type) as total, new_type from answers where status = '2' and new_type is not null group by new_type`)
            }

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

