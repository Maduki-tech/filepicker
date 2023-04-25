import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { env } from "~/env.mjs";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(env.NEXT_PUBLIC_LICENCE);
const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
