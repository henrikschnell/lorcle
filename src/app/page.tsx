import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <img className="w-64" src="/images/lorcana_logo.png"  alt="Lorcana Logo"/>
            <p className="text-2xl">Coming soon...</p>
            <Link
                href='/login'
                className="group relative w-fit flex justify-center py-2 px-4 mt-4 border border-gray-500 text-sm font-medium rounded-md text-gray-300 transition duration-150 ease-in-out"
            >
                Sign in
            </Link>
        </div>
    );
}
