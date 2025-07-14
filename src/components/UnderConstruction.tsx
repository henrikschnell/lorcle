import LorcleLogo from "@/components/Logo";

type Props = {
    logoClick: () => void;
}

export default function UnderConstruction({ logoClick }: Props) {
  return (
    <div className="flex flex-col items-center gap-10">
        <LorcleLogo onClick={logoClick} />
        <span className="text-primary font-bold text-xl">This page is currently under construction</span>
    </div>
  );
}