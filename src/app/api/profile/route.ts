import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { getAuth } from '@clerk/nextjs/server';

// GET: Fetch user profile
export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, avatar_url, email')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return NextResponse.json(data);

  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}

// PUT: Update user profile
export async function PUT(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { userId } = getAuth(req);
  const body = await req.json();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select('id, username, avatar_url, email');

    if (error) throw error;
    return NextResponse.json(data[0]);

  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
