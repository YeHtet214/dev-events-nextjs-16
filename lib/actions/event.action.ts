"use server"

import { Event } from "@/database";
import connectDB from "../mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();
    const event = await Event.findOne({ slug });

    console.log("Event: ", event);

    return await Event.find({ _id: { $ne: event?._id }, tags: { $in: event?.tags } }).lean();
  } catch (error) {
    console.log(error)
    return []
  }
}