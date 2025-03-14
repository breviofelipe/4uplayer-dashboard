"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"

import { Tab, Box , Tabs, Typography } from "@mui/material"

import { useAppSelector } from "src/routes/hooks/hookes"

import { CONFIG } from "src/config-global"

import PhotosComponent from "./Photos"

export interface DataType {
  documents: any
  content: {
    _id: string;
    count: number;
    documents: {
      id: string;
      nome: string;
      descrition: string;
      images: {
        featured: string;
      };
    }[];
  }[];
}

export default function PhotoGallery({game} : { game: string }) {
  

  const [tabIndex, setTabIndex] = useState(0)
  


  const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setContentTab(null)
    setTabIndex(newValue)
  } 

  const [data, setData] = useState<DataType | null>(null);
  const token = useAppSelector((state) => state.auth.token);
  const [contentTab, setContentTab] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const getData = useCallback(async () => {
    setLoading(true);
    const response = await fetch(`${CONFIG.urlUsers}/fortnite/cosmetics`,{
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          });
    if(response.status === 200){
      setLoading(false)
      const body = await response.json();
      setData(body);
     }
  },[token]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if(data){
      const ttt = data.content[tabIndex];
      console.log("teste ", ttt)
      setContentTab(ttt);
    }
  }, [data, tabIndex]);

  if(game !== 'FORTNITE') return <></>;
  
  return (
    <Box>
      <Typography variant="h6">Cosmetics</Typography>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="photo gallery tabs"
      >
        {data && data.content.map((item, index) => (
          <Tab key={item._id + index} label={item._id} />
        ))}
      </Tabs>
      
        {contentTab && <PhotosComponent currentContent={contentTab} />}
      
    </Box>
  )
}