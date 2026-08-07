import { NextResponse } from "next/server";

interface GasDataRecord {
  flow: number;
  totalflow: number;
  timestamp: string;
}

const gasStore: GasDataRecord[] = [];
const MAX_RECORDS = 50;

export async function GET() {
  return NextResponse.json(gasStore);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      typeof body.flow !== "number" ||
      typeof body.totalflow !== "number" ||
      (body.timestamp && typeof body.timestamp !== "string")
    ) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const record: GasDataRecord = {
      flow: body.flow,
      totalflow: body.totalflow,
      timestamp: body.timestamp ? body.timestamp : new Date().toISOString()
    };

    gasStore.push(record);
    if (gasStore.length > MAX_RECORDS) {
      gasStore.splice(0, gasStore.length - MAX_RECORDS);
    }

    return NextResponse.json({ success: true, record });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
