import { ArrowLeft, Menu } from 'lucide-react'

interface HeaderProps {
  onBack: () => void
  onMenuToggle: () => void
}

export function Header({ onBack, onMenuToggle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <button
        onClick={onBack}
        className="flex items-center text-blue-700 font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        BACK
      </button>
      <div className="text-xl font-bold">Name</div>
      <button 
        onClick={onMenuToggle}
        className="w-8 h-8 flex items-center justify-center"
      >
        <Menu className="w-6 h-6" />
      </button>
    </header>
  )
}

