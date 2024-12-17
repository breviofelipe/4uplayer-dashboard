import { Box, Card, Link, IconButton, Typography } from "@mui/material";

import { fDate } from "src/utils/format-time";
import { fShortenNumber } from "src/utils/format-number";

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
            height: 44,
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
            height: 1,
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
            })}
          >
            
            {renderCover}
          </Box>
    
          <Box
            sx={(theme) => ({
              p: theme.spacing(6, 3, 3, 3),
            })}
          >
            <Typography>{ad.adsPosition}</Typography>
            {renderDate}
            {renderTitle}
            {renderInfo}
            <Box mt='1rem' flexDirection='row' display='flex' justifyContent='center'>
              <IconButton onClick={deleteAd}>
                <Iconify sx={{color: 'error.main', marginRight: 0.5}} width={18} icon="solar:trash-bin-trash-bold"/>
              </IconButton>
            </Box>
      
          </Box>
        </Card>
      );
}