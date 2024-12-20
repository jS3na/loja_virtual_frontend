"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ShoppingBag, Menu, X, Tag, CirclePercent } from 'lucide-react'
import CartLogo from '@/images/cart-logo.png'
import Image from 'next/image'

const menuItems = [
  { icon: Home, label: 'Início', href: '/' },
  { icon: ShoppingBag, label: 'Produtos', href: '/produtos' },
  { icon: Tag, label: 'Categorias', href: '/categorias' },
  { icon: CirclePercent, label: 'Promoções', href: '/promocoes' },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsOpen(true)
      }
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>

      <button
        className="fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-full shadow-lg md:hidden transition-all duration-300 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white transition-all duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static md:inset-auto md:min-h-screen`}
      >
        <div className="flex flex-col h-full">

          <div className="flex items-center justify-center mt-4 shadow-md">
            <Image
              src={CartLogo}
              alt="Logo da Loja"
              width={120}
              height={120}
              className="mx-auto mb-4 bg-white p-2 rounded-full"
            />
          </div>

          <nav className="flex-grow px-4 pb-4 md:pb-0 md:overflow-y-auto">
            <ul className="space-y-2 mt-6">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-3 rounded-lg transition-all duration-200 ease-in-out ${pathname === item.href
                        ? 'bg-indigo-700 text-white shadow-md'
                        : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                      }`}
                    onClick={() => isMobile && setIsOpen(false)}
                  >
                    <item.icon className="w-6 h-6 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 bg-indigo-700 bg-opacity-50 backdrop-blur-sm">
            <p className="text-sm text-indigo-200 text-center">© 2024 João Gabriel Sena</p>
          </div>
        </div>
      </div>

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  )
}

