import { useRouter } from 'next/navigation';
import { useEffect, ComponentType } from 'react';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/login/email');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withAuth;
