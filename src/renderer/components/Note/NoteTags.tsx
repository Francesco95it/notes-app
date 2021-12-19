import ReactTagInput from '@pathofdev/react-tag-input';
import '@pathofdev/react-tag-input/build/index.css';

type Props = {
  tags: string[];
  onChange: (tags: string[]) => void;
};

export default function NoteTags({ tags, onChange }: Props) {
  return (
    <div className="note-tags">
      <ReactTagInput tags={tags} onChange={(newTags) => onChange(newTags)} />
    </div>
  );
}
