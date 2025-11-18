import type { Gems } from "~/utils/types/api";
import classNames from "classnames";

type GemCardProps = Gems & {
  selected?: boolean,
  action?: () => void
}
export default function GemCard({ name, longDescription, category, tags, action, coverImage, selected }: GemCardProps) {
  const cardImgSrc = coverImage?.formats?.thumbnail?.url
  const cardImgAltTxt = coverImage?.alternativeText

  return (<div className={classNames("max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer", selected ? "bg-amber-200" : "")} onClick={action}>
    <img src={cardImgSrc} alt={cardImgAltTxt || `thumbnail image for ${name}`} />
    <div className="p-4 py-4">
      <div className="font-bold mb-2">{name}</div>
      <p className="text-gray-700 text-base">
        {longDescription}
      </p>
    </div>
    <div className="px-6 pt-4 pb-2">
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{category}</span>
      {tags.map(tag => <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag.name}</span>)}
    </div>
  </div>);
}