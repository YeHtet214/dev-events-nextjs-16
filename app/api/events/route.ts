import { v2 as cloudinary } from "cloudinary";

import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		await connectDB();

		const formData = await req.formData();

		const file = formData.get("image") as File;

		if (!file) {
			return NextResponse.json(
				{ message: "Image file is required" },
				{ status: 400 }
			);
		}

		let event;

		try {
			event = Object.fromEntries(formData.entries());
		} catch (e) {
			console.error(e);
			return NextResponse.json(
				{ message: "Invalid Json data type!" },
				{ status: 400 }
			);
		}

		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const uploadResult = await new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{ resource_type: "image", folder: "DevEvent" },
					(error, results) => {
						if (error) return reject(error);

						resolve(results);
					}
				)
				.end(buffer);
		});

		event.image = (uploadResult as { secure_url: string }).secure_url;

		const tags = JSON.parse(formData.get("tags") as string);
		const agenda = JSON.parse(formData.get("agenda") as string);

		const data = await Event.create({ ...event, tags, agenda });

		return NextResponse.json(
			{ message: "Event Successfully Created", event: data },
			{ status: 201 }
		);
	} catch (e) {
		console.error(e);
		return NextResponse.json(
			{ message: e instanceof Error ? e.message : "Unknown" },
			{ status: 500 }
		);
	}
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 })

    return NextResponse.json({ message: "Event Fetched Successfully", events }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Events fetching failed", error }, { status: 500 })
  }
}