"use client"

import type React from "react"

import { useState, useEffect } from "react"

import { Box, Grid, Card, useTheme, CardMedia, Typography, Pagination, CardContent, useMediaQuery } from "@mui/material"





export default function PhotoGallery({ data }: {data: any}) {
    // Sample photo data
  const generatePhotos = () => data.documents.map((doc: { id: { $oid: any }; nome: any; descrition: any; images: { featured: any; icon: any } }, i: any) => ({
        id: doc.id.$oid,
        title: doc.nome,
        description: doc.descrition,
        url: doc.images.featured ? doc.images.featured : doc.images.icon,
 }));
  const allPhotos = generatePhotos()
  const [page, setPage] = useState(1)
  const [photos, setPhotos] = useState<typeof allPhotos>([])
  const photosPerPage = 12
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))

  useEffect(() => {
    const startIndex = (page - 1) * photosPerPage
    setPhotos(allPhotos.slice(startIndex, startIndex + photosPerPage))
  }, [page, allPhotos])

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const getGridColumns = () => {
    if (isMobile) return 1
    if (isTablet) return 2
    return 4
  }

  return (
    <Box>
      <Grid container spacing={getGridColumns()}>
        {photos.map((photo: { id: React.Key | null | undefined; url: string ; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
          <Grid item xs={12} sm={6} md={3} key={photo.id}>
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
              <CardMedia component="img" height="200" image={photo.url} alt={String(photo.title)} sx={{ objectFit: "cover" }} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {photo.title}
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
          count={Math.ceil(allPhotos.length / photosPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size={isMobile ? "small" : "medium"}
        />
      </Box>
    </Box>
  )
}

