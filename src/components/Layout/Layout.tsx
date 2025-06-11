import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Background from './Background';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Background>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </Background>
  );
}
