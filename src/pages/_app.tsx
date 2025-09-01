import { type AppType } from "next/app";
import { Geist } from "next/font/google";

import { api } from "~/utils/api";
import MainLayout from "~/modules/common/MainLayout"
import "~/styles/globals.css";

const geist = Geist({
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={geist.className}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </div>
  );
};

export default api.withTRPC(MyApp);
