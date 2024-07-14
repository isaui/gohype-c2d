import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function useAuthServer() {
  const supabase = createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError) redirect('/sign-in');

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*, branch_user(*)')
    .eq('id', authData.user?.id)
    .limit(1)
    .single();

  if (userError) redirect('/sign-in');

  return userData;
}
