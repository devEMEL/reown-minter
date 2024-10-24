import { Bars3Icon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import kombatOdysseyImg from '../public/kombat-odyssey.jpeg';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // useEffect(() => {
    //     if (isConnected ) {

    //     }
    // }, [isConnected]);

    const handleToggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="bg-transparent">
            <header className="mx-auto max-w-6xl px-5 py-8 lg:px-10 text-[#ffffff]">
                <nav className="flex justify-between itens-center">
                    <div>
                        <h2 className="flex gap-2">
                            <Image
                                src={kombatOdysseyImg}
                                className="w-8 rounded-full h-auto"
                                alt=""
                            />
                            <Link href="/" className="text-white mt-1">
                                Reown Minter
                            </Link>
                            
                        </h2>
                    </div>
                    <div
                        className={
                            isMobileMenuOpen
                                ? 'md:static absolute md:min-h-fit min-h-[30vh] left-0 top-[7%] md:w-auto w-full flex md:items-center px-5 py-10 md:py-0'
                                : 'md:static absolute md:min-h-fit min-h-[30vh] left-0 top-[-100%] md:w-auto w-full flex md:items-center px-5 py-10 md:py-0'
                        }
                    >
                        <ul className="flex md:flex-row flex-col md:gap-[4vw] gap-4">
                            <li>
                                <Link
                                    href="/add-collection"
                                    className="hover:text-gray-500"
                                    onClick={() => {}}
                                >
                                    <div className="flex gap-1 items-center">
                                        <span>
                                            <PlusIcon
                                                width="15"
                                                cursor="pointer"
                                            />
                                        </span>
                                        <p>Add Collection</p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="hover:text-gray-500">
                                    Collections
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center gap-6">
                        <w3m-button />
                        <div className="md:hidden" onClick={handleToggleMenu}>
                            {isMobileMenuOpen ? (
                                <XMarkIcon width="25" cursor="pointer" />
                            ) : (
                                <Bars3Icon width="25" cursor="pointer" />
                            )}
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}
