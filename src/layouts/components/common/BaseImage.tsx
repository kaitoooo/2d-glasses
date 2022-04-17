import React from 'react';

type Props = {
    img: string;
    imgRetina: string;
    alt?: string;
    role?: string;
    width: number;
    height: number;
};

const BaseImage: React.VFC<Props> = (props) => {
    return <img decoding="async" src={`/img/${props.img}`} srcSet={`/img/${props.imgRetina} 2x`} alt={props.alt} role={props.role} width={props.width} height={props.height} />;
};

export default BaseImage;
