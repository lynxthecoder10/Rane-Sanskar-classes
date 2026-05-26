'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { AuthCredentialsSchema } from '@/lib/schemas'

export type AuthFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

const AUTH_ERROR_MESSAGE = 'Invalid Credentials or Account Not Activated Yet'

function readCredentials(formData: FormData) {
  return AuthCredentialsSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
}

export async function authenticate(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const credentials = readCredentials(formData)
  const intent = formData.get('intent') === 'signup' ? 'signup' : 'login'
  let redirectTo: '/admin' | '/dashboard' | null = null

  if (!credentials.success) {
    return {
      status: 'error',
      message: 'Enter a valid email and password.',
    }
  }

  try {
    const supabase = await createClient()

    if (intent === 'signup') {
      const { data, error } = await supabase.auth.signUp({
        ...credentials.data,
        options: {
          data: {
            name: credentials.data.email.split('@')[0],
          },
        },
      })

      if (error) {
        return { status: 'error', message: AUTH_ERROR_MESSAGE }
      }

      if (!data.session) {
        return {
          status: 'success',
          message: 'Registration received. Please check your email before signing in.',
        }
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword(credentials.data)

      if (error) {
        return { status: 'error', message: AUTH_ERROR_MESSAGE }
      }
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { status: 'error', message: AUTH_ERROR_MESSAGE }
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()

    if (profileError || !profile) {
      await supabase.auth.signOut()
      return { status: 'error', message: AUTH_ERROR_MESSAGE }
    }

    redirectTo = profile.role === 'admin' ? '/admin' : '/dashboard'
  } catch {
    return { status: 'error', message: AUTH_ERROR_MESSAGE }
  }

  if (redirectTo) {
    revalidatePath('/', 'layout')
    redirect(redirectTo)
  }

  return { status: 'error', message: AUTH_ERROR_MESSAGE }
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
