import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseServer';

// GET: Fetch message history between two users
export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const friendId = searchParams.get('friendId');
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '50';

  if (!userId || !friendId) {
    return NextResponse.json({ error: 'Missing userId or friendId' }, { status: 400 });
  }

  try {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    const { data, error } = await supabase
      .from('messages')
      .select('id, content, created_at, sender_id, users:sender_id(username, avatar_url)')
      .or(
        `and(sender_id.eq.${userId},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${userId})`
      )
      .order('created_at', { ascending: false })
      .range(offset, offset + limitNum - 1);

    if (error) throw error;

    // Reverse to show oldest first
    return NextResponse.json({ messages: data.reverse() });

  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}

// POST: Send a new message
export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const body = await req.json();
  const { sender_id, receiver_id, content } = body;

  if (!sender_id || !receiver_id || !content) {
    return NextResponse.json({ error: 'Missing sender_id, receiver_id, or content' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ sender_id, receiver_id, content }])
      .select('id, content, created_at, sender_id, users:sender_id(username, avatar_url)');

    if (error) throw error;
    return NextResponse.json({ message: data });

  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
