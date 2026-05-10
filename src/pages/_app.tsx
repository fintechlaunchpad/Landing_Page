import { type AppType } from "next/app";

import { api } from "~/utils/api";
import MainLayout from "~/modules/common/MainLayout"
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </div>
  );
};

export default api.withTRPC(MyApp);
