import { useState, useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { Box, Button, LinearProgress } from '@mui/material';

import { useAppSelector } from 'src/routes/hooks/hookes';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { AdItem } from '../ad-item';
import UploadForm from './upload-ads-form';

// ----------------------------------------------------------------------

export interface AdsResponse {
    id: string,
    description: string,
    urlImage: string,
    link: string | null,
    createdAt: Date,
    views: number,
    clicks: number,
    adsPosition: string,
    actived: boolean
}

export function AdsView() {

  const token = useAppSelector((state) => state.auth.token);
  const [ads, setAds] = useState<AdsResponse[] | null >()
  const [loading, setLoading] = useState(true);
  const fetchAds = async () => {
    const url = CONFIG.urlPosts;
    setLoading(true);
    const response = await fetch(`${url}/ads/admin`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
    if(response.ok){
        const body = await response.json();
        setAds(body);

    }
    setLoading(false);
  }

  useEffect(()=> {
    if(!ads){
      fetchAds();
    }
  })
  
  
  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Anúncios
      </Typography>    
      
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Box gap={1} display="flex" flexShrink={0} sx={{ my: 1 }}>
          <Button variant="contained"
                color="inherit"
                startIcon={<Iconify icon="solar:refresh-bold" />}
                onClick={() => {
                  fetchAds();
              }}>Refresh</Button>
            <UploadForm />
        </Box>
      </Box>
      { loading && <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                     </Box>
        }  
      <Grid container spacing={3}>
        {ads?.map((ad) => (
          <Grid key={ad.id} xs={12} sm={ad.adsPosition === 'BOTTOM_AD' ? 12 : 6} md={ad.adsPosition === 'BOTTOM_AD' ? 6 : 3}>
            <AdItem ad={ad} />
          </Grid>
        ))}
      </Grid>

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </DashboardContent>
    
  );
}
