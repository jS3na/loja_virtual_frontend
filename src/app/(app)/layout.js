'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/Navigation'
import Loading from '@/app/(app)/Loading'
import { Sidebar } from '@/components/sidebar'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-grow p-8">
                {children}
            </main>
        </div>
    )
}

export default AppLayout
