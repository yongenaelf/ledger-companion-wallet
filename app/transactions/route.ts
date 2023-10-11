import { NextResponse } from "next/server";

export interface List {
  id: number;
  txId: string;
  from: string;
  to: string;
  amount: string;
  symbol: string;
  action: string;
  isCrossChain: string;
  relatedChainId: string;
  memo: string;
  txFee: object;
  time: string;
  method: string;
  blockHeight: number;
  addressFrom: string;
  addressTo: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const explorerUrl = searchParams.get("explorerUrl");
  const limit = searchParams.get("limit") || 10;
  const address = searchParams.get("address");
  const page = searchParams.get("page") || 1;

  const res = await fetch(
    `${explorerUrl}/api/viewer/transferList?pageSize=${limit}&pageNum=${page}&address=${address}`
  );

  const { data } = await res.json();

  return NextResponse.json<{
    data: {
      total: number;
      list: List[];
    };
  }>({ data });
}
