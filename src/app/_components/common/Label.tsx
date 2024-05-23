import { classNames } from "primereact/utils";
import React from "react";

type Props = {
  title: string;
} & React.HTMLProps<HTMLLabelElement>;

const Label = ({ title, className, ...props }: Props) => {
  return (
    <label
      className={classNames("text-900 block font-medium", className ?? "")}
      {...props}
    >
      {title}
    </label>
  );
};

export default Label;
