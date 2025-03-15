import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  urlLogin: string;
  urlUsers: string;
  urlPosts: string;
  urlNotifications: string;
  pubg_api_key: string
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: '4uPlayer Dashboard',
  appVersion: packageJson.version,
  urlLogin: 'https://guarded-earth-81521-8a63ef2fadd3.herokuapp.com',
  urlUsers: 'http://localhost:5001',
  urlPosts: ' https://safe-savannah-17945-a17a62bf3161.herokuapp.com',
  // urlNotifications: 'http://localhost:5001' 
  urlNotifications: 'https://desolate-gorge-99763-7ff4ee81f256.herokuapp.com',
  pubg_api_key: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiZTY0MzYxMC1kYzAzLTAxM2QtYWVhZi0wNjFhOWQ1YjYxYWYiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzQxMTg4MjIxLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImJhY2tlbmQtYXBpIn0.nis4Hk8kxzSrztSKQ7oaXSXdgMxI_J4MBAAK1ghIEiI'
};

