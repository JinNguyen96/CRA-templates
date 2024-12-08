import React, { useState } from 'react'
import { Drawer } from '../organisms/Drawer'
import { Header } from '../molecules/Header'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleBackClick = () => {
    console.log('Back clicked')
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onBack={handleBackClick} onMenuToggle={toggleDrawer} />
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
        <nav>
          <ul className="space-y-2">
            <li><a href="#" className="text-blue-600 hover:underline">Home</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Products</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">About Us</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Contact</a></li>
          </ul>
        </nav>
      </Drawer>
      <main className="mx-auto p-4">
        {children}
      </main>
    </div>
  )
}

