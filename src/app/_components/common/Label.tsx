import React from "react";

type Props = {
  title: string;
} & React.HTMLProps<HTMLLabelElement>;

const Label = ({ title, ...props }: Props) => {
  return (
    <label className="text-900 mb-2 block font-medium" {...props}>
      {title}
    </label>
  );
};

export default Label;
