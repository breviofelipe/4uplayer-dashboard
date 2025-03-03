import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { GamesView } from 'src/sections/games/view/games-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Blog - ${CONFIG.appName}`}</title>
      </Helmet>

      <GamesView />
    </>
  );
}
