import { Player } from '@lottiefiles/react-lottie-player';
import { CSSProperties } from 'react';

interface LottieAnimationProps {
    animationData: string | object;
    style?: CSSProperties | undefined;
    className?:string; 
}

const LottieAnimation = ({ animationData, style, className }: LottieAnimationProps) => {
    return (
        <Player
            className={className}
            autoplay
            loop
            src={animationData}
            style={style}
        />
    );
};

export default LottieAnimation;
