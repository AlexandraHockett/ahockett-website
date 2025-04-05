// src/app/api/check-env/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    host: process.env.EMAIL_HOST ? "definido" : "não definido",
    port: process.env.EMAIL_PORT ? "definido" : "não definido",
    user: process.env.EMAIL_USER ? "definido" : "não definido",
    pass: process.env.EMAIL_PASS ? "definido (ocultado)" : "não definido",
  });
}
