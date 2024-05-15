import { createCampaign, dashboard, logout, payment, profile, message } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  
];
