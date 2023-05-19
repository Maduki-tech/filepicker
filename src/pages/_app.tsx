import { type AppType } from 'next/app';
import { api } from '~/utils/api';
import '~/styles/globals.css';
import { env } from '~/env.mjs';
import { registerLicense } from '@syncfusion/ej2-base';
import { ClerkProvider } from '@clerk/nextjs';

registerLicense(env.NEXT_PUBLIC_LICENCE);
const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <ClerkProvider>
            <Component {...pageProps} />
        </ClerkProvider>
    );
};

export default api.withTRPC(MyApp);
