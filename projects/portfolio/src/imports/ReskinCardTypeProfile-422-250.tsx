import img190616BhWmSlt02BackdropJamesFisher36081 from "figma:asset/8556d4d0c62cc9d48200a04aa20b6d7db121d22f.png";

function Image() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px overflow-clip relative w-full" data-name="image">
      <div className="-translate-x-1/2 absolute aspect-[267/175] bottom-0 left-[calc(50%+0.61px)] top-[-1.45px]" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-0 max-w-none top-0 w-full object-cover" src={img190616BhWmSlt02BackdropJamesFisher36081} />
        </div>
      </div>
    </div>
  );
}

function ProfileEyebrow() {
  return (
    <div className="h-[22.071px] relative shrink-0 w-full" data-name="Profile-eyebrow">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-0 leading-[17.984px] not-italic text-[#1d890a] text-[13.079px] tracking-[1.6349px] uppercase whitespace-pre-wrap">Profile</p>
    </div>
  );
}

function Text() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Text">
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[16px] relative size-full">
        <ProfileEyebrow />
        <p className="font-['DIN_OT:Bold',sans-serif] leading-[27px] not-italic relative shrink-0 text-[#4e4f58] text-[20px] w-full whitespace-pre-wrap">Jim Fish, CEO</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic overflow-hidden relative shrink-0 text-[#67696d] text-[14px] text-ellipsis w-full whitespace-nowrap">Watch Jim Fish talk about WM's commitment to sustainability and environmental stewardship</p>
        <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
          <p className="[text-decoration-skip-ink:none] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#1d890a] text-[14px] underline whitespace-pre-wrap">Learn More</p>
          <p className="[text-decoration-skip-ink:none] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#1d890a] text-[14px] underline whitespace-pre-wrap">View Video</p>
        </div>
      </div>
    </div>
  );
}

export default function ReskinCardTypeProfile() {
  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="Reskin Card type / Profile">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Image />
        <Text />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f8f8f8] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
}
