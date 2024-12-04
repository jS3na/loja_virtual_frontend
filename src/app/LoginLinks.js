'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'
import Dashboard from './(app)/dashboard/page'
import { Sidebar } from '@/components/sidebar'
import Login from './(auth)/login/page'
import { useEffect } from 'react'

const LoginLinks = () => {
    const { user } = useAuth({ middleware: 'guest' })
    const router = useRouter()

    useEffect(() => {
        user ? router.push('/dashboard') : router.push('/login')
    }, [user])

    return (
        <div className="flex min-h-screen">
            <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
                Loading...
            </div>
        </div>
    )
}

export default LoginLinks

