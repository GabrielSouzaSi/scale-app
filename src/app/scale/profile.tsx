import React from "react";
import { View, Text, Image, ScrollView, StatusBar } from "react-native";
import { UserCircleIcon } from "phosphor-react-native/src/icons/UserCircle";
import { useRouter } from "expo-router";
import { HeaderBack } from "@/components/headerBack";

const mockUser = {
  id: "1",
  name: "Gabriel Souza",
  registration: "123456",
  role: "Auxiliar de Serviços Administrativos",
  department: "Departamento de Recursos Humanos",
  email: "gabriel.souza@smsop.gov.br",
  phone: "(95) 99999-9999",
  avatarUrl: undefined,
};

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View className="flex-1">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={false}
      />

      {/* Cabeçalho */}
      <HeaderBack title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Avatar */}
        <View className="items-center mb-5">
          {mockUser.avatarUrl ? (
            <Image
              source={{ uri: mockUser.avatarUrl }}
              className="w-24 h-24 rounded-full"
            />
          ) : (
            <View className="w-24 h-24 rounded-full bg-gray-200 items-center justify-center">
              <UserCircleIcon size={72} color="#6b7280" />
            </View>
          )}
          <Text className="text-xl font-bold text-gray-800 mt-3">
            {mockUser.name}
          </Text>
          <Text className="text-sm text-gray-500">{mockUser.role}</Text>
        </View>

        {/* Informações */}
        <View className="mx-5 bg-gray-50 rounded-xl shadow-sm p-4 space-y-4 border border-gray-100">
          <Info label="Matrícula" value={mockUser.registration} />
          <Info label="Setor" value={mockUser.department} />
          <Info label="E-mail" value={mockUser.email} />
          <Info label="Telefone" value={mockUser.phone} />
        </View>
      </ScrollView>
    </View>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View>
      <Text className="text-xs text-gray-500 uppercase font-semibold mb-1">
        {label}
      </Text>
      <Text className="text-base text-gray-800">{value}</Text>
    </View>
  );
}
