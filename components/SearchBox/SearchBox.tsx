"use client";
interface SearchBoxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
}

export default function SearchBox({ onChange, text }: SearchBoxProps) {
  return (
    <input
      type="text"
      placeholder="Search notes"
      onChange={onChange}
      value={text}
    />
  );
}
