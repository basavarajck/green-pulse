// client/src/components/HeroAnimation.jsx
import Spline from '@splinetool/react-spline';

const HeroAnimation = () => {
  return (
    <div className="w-full h-[500px] relative">
      {/* Replace url with your Spline scene URL */}
      <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9j/scene.splinecode" />
      
      {/* Overlay to blend bottom/sides if needed */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-green-950 via-transparent to-transparent opacity-20" />
    </div>
  );
};

export default HeroAnimation;
