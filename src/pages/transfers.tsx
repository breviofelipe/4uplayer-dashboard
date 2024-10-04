import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { TransferView } from 'src/sections/transfers/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Transfers - ${CONFIG.appName}`}</title>
      </Helmet>

      <TransferView />
    </>
  );
}
