import Image from "next/image"


const Header = () => {
    return (
        <header className=" py-6 px-4 sm:px-6 lg:px-8  w-full z-10">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <Image
                        width={56}
                        height={56}
                        src="https://img.icons8.com/external-itim2101-lineal-color-itim2101/64/external-book-back-to-school-itim2101-lineal-color-itim2101.png" alt="Book Whisperer Logo" />

                    <div className="ml-8 text-manatee text-2xl font-bold">
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