import FallBackIconToken from "./FallBackIconToken";

type Props = {
  src?: string;
  size?: number;
};
const IconToken = ({ src, size = 7 }: Props) => {
  return src ? (
    <img src={src} alt={src} className={`h-${size} w-${size} rounded-full`} />
  ) : (
    <FallBackIconToken size={size} />
  );
};

export default IconToken;
