import { useState } from "react";

import { Box, Modal, Button, Typography } from "@mui/material";


export default function ModalAttributs({ attribut }: { attribut: any }) {


    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    
     return <><Button variant="outlined" onClick={handleOpen}>Open Modal</Button>      
        <Modal open={open} onClose={handleClose}>
            <Box 
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" component="h2">
                    {attribut.name}
                </Typography>
                <img src={attribut.image} alt="attributs" style={{width: '100%', height: 'auto', marginTop: '1rem'}} />
                <Typography variant="body1" component="p" style={{ marginTop: '1rem' }}>
                    Attribute Values:
                </Typography>
                <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Key</th>
                        <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(attribut.value) && attribut.value.map((item: { name: string; displayName: string }, index: number) => (
                        <tr key={index}>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{item.name}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{item.displayName}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </Box>
        </Modal></>
}