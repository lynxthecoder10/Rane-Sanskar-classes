'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { AuthCredentialsSchema } from '@/lib/schemas'

function readCredentials(formData: FormData) {
  return AuthCredentialsSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  const credentials = readCredentials(formData)

  if (!credentials.success) {
    return redirect('/student-login?message=Please enter a valid email and password')
  }

  const { error } = await supabase.auth.signInWithPassword(credentials.data)

  if (error) {
    return redirect('/student-login?message=Could not authenticate user')
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = user
    ? await supabase.from('profiles').select('role').eq('id', user.id).single()
    : { data: null }

  revalidatePath('/', 'layout')
  redirect(profile?.role === 'admin' ? '/admin' : '/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const credentials = readCredentials(formData)

  if (!credentials.success) {
    return redirect('/student-login?message=Please enter a valid email and password')
  }

  const { error } = await supabase.auth.signUp({
    ...credentials.data,
    options: {
      data: {
        name: credentials.data.email.split('@')[0],
      },
    },
  })

  if (error) {
    return redirect('/student-login?message=Could not register user')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return redirect('/dashboard?message=Could not log out')
  }

  revalidatePath('/', 'layout')
  redirect('/student-login')
}
