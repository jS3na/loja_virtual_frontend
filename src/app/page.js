import Image from 'next/image';
import LoginLinks from '@/app/LoginLinks';

export const metadata = {
    title: 'Admin Panel - Online Store',
};

const Home = () => {
    return (
        <main className="">
                <LoginLinks />
        </main>
    );
};

export default Home;

