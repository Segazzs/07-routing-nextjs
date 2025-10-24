"use client";
interface SearchBoxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function SearchBox({ onChange, value }: SearchBoxProps) {
  return (
    <input
      type="text"
      placeholder="Search notes"
      onChange={onChange}
      value={value}
    />
  );
}
