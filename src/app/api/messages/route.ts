import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseServer';

// GET: Fetch message history between two users
export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const friendId = searchParams.get('friendId');

  if (!userId || !friendId) {
    return NextResponse.json({ error: 'Missing userId or friendId' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(
      `and(sender_id.eq.${userId},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${userId})`
    )
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ messages: data });
}

// POST: Send a new message
export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const body = await req.json();
  const { sender_id, receiver_id, content } = body;

  if (!sender_id || !receiver_id || !content) {
    return NextResponse.json({ error: 'Missing sender_id, receiver_id, or content' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('messages')
    .insert([{ sender_id, receiver_id, content }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: data[0] });
}
