type Props = { size?: number };

const FallBackIconToken = ({ size = 7 }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size * 4}`}
      height={`${size * 4}`}
      fill="none"
      viewBox="0 0 64 64"
    >
      <rect width="100%" height="100%" fill="#eef2ff" />
      <circle cx="32" cy="22" r="14" fill="#c7d2fe" />
      <text
        x="50%"
        y="60%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="18"
        fill="#3730a3"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        ICON
      </text>
    </svg>
  );
};

export default FallBackIconToken;
