import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-wild-blue-yonder text-white py-6 px-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <p>&copy; {new Date().getFullYear()} Priyam Srivastava</p>
                    <p className="text-sm">Licensed under the MIT License</p>
                </div>

                <div className="space-x-4 flex">
                    <a href="https://github.com/ipriyam26" target="_blank" rel="noreferrer" className="text-2xl hover:text-eclipse">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/priyam-srivastava-97651620b/" target="_blank" rel="noreferrer" className="text-2xl hover:text-eclipse">
                        <FaLinkedin />
                    </a>
                    <a href="https://ipriyam26.hashnode.dev/" target="_blank" rel="noreferrer" className="text-2xl hover:text-eclipse">
                    <FaMedium />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
