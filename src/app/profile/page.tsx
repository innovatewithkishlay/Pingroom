import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import UserProfile from '@/components/profile/UserProfile';
import { createSupabaseServerClient } from '@/lib/supabaseServer';

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  const supabase = await createSupabaseServerClient();

  // Fetch user profile
  const { data: user } = await supabase
    .from('users')
    .select('id, username, email, avatar_url')
    .eq('id', userId)
    .single();

  // Handler for updating profile (calls backend API)
  async function handleUpdateProfile(data: { username: string; email: string }) {
    'use server';
    const supabase = await createSupabaseServerClient();
    await supabase
      .from('users')
      .update({ username: data.username, email: data.email })
      .eq('id', userId);
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full max-w-2xl mx-auto py-6">
        <h1 className="text-xl font-light text-gray-200 mb-4">Your Profile</h1>
        <UserProfile
          username={user?.username || ''}
          email={user?.email || ''}
          avatarUrl={user?.avatar_url}
          onUpdate={handleUpdateProfile}
        />
      </div>
    </DashboardLayout>
  );
}
