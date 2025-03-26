import { NextRequest, NextResponse } from "next/server";
import { Auth } from "@/domains/user/services/auth.service";

export async function POST(req: NextRequest) {
    const { identifier, password } = await req.json();
    const auth = await Auth(identifier, password);
    if( auth.status !== 200){
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    return NextResponse.json({ token: auth.token }, { status: auth.status });
}
