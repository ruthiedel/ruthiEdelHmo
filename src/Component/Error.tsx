import React from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ErrorDialog({ error, onClose }: { error: any, onClose: () => void }) {
    return (
        <>
            <Dialog open={!!error} onClose={onClose}>
                {error && (
                    <>
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            style={{ position: 'absolute', top: 0, right: 0 }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <DialogContent>
                            {/* Render your error content here */}
                            <p>{error.message}</p>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </>
    );
}