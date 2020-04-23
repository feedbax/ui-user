import { useState } from 'react';
import api from 'lib/api';
import sleep from 'lib/sleep';

function useApiLogin(eventCode: string): [boolean, boolean, () => Promise<void>] {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const doLogin = async (): Promise<void> => {
    setLoading(true);

    const timeStart = Date.now();
    let doLoginApiDuration = 0;

    try {
      await api.login({ event: { slug: eventCode } });
      setLoggedIn(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    doLoginApiDuration = Date.now() - timeStart;
    await sleep(Math.max(0, 500 - doLoginApiDuration));

    setLoading(false);
  };

  return [isLoading, isLoggedIn, doLogin];
}

// eslint-disable-next-line import/prefer-default-export
export { useApiLogin };
