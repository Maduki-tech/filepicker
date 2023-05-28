import { type AppType } from 'next/app';
import { api } from '~/utils/api';
import '~/styles/globals.css';
import { env } from '~/env.mjs';
import { registerLicense } from '@syncfusion/ej2-base';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '~/Components/Navbar';

registerLicense(env.NEXT_PUBLIC_LICENCE);
const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <>
            <ClerkProvider>
            <Navbar />
                <Component {...pageProps} />
            </ClerkProvider>
        </>
    );
};

export default api.withTRPC(MyApp);
