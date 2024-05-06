import clientPromise from "@/lib/MongodbClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../lib/authOptions";

export async function POST(request: Request) {
  const { email } = await request.json();

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const doesUserExist = await db
      .collection("users")
      .findOne({ email: session?.user?.email });

    if (!doesUserExist) {
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 400 }
      );
    }

    const updateEmail = await db
      .collection("users")
      .updateOne({ email: session?.user?.email }, {
        $set: {
            email
        }
      });

    return NextResponse.json({ success: "Email changed" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
