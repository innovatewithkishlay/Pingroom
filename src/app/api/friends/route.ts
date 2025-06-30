import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseServer';

// GET: List all friend requests for the authenticated user
export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('friend_requests')
    .select('*')
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ friendRequests: data });
}

// POST: Send a new friend request
export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const body = await req.json();
  const { sender_id, receiver_id } = body;

  if (!sender_id || !receiver_id) {
    return NextResponse.json({ error: 'Missing sender_id or receiver_id' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('friend_requests')
    .insert([{ sender_id, receiver_id, status: 'pending' }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ friendRequest: data[0] });
}
