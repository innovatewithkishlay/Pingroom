import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FriendList from '@/components/friends/FriendList';
import FriendRequestList from '@/components/friends/FriendRequest';
import { createSupabaseServerClient } from '@/lib/supabaseServer';

// Define proper types for API responses
interface FriendRequestDB {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: string;
  created_at: string;
  users: {
    username: string;
    avatar_url: string | null;
  };
}

interface FriendDB {
  friend_id: string;
  users: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
}

export default async function FriendsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  const supabase = await createSupabaseServerClient();

  // Fetch friend requests
  const { data: requests } = await supabase
    .from('friend_requests')
    .select('id, sender_id, receiver_id, status, created_at, users:sender_id(username, avatar_url)')
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .neq('status', 'rejected') as { data: FriendRequestDB[] | null };

  // Fetch friends
  const { data: friends } = await supabase
    .from('friends')
    .select('friend_id, users:friend_id(id, username, avatar_url)')
    .eq('user_id', userId) as { data: FriendDB[] | null };

  // Transform requests data to match component props
  const transformedRequests = (requests || []).map(req => ({
    id: req.id,
    sender_id: req.sender_id,
    receiver_id: req.receiver_id,
    status: req.status,
    created_at: req.created_at,
    senderName: req.users?.username || '',
    senderAvatar: req.users?.avatar_url || null
  }));

  // Transform friends data to match component props
  const transformedFriends = (friends || []).map(f => ({
    id: f.users?.id || '',
    username: f.users?.username || '',
    avatarUrl: f.users?.avatar_url || null
  }));

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-light text-gray-200 mb-6">Friends</h1>
        
        <div className="mb-10">
          <h2 className="text-lg font-medium text-indigo-400 mb-4">Friend Requests</h2>
          <FriendRequestList 
            requests={transformedRequests} 
            userId={userId}
          />
        </div>
        
        <div>
          <h2 className="text-lg font-medium text-indigo-400 mb-4">Your Friends</h2>
          <FriendList 
            friends={transformedFriends} 
            onSelect={(friend) => console.log('Selected friend:', friend)}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
