// src/app/api/hotel-inquiry/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      destination,
      checkIn,
      checkOut,
      rooms,
      adults,
      children,
      infants,
      residence,
      nationality,
      contactNumber,
      emailAddress,
    } = body ?? {};

    if (
      !destination ||
      !checkIn ||
      !checkOut ||
      !rooms ||
      !adults ||
      !residence ||
      !nationality ||
      !contactNumber ||
      !emailAddress
    ) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 },
      );
    }

    const emailHtml = `
      <h2>New Hotel Inquiry</h2>
      <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse;">
        <tr><td><strong>Destination</strong></td><td>${destination}</td></tr>
        <tr><td><strong>Check In</strong></td><td>${checkIn}</td></tr>
        <tr><td><strong>Check Out</strong></td><td>${checkOut}</td></tr>
        <tr><td><strong>Rooms</strong></td><td>${rooms}</td></tr>
        <tr><td><strong>Adults</strong></td><td>${adults}</td></tr>
        <tr><td><strong>Children</strong></td><td>${children || "0"}</td></tr>
        <tr><td><strong>Infants</strong></td><td>${infants || "0"}</td></tr>
        <tr><td><strong>Residence</strong></td><td>${residence}</td></tr>
        <tr><td><strong>Nationality</strong></td><td>${nationality}</td></tr>
        <tr><td><strong>Contact Number</strong></td><td>${contactNumber}</td></tr>
        <tr><td><strong>Email Address</strong></td><td>${emailAddress}</td></tr>
      </table>
    `;

    // TODO: send this using Resend / Nodemailer / SMTP
    console.log(emailHtml);

    return NextResponse.json({
      message: "Inquiry submitted successfully.",
    });
  } catch (error) {
    console.error("Hotel inquiry error:", error);

    return NextResponse.json(
      { message: "Failed to submit inquiry." },
      { status: 500 },
    );
  }
}
