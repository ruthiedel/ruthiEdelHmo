import React, { useState, useEffect } from 'react';
import Avatar from "@mui/material/Avatar";
import {getPicture} from '../../Services/CustomerService'
interface PictureProps {
  id: string;
}

type NewType = {
    id: string;
    onClick: () => any;
};

export default function Picture(props:NewType) {
  const [pictureUrl, setPictureUrl] = useState<string | null>(null);
 
  useEffect(() => {
    const fetchPicture = async () => {
     
        if(props.id!=''&&props.id!=null){
      try {
        const response = getPicture(props.id);
        if (response) {
          console.log(response)
          const blob = await response;
          if(blob){
             const url = URL.createObjectURL(blob);
             setPictureUrl(url);
          }
         
        } else {
          console.error('Failed to fetch picture');
        }
      } catch (error) {
        console.error('Error fetching picture:', error);
      }
    }
    };

    fetchPicture();
    return () => {
      if (pictureUrl) {
        URL.revokeObjectURL(pictureUrl);
      }
    };
  },[props.id]);

  if (!pictureUrl) {
    return <div>No Image</div>;
  }

  return <>
  <Avatar alt="Remy Sharp" src={pictureUrl}  onClick={props.onClick}>
    <img  src={pictureUrl}/></Avatar></>;
};


