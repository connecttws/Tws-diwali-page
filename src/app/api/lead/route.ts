import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, diyaNumber, diyaName, offerHeadline, offerValue, voucherCode } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and contact number are required." },
        { status: 400 }
      );
    }

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const sheetId = process.env.GOOGLE_SHEET_ID;

    // If Google Sheet credentials are not configured yet, succeed gracefully so client UI doesn't break
    if (!clientEmail || !privateKey || !sheetId) {
      console.warn(
        "[Google Sheets]: Environment variables not fully configured (GOOGLE_SHEET_ID is missing). Lead recorded locally."
      );
      return NextResponse.json(
        {
          success: true,
          sheetConnected: false,
          message: "Lead recorded. Please configure GOOGLE_SHEET_ID in .env.local to sync to Google Sheets.",
        },
        { status: 200 }
      );
    }

    // Authenticate with Google Sheets using Service Account
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Append row to Sheet1 (Columns A to G)
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            name.trim(),
            phone.trim(),
            `Diya ${diyaNumber || ""} (${diyaName || ""})`,
            offerHeadline || "—",
            offerValue || "—",
            voucherCode || "—",
          ],
        ],
      },
    });

    return NextResponse.json({ success: true, sheetConnected: true }, { status: 200 });
  } catch (error: any) {
    console.error("[Google Sheets API Error]:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Failed to append lead to Google Sheet." },
      { status: 500 }
    );
  }
}

