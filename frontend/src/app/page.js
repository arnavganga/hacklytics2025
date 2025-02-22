import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="p-4 flex justify-center text-blue-500">Go to the doctor in real life</h1>
      <div className="flex justify-center p-4">
        <Link href="/settings/patient">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Patient
          </button>
        </Link>
        <Link href="/settings/doctor">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Doctor
          </button>
        </Link>
      </div>
    </>
  );
}
