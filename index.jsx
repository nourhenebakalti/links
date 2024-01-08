// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();

  // useEffect to perform redirection
  useEffect(() => {
    // You can change the destination pages as needed
    const redirectTo = '/home/home6-dark';

    // Redirect to the desired page
    router.push(redirectTo);
  }, [router]);

  // Placeholder content, this won't be rendered due to redirection
  return <div>Redirecting...</div>;
};

export default HomePage;
