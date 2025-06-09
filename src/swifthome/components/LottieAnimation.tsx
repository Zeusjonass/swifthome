import { Player } from '@lottiefiles/react-lottie-player';

interface LottieAnimationProps {
    animationData: any;
    style?: any;
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
