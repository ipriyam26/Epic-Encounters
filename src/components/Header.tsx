import Image from "next/image"


const Header = () => {
    return (
        <header className="z-10 w-full px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <Image
                        width={56}
                        height={56}
                        src="https://img.icons8.com/external-itim2101-lineal-color-itim2101/64/external-book-back-to-school-itim2101-lineal-color-itim2101.png" alt="Book Whisperer Logo" />

                    <div className="ml-8 text-2xl font-bold text-manatee">
                        Book Whisperer
                    </div>
                </div>
                <div className="block">
                    {/* <a href="/newpage" className="text-moonstone_blue hover:text-wild-blue-yonder">
                        Example
                    </a> */}
                </div>
            </div>
        </header>

    )
}

export default Header