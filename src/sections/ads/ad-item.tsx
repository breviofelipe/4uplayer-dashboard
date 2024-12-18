import { Box, Card, Link, Typography } from "@mui/material";

import { fDate } from "src/utils/format-time";
import { fShortenNumber } from "src/utils/format-number";

import { Label } from "src/components/label";
import { Iconify } from "src/components/iconify";

import type { AdsResponse } from "./view";


interface AdItemProps {
    ad: AdsResponse 
  }

export function AdItem({ ad } : AdItemProps){

    const deleteAd = async () => {
    
    }

    const renderInfo = (
        <Box
          gap={1.5}
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-end"
          sx={{
            mt: 3,
            color: 'text.disabled',
          }}
        >
          
          {[
            { number: ad.clicks, icon: 'mynaui:click-solid' },
            { number: ad.views, icon: 'solar:eye-bold' },
          ].map((info, _index) => (
            <Box
              key={_index}
              display="flex"
            >
              <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
              <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
            </Box>
          ))}
        </Box>
      );

     const renderDate = (
        <Typography
          variant="caption"
          component="div"
          sx={{
            mb: 1,
            color: 'text.disabled',
          }}
        >
          {fDate(new Date(ad.createdAt))}
        </Typography>
      );

      const renderTitle = (
        <Link
          color="inherit"
          variant="subtitle2"
          underline="hover"
          sx={{
            height: 24,
            overflow: 'hidden',
            WebkitLineClamp: 2,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical'
          }}
        >
          {ad.description}
        </Link>
      );

      const renderCover = (
        <Box
          component="img"
          alt={ad.description}
          src={ad.urlImage}
          sx={{
            top: 0,
            width: 1,
            height: ad.adsPosition === 'BOTTOM_AD' ? 0.5 : 1,
            objectFit: 'cover',
            position: 'absolute',
          }}
        />
      );
    return (
        <Card>
          <Box
            sx={() => ({
              position: 'relative',
              pt: 'calc(100% * 3 / 4)',
              ...(ad.adsPosition === 'BOTTOM_AD' && {
                pt: {
                  xs: 'calc(100% * 4 / 3)',
                  sm: 'calc(100% * 3 / 4.66)',
                },
              }),
            })}
          >
            
            {renderCover}

          </Box>
    
          <Box
            sx={(theme) => ({
              p: theme.spacing(3, 3, 3, 3),
              ...((ad.adsPosition === 'BOTTOM_AD') && {
                width: 1,
                bottom: 0,
                position: 'absolute',
              }),
            })}
          >
            <Box display='flex' justifyContent='space-between'>
              {renderDate}
              {ad.actived ? <Label color='success'>actived</Label> : <Label color='error'>inatived</Label>}
            </Box>
            {renderTitle}
            <Box display='flex' justifyContent='space-between'>
              <Label color='info'>{ad.adsPosition}</Label>
              {renderInfo}
            </Box>
            
            {/* <Box mt='1rem' flexDirection='row' display='flex' justifyContent='center'>
              <IconButton onClick={deleteAd}>
                <Iconify sx={{color: 'error.main', marginRight: 0.5}} width={18} icon="solar:trash-bin-trash-bold"/>
              </IconButton>
            </Box> */}
      
          </Box>
        </Card>
      );
}