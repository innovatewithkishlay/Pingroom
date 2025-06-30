import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseServer';

// GET: List all friend requests and friends for a user
export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  try {
    // Get friend requests
    const { data: requests, error: reqError } = await supabase
      .from('friend_requests')
      .select('id, sender_id, receiver_id, status, created_at, users:sender_id(username)')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .neq('status', 'rejected');

    if (reqError) throw reqError;

    // Get accepted friends
    const { data: friends, error: friendError } = await supabase
      .from('friends')
      .select('friend_id, users:friend_id(id, username, avatar_url)')
      .eq('user_id', userId);

    if (friendError) throw friendError;

    return NextResponse.json({ 
      friendRequests: requests, 
      friends: friends.map(f => f.users) 
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}

// POST: Send a new friend request
export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const body = await req.json();
  const { sender_id, receiver_id } = body;

  if (!sender_id || !receiver_id) {
    return NextResponse.json({ error: 'Missing sender_id or receiver_id' }, { status: 400 });
  }

  try {
    // Check if request already exists
    const { data: existing, error: existError } = await supabase
      .from('friend_requests')
      .select()
      .or(`and(sender_id.eq.${sender_id},receiver_id.eq.${receiver_id}),and(sender_id.eq.${receiver_id},receiver_id.eq.${sender_id})`)
      .single();

    if (!existError && existing) {
      if (existing.status === 'pending') {
        return NextResponse.json({ error: 'Request already sent' }, { status: 400 });
      }
      // Update existing if previously rejected
      const { data, error } = await supabase
        .from('friend_requests')
        .update({ status: 'pending' })
        .eq('id', existing.id)
        .select();
      
      if (error) throw error;
      return NextResponse.json({ friendRequest: data });
    }

    // Create new request
    const { data, error } = await supabase
      .from('friend_requests')
      .insert([{ sender_id, receiver_id, status: 'pending' }])
      .select();

    if (error) throw error;
    return NextResponse.json({ friendRequest: data });

  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}

// PUT: Accept or reject a friend request
export async function PUT(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const body = await req.json();
  const { requestId, status } = body;

  if (!requestId || !['accepted', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'Missing or invalid requestId/status' }, { status: 400 });
  }

  try {
    // Update request status
    const { data: request, error: reqError } = await supabase
      .from('friend_requests')
      .update({ status })
      .eq('id', requestId)
      .select()
      .single();

    if (reqError) throw reqError;

    // If accepted, create friendship both ways
    if (status === 'accepted') {
      const { sender_id, receiver_id } = request;
      await supabase.from('friends').insert([
        { user_id: sender_id, friend_id: receiver_id },
        { user_id: receiver_id, friend_id: sender_id },
      ]);
    }

    return NextResponse.json({ success: true });

  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
