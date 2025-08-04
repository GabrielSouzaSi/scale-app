import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useRouter } from "expo-router";
import clsx from "clsx";
import colors from "tailwindcss/colors";
import styles from "@/styles/shadow";
import { ArrowLeftIcon } from "phosphor-react-native/src/icons/ArrowLeft";

type Variants = "primary" | "secundary";

type Props = TouchableOpacityProps & {
  title: string;
  variant?: Variants;
};

export function HeaderBack({
  title,
  variant = "secundary",
  className,
  ...rest
}: Props) {
  const router = useRouter();
  return (
    <View
      className="bg-white w-full flex flex-row items-center py-3 mb-5"
      style={[styles.shadow, { position: "relative", zIndex: 10 }]}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        className="px-4"
        {...rest}
      >
        <ArrowLeftIcon size={24} color={colors.black} />
      </TouchableOpacity>

      <View className="flex w-full items-center justify-center absolute py-4">
        <Text
          className={clsx("font-regular text-2xl font-bold text-slate-800")}
        >
          {title}
        </Text>
      </View>
    </View>
  );
}
