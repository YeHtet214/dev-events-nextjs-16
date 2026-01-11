import { Event } from '@/database';
import connectDB from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

// Define the context type for dynamic route params
interface RouteContext {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/events/[slug]
 * Fetch a single event by its slug
 */
export async function GET(
  req: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  try {
    // Connect to database
    await connectDB();

    // Await and extract slug from route params
    const { slug } = await params;

    console.log("Fetching event slug: ", slug)

    // Validate slug parameter
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { message: 'Valid slug parameter is required' },
        { status: 400 }
      );
    }

    // Validate slug format (only alphanumeric, hyphens, and underscores)
    const slugRegex = /^[a-z0-9-_]+$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        { message: 'Invalid slug format. Only lowercase letters, numbers, hyphens, and underscores are allowed' },
        { status: 400 }
      );
    }

    // Query the database for the event
    const event = await Event.findOne({ slug });

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug "${slug}" not found` },
        { status: 404 }
      );
    }

    // Return the event
    return NextResponse.json(
      {
        message: 'Event fetched successfully',
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching event by slug:', error);

    // Return appropriate error message
    return NextResponse.json(
      {
        message: 'Failed to fetch event',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();

    const { slug } = await params;

    const event = await Event.findOneAndDelete({ slug });

    if (!event) {
      return NextResponse.json(
        { message: `Event with slug "${slug}" not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Event deleted successfully',
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to delete event',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}