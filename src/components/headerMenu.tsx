import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import styles from "@/styles/shadow";
import { colors } from "@/styles/colors";
import { BellIcon } from "phosphor-react-native/src/icons/Bell";
import { UserCircleIcon } from "phosphor-react-native/src/icons/UserCircle";

export function HeaderMenu() {
  const { signOut } = useAuth();
  const router = useRouter();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  function handleSignOut() {
    signOut();
  }

  function toggleDropdown() {
    setIsDropdownVisible((prev) => !prev);
  }

  return (
    <View
      className="bg-white w-full flex flex-row justify-between items-center py-3 px-5 mb-5"
      style={[styles.shadow, { position: "relative", zIndex: 10 }]} // <- adicionado zIndex
    >
      <Text className="text-xl font-bold text-gray-800">SMSOP</Text>

      <View className="flex flex-row items-center gap-3 relative">
        <TouchableOpacity
          onPress={() => router.push("/scale/notifications")}
          className="p-2 relative"
        >
          <BellIcon size={24} color={colors.zinc[700]} />
          {true && (
            <View className="w-2 h-2 bg-red-500 rounded-full absolute top-1 right-1" />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleDropdown} className="p-2">
          <UserCircleIcon size={28} color={colors.zinc[700]} />
        </TouchableOpacity>

        {isDropdownVisible && (
          <View
            className="absolute top-12 right-0 w-40 bg-white rounded-md border border-zinc-200"
            style={{
              zIndex: 9999, // <- força o dropdown a estar acima de tudo
              elevation: 10, // Android
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          >
            <Pressable
              onPress={() => {
                setIsDropdownVisible(false);
                router.push("/scale/profile");
              }}
              className="px-4 py-2 border-b border-zinc-100"
            >
              <Text className="text-zinc-700">Perfil</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setIsDropdownVisible(false);
                router.push("/scale/boletins");
              }}
              className="px-4 py-2 border-b border-zinc-100"
            >
              <Text className="text-zinc-700">Boletins</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setIsDropdownVisible(false);
                handleSignOut();
              }}
              className="px-4 py-2"
            >
              <Text className="text-red-600">Sair</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
