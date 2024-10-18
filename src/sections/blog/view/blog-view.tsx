import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { LinearProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import { useAppSelector } from 'src/routes/hooks/hookes';

import { _posts } from 'src/_mock';
import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { PostItem } from '../post-item';
import { PostSort } from '../post-sort';
import { PostSearch } from '../post-search';

import type { PostsResponse } from './posts-response';

// ----------------------------------------------------------------------

export function BlogView() {
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('reported');
  const [page, setPage] = useState(0);
  const token = useAppSelector((state) => state.auth.token);
  const [postsResponse, setPostsResponse] = useState<PostsResponse>();
  const fetchPosts = useCallback(async () => {
      setLoading(true);
      const response = await fetch(`${CONFIG.urlPosts}/posts/admin?page=${page}&sortBy=${sortBy}`,{
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if(response.status === 200){
        const body = await response.json();
          setPostsResponse(body);
       }
  
      setLoading(false);
    }
  ,[token, page, sortBy]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]); 

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Posts
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify sx={{width:"144", height:"144"}} icon="mingcute:add-line" />}
        >
          New post
        </Button>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
        <PostSearch posts={_posts} />
        
        <PostSort
          sortBy={sortBy}
          onSort={handleSort}
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'reported', label: 'Reported' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Box>
      { loading && <Box sx={{ width: '100%', marginBottom: '2rem' }}>
                        <LinearProgress />
                     </Box>
        }
      <Grid container spacing={3}>
        {postsResponse && postsResponse.content.map((postResponse, index) => {
                  const latestPostLarge = (index === 0) && !postResponse.twitchEmbedId;
                  const latestPost = (index === 1 || index === 2) && !postResponse.twitchEmbedId;
                  const {likes} = postResponse;
                  const likeCount = Object.keys(likes).length;
                  const post = {
                    id: postResponse.id,
                    title: postResponse.description,
                    coverUrl: postResponse.picturePath ? postResponse.picturePath : 'https://res.cloudinary.com/dosghtja7/image/upload/v1728348253/assets/arts/sygxr3spp9gwkqfe7ezm.webp',
                    totalViews: 50,
                    description: postResponse.description,
                    totalShares: 150,
                    totalComments: postResponse.comments.length,
                    totalFavorites: likeCount,
                    postedAt: postResponse.createdAt,
                    twitchEmbedId: postResponse.twitchEmbedId,
                    reports: postResponse.reports,
                    author: {
                      name: postResponse.firstName,
                      avatarUrl: postResponse.userPicturePath
                    }
                  }
                  return (
                    <Grid key={post.id} xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
                      <PostItem post={post} latestPost={latestPost} latestPostLarge={latestPostLarge} />
                    </Grid>
                  );
                })}
      </Grid>

      <Pagination onChange={(e, newPage) => {
          setLoading(true);
          setPage(newPage - 1);
      }} count={postsResponse ? postsResponse.totalPages : 10} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </DashboardContent>
  );
}
