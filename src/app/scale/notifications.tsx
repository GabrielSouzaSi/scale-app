import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { HeaderBack } from "@/components/headerBack";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Nova escala disponível",
    message: "Sua escala de agosto já está disponível.",
    date: "2025-07-30 09:15",
    read: false,
  },
  {
    id: "2",
    title: "Atualização do sistema",
    message: "O sistema foi atualizado com melhorias de desempenho.",
    date: "2025-07-29 17:00",
    read: true,
  },
  {
    id: "3",
    title: "Lembrete de vistoria",
    message: "Você possui uma vistoria agendada para amanhã.",
    date: "2025-07-28 08:45",
    read: false,
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(mockNotifications);
  const router = useRouter();

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <View className="flex-1">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={false}
      />

      {/* Cabeçalho */}
      <HeaderBack title="Notificações" />

      {/* Lista */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => markAsRead(item.id)}
            className={`mb-3 p-4 rounded-lg border-b border-b-slate-400 ${
              item.read ? "bg-gray-100" : "bg-blue-100"
            }`}
          >
            <Text className="text-base font-semibold text-gray-800">
              {item.title}
            </Text>
            <Text className="text-sm text-gray-600 mt-1">{item.message}</Text>
            <Text className="text-xs text-gray-400 mt-2">{item.date}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
