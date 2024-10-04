import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  urlLogin: string;
  urlUsers: string;
  urlNotifications: string;
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: '4uPlayer Dashboard',
  appVersion: packageJson.version,
  urlLogin: 'https://guarded-earth-81521-8a63ef2fadd3.herokuapp.com',
  urlUsers: 'https://aqueous-atoll-06718-98ee250592fd.herokuapp.com',
  urlNotifications: 'https://desolate-gorge-99763-7ff4ee81f256.herokuapp.com' 
};

