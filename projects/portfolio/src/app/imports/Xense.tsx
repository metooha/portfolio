import imgXense from "figma:asset/1ea8d1f27e915c6e54282fce05a4bfbf9fd1b925.png";

export default function Xense() {
  return (
    <div className="bg-black relative size-full" data-name="xense">
      <div className="absolute inset-[13.33%_0_-0.04%_7.69%] rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" data-name="xense">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgXense} />
      </div>
    </div>
  );
}