interface EyebrowProps {
  children: string;
}

export function Eyebrow({ children }: EyebrowProps) {
  return (
    <div className="eyebrow">
      {children}
    </div>
  );
}
