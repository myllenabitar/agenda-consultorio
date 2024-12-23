import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function withAuth(Component: React.FC) {
  return function ProtectedRoute(props: React.ComponentProps<typeof Component>) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login'); 
      }
    }, []);

    return <Component {...props} />;
  };
}
