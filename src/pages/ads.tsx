import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { AdsView } from 'src/sections/ads/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Ads - ${CONFIG.appName}`}</title>
      </Helmet>

      <AdsView />
    </>
  );
}
