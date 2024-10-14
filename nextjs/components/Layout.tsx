import { FC, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import { Source_Code_Pro } from '@next/font/google';

interface Props {
    children: ReactNode;
}

const Source_Code_Pro_ = Source_Code_Pro({
    subsets: ['latin'],
    weight: ['400'],
});
const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <div
                className={`overflow-hidden ${Source_Code_Pro_.className} text-white text-[14px]`}
            >
                <div className="fixed top-0 -z-10 h-full w-full">
                    <div className="absolute top-0 z-[-2] h-screen w-screen bg-yellow-700 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
                    {/* https://bg.ibelick.com/ */}
                </div>
                <Header />
                <div className="min-h-screen py-16 max-w-6xl mx-auto space-y-8 px-5 lg:px-10">
                    {children}
                </div>

                <Footer />
            </div>
        </>
    );
};

export default Layout;
