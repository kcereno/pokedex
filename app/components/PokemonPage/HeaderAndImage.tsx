import { transformToThreeDigits } from '~/utils/transformers';

type HeaderAndImageProps = {
  name: string;
  id: number;
  imgUrl: string;
};

function HeaderAndImage({ name, id, imgUrl }: HeaderAndImageProps) {
  return (
    <div className="px-6 mt-2">
      {/* Name and Number */}
      <div className="flex justify-between  items-center text-white font-bold ">
        <span className="text-4xl capitalize tracking-tight">{name}</span>
        <span className="text-xl">{`#${transformToThreeDigits(id)}`}</span>
      </div>
      {/* Image */}
      <img
        className="w-3/5 mx-auto"
        src={imgUrl}
        alt={name}
      />
    </div>
  );
}

export default HeaderAndImage;
