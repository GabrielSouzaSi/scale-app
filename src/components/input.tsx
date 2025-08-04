import { TextInput, TextInputProps } from "react-native";
import clsx from "clsx";

type Variants = "primary" | "secundary";

type InputProps = TextInputProps & {
  variant?: Variants;
};

function Field({ className, variant = "secundary", ...rest }: InputProps) {
  return (
    <TextInput
      className={clsx(
        "h-16 border-gray-400 border-2 font-semiBold text-lg rounded-md px-4 text-black",
        { "focus:border-blue-500": variant === "primary" },
        { "focus:border-slate-800": variant === "secundary" },
        className
      )}
      placeholderTextColor="#000"
      {...rest}
    />
  );
}

export { Field };
