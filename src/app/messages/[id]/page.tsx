import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MessageList from '@/components/messages/MessageList';
import MessageInput from '@/components/messages/MessageInput';
import { createSupabaseServerClient } from '@/lib/supabaseServer';

export default async function MessagePage({ params }: { params: { id: string } }) {
  const { userId } = await auth();
  const friendId = params.id;

  if (!userId) {
    redirect('/');
  }

  const supabase = await createSupabaseServerClient();

  const { data: messages } = await supabase
    .from('messages')
    .select('id, sender_id, receiver_id, content, created_at, users:sender_id(username, avatar_url)')
    .or(
      `and(sender_id.eq.${userId},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${userId})`
    )
    .order('created_at', { ascending: true });

  async function handleSend(content: string) {
    'use server';
    const supabase = await createSupabaseServerClient();
    await supabase.from('messages').insert([
      { sender_id: userId, receiver_id: friendId, content }
    ]);
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full max-w-2xl mx-auto py-6">
        <h1 className="text-xl font-light text-gray-200 mb-4">Chat</h1>
        <div className="flex-1 flex flex-col bg-gray-900/70 rounded-xl shadow p-4">
          <MessageList 
            messages={messages || []} 
            currentUserId={userId} 
            friendId={friendId} 
          />
          <div className="mt-2">
            <MessageInput onSend={handleSend} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
