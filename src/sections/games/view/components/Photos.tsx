import { useState, useEffect, useCallback } from "react";

import { Box, Card, Grid, useTheme, CardMedia, Pagination, Typography, CardContent, useMediaQuery, LinearProgress } from "@mui/material";

import { useAppSelector } from "src/routes/hooks/hookes";

import { CONFIG } from "src/config-global";


export default function PhotosComponent({ currentContent }: { currentContent: any }) {
  const [photos, setPhotos] = useState<any>([]);
  const [page, setPage] = useState(1);
  const photosPerPage = 6;
  const [count, setCount] = useState(0);
  const theme = useTheme();

  const [data, setData] = useState<any>(null);
  const token = useAppSelector((state) => state.auth.token);
  const [loading, setLoading] = useState<boolean>(false);
  
  const getData = useCallback(async () => {
    setLoading(true);
    setPhotos([])
    const type = currentContent._id || "all";
    const response = await fetch(`${CONFIG.urlUsers}/fortnite/cosmetics/type/${type}?page=${page}`,{
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          });
    if(response.status === 200){
      setLoading(false)
      const body = await response.json();
      console.log("bode", body)
      setData(body.content[0]);
     }
  },[token, page, currentContent._id]);


  const mapPhotos = (dataArray: any) => {
    const response = dataArray.documents.map((doc: { id: any; nome: any; descrition: any; images: { featured: any, icon: string, smallIcon: string }; rarity: { displayValue: string} }) => ({
      id: doc.id,
      title: doc.nome,
      description: doc.descrition,
      url: doc.images.featured ? doc.images.featured : doc.images.icon ? doc.images.icon : doc.images.smallIcon,
      rarity: doc.rarity.displayValue
    }))
    return response;
  }

  useEffect(() => {
    const generatePhotos = mapPhotos(currentContent);
    setPhotos(generatePhotos);
    setCount(currentContent.count);
  }, [currentContent]);

  useEffect(() => {

    if(data){
      const generatePhotos = mapPhotos(data);
      setPhotos(generatePhotos);
      setCount(data.count);
    }
  }, [data]);
  
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const getGridColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 4;
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    getData();
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
    { loading && <Box sx={{ width: '100%', marginBottom: '2rem' }}>
                            <LinearProgress />
                         </Box>
            }
      <Grid container spacing={getGridColumns()}>
        {!loading && photos.map((photo: { rarity: string, id: { timestamp: React.Key | null | undefined }; url: string; title: string; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined }) => (
          <Grid item xs={12} sm={6} md={3} key={photo.id.timestamp}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardMedia component="img" height="200" image={photo.url} alt={photo.title} sx={{ objectFit: "cover" }} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {photo.title}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {photo.rarity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {photo.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}>
        <Pagination
          count={Math.ceil(count / photosPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size={isMobile ? "small" : "medium"}
        />
      </Box>
    </>
  );
}