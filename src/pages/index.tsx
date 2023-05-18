import { type NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useState } from 'react'
import FilePicker from '~/Components/FilePicker'
import FilePreview from '~/Components/FilePreview'
import Navbar from '~/Components/Navbar'
import Viewer from '~/Components/Viewer'

// import { api } from "~/utils/api";
const PDFViewer = dynamic(() => import("../Components/Viewer"), {
  ssr: false
});

const Home: NextPage = () => {
    // const hello = api.example.hello.useQuery({ text: "from tRPC" });
    const [selectedFile, setSelectedFile] = useState(null);
    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main className="w-full h-[calc(100vh-4rem)] grid grid-cols-2 p-8 bg-gray-400">
                <FilePicker setFile={setSelectedFile}/>
                {/* <FilePreview fileContent={selectedFile}/> */}
                <PDFViewer file={selectedFile}/>
            </main>
        </>
    )
}

export default Home
