import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useAppSelector } from 'src/routes/hooks/hookes';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import { CONFIG } from 'src/config-global';
import { varAlpha } from 'src/theme/styles';
import TwitchEmbed from 'src/layouts/components/twitch/TwitchEmbed';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

export type PostItemProps = {
  id: string;
  title: string;
  coverUrl: string;
  totalViews: number;
  description: string;
  totalShares: number;
  totalComments: number;
  totalFavorites: number;
  postedAt: string | number | null;
  twitchEmbedId: string | null;
  reports: string[];
  author: {
    name: string;
    avatarUrl: string;
  };
};

export function PostItem({
  sx,
  post,
  latestPost,
  latestPostLarge,
  fetchPosts,
  ...other
}: CardProps & {
  post: PostItemProps;
  latestPost: boolean;
  latestPostLarge: boolean;
  fetchPosts: () => void;
}) {
  const renderAvatar = (
    <Avatar
      alt={post.author.name}
      src={post.author.avatarUrl}
      sx={{
        left: 24,
        zIndex: 9,
        bottom: -24,
        position: 'absolute',
        ...((latestPostLarge || latestPost) && {
          top: 24,
        }),
      }}
    />
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
        WebkitBoxOrient: 'vertical',
        ...(latestPostLarge && { typography: 'h5', height: 60 }),
        ...((latestPostLarge || latestPost) && {
          color: 'common.white',
        }),
      }}
    >
      {post.title}
    </Link>
  );

  const renderTwitch = (
    <>{post.twitchEmbedId && <TwitchEmbed embedId={post.twitchEmbedId}/>}</>
  );
  const token = useAppSelector((state) => state.auth.token);
  const deletePost = async () => {
    const response = await fetch(`${CONFIG.urlPosts}/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    if(response.ok){
      fetchPosts();
    }
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
        { number: post.totalComments, icon: 'solar:chat-round-dots-bold' },
        { number: post.totalFavorites, icon: 'solar:heart-bold' },
        { number: post.reports.length, icon: 'material-symbols:partner-reports' },
      ].map((info, _index) => (
        <Box
          key={_index}
          display="flex"
          sx={{
            ...((latestPostLarge || latestPost) && {
              opacity: 0.64,
              color: 'common.white',
            }),
          }}
        >
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
        </Box>
      ))}
    </Box>
  );

  const renderCover = (
    <Box
      component="img"
      alt={post.title}
      src={post.coverUrl}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 1,
        color: 'text.disabled',
        ...((latestPostLarge || latestPost) && {
          opacity: 0.48,
          color: 'common.white',
        }),
      }}
    >
      {fDate(post.postedAt)}
    </Typography>
  );

  const renderShape = (
    <SvgColor
      width={88}
      height={36}
      src="/assets/icons/shape-avatar.svg"
      sx={{
        left: 0,
        zIndex: 9,
        bottom: -16,
        position: 'absolute',
        color: 'background.paper',
        ...((latestPostLarge || latestPost) && { display: 'none' }),
      }}
    />
  );

  return (
    <Card sx={sx} {...other}>
      <Box
        sx={(theme) => ({
          position: 'relative',
          pt: 'calc(100% * 3 / 4)',
          ...((latestPostLarge || latestPost) && {
            pt: 'calc(100% * 4 / 3)',
            '&:after': {
              top: 0,
              content: "''",
              width: '100%',
              height: '100%',
              position: 'absolute',
              bgcolor: varAlpha(theme.palette.grey['900Channel'], 0.72),
            },
          }),
          ...(latestPostLarge && {
            pt: {
              xs: 'calc(100% * 4 / 3)',
              sm: 'calc(100% * 3 / 4.66)',
            },
          }),
        })}
      >
        {renderShape}
        {renderAvatar}
        {post.twitchEmbedId ? renderTwitch : renderCover}
      </Box>

      <Box
        sx={(theme) => ({
          p: theme.spacing(6, 3, 3, 3),
          ...((latestPostLarge || latestPost) && {
            width: 1,
            bottom: 0,
            position: 'absolute',
          }),
        })}
      >
        {renderDate}
        {renderTitle}
        {renderInfo}
        <Box mt='1rem' flexDirection='row' display='flex' justifyContent='center'>
          <IconButton onClick={deletePost}>
            <Iconify sx={{color: 'error.main', marginRight: 0.5}} width={18} icon="solar:trash-bin-trash-bold"/>
          </IconButton>
        </Box>
  
      </Box>
    </Card>
  );
}
