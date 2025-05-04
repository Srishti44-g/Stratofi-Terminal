// src/components/layout/sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: 'grid' },
  { name: 'Portfolios', path: '/portfolios', icon: 'briefcase' },
  { name: 'Strategies', path: '/strategies', icon: 'target' },
  { name: 'Testing Console', path: '/testing', icon: 'lab' },
  { name: 'Analytics', path: '/analytics', icon: 'chart' },
  { name: 'Clients', path: '/clients', icon: 'users' },
];

export default function Sidebar() {
  const pathname = usePathname();
  
  return (
    <div className="flex flex-col w-64 bg-card min-h-screen border-r">
      <div className="px-6 py-6">
        <h1 className="text-2xl font-bold text-primary">StratoFi Terminal</h1>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.path);
            return (
              <li key={item.name}>
                <Link href={item.path}>
                  <div className={`flex items-center px-4 py-3 text-sm rounded-md ${
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-foreground/70 hover:bg-accent hover:text-accent-foreground'
                  }`}>
                    <span className="material-icons-outlined text-lg mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="px-6 py-4 border-t">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-medium">JD</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">Portfolio Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// src/components/layout/header.tsx
import React from 'react';
import { useTheme } from 'next-themes';

export default function Header() {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="bg-card border-b border-border h-16 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h2 className="text-lg font-medium">Welcome to StratoFi Terminal</h2>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="p-2 rounded-md hover:bg-accent"
        >
          {theme === 'light' ? (
            <span className="material-icons-outlined">dark_mode</span>
          ) : (
            <span className="material-icons-outlined">light_mode</span>
          )}
        </button>
        <button className="p-2 rounded-md hover:bg-accent">
          <span className="material-icons-outlined">notifications</span>
        </button>
        <button className="p-2 rounded-md hover:bg-accent">
          <span className="material-icons-outlined">settings</span>
        </button>
      </div>
    </header>
  );
}

// src/app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Sidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${jetbrainsMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="flex h-screen bg-background">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-6">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
