import { createSupabaseBrowserClient } from '@/lib/supabaseClient';

export async function sendFriendRequest(receiverId: string) {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('friend_requests')
    .insert([{ receiver_id: receiverId }])
    .select();

  if (error) throw error;
  return data[0];
}

export async function acceptFriendRequest(requestId: string) {
  const supabase = createSupabaseBrowserClient();
  const { error } = await supabase
    .from('friend_requests')
    .update({ status: 'accepted' })
    .eq('id', requestId);

  if (error) throw error;
}

export async function rejectFriendRequest(requestId: string) {
  const supabase = createSupabaseBrowserClient();
  const { error } = await supabase
    .from('friend_requests')
    .update({ status: 'rejected' })
    .eq('id', requestId);

  if (error) throw error;
}

export async function getFriends(userId: string) {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('friends')
    .select('friend_id, users:friend_id(id, username, avatar_url)')
    .eq('user_id', userId);

  if (error) throw error;
  return data.map(f => f.users);
}
