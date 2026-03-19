// src/app/api/flight-inquiry/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      tripType,
      flyingFrom,
      flyingTo,
      departing,
      returning,
      adults,
      children,
      infants,
      travelClass,
      nationality,
      contactNumber,
      emailAddress,
    } = body ?? {};

    if (
      !tripType ||
      !flyingFrom ||
      !flyingTo ||
      !departing ||
      !adults ||
      !travelClass ||
      !nationality ||
      !contactNumber ||
      !emailAddress
    ) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 },
      );
    }

    if (tripType === "round-trip" && !returning) {
      return NextResponse.json(
        { message: "Return date is required for round-trip inquiries." },
        { status: 400 },
      );
    }

    if (tripType === "multi-city") {
      return NextResponse.json(
        { message: "Multi-city inquiry is not supported yet." },
        { status: 400 },
      );
    }

    const subject = `New Flight Inquiry - ${flyingFrom} to ${flyingTo}`;

    const emailHtml = `
      <h2>New Flight Inquiry</h2>
      <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse;">
        <tr><td><strong>Trip Type</strong></td><td>${tripType}</td></tr>
        <tr><td><strong>Flying From</strong></td><td>${flyingFrom}</td></tr>
        <tr><td><strong>Flying To</strong></td><td>${flyingTo}</td></tr>
        <tr><td><strong>Departing</strong></td><td>${departing}</td></tr>
        <tr><td><strong>Returning</strong></td><td>${returning || "-"}</td></tr>
        <tr><td><strong>Adults</strong></td><td>${adults}</td></tr>
        <tr><td><strong>Children</strong></td><td>${children || "0"}</td></tr>
        <tr><td><strong>Infants</strong></td><td>${infants || "0"}</td></tr>
        <tr><td><strong>Class</strong></td><td>${travelClass}</td></tr>
        <tr><td><strong>Nationality</strong></td><td>${nationality}</td></tr>
        <tr><td><strong>Contact Number</strong></td><td>${contactNumber}</td></tr>
        <tr><td><strong>Email Address</strong></td><td>${emailAddress}</td></tr>
      </table>
    `;

    console.log(subject);
    console.log(emailHtml);

    return NextResponse.json({
      message: "Flight inquiry submitted successfully.",
    });
  } catch (error) {
    console.error("Flight inquiry error:", error);

    return NextResponse.json(
      { message: "Failed to submit inquiry." },
      { status: 500 },
    );
  }
}