import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Linking,
  StatusBar,
} from "react-native";
import { FilePdfIcon } from "phosphor-react-native/src/icons/FilePdf";
import { useRouter } from "expo-router";
import { HeaderBack } from "@/components/headerBack";

interface Bulletin {
  id: string;
  title: string;
  date: string;
  pdfUrl: string;
}

const mockBulletins: Bulletin[] = [
  {
    id: "1",
    title: "Boletim Diário - 30/07/2025",
    date: "2025-07-30",
    pdfUrl: "https://example.com/boletim-30-07-2025.pdf",
  },
  {
    id: "2",
    title: "Boletim Diário - 29/07/2025",
    date: "2025-07-29",
    pdfUrl: "https://example.com/boletim-29-07-2025.pdf",
  },
  {
    id: "3",
    title: "Boletim Especial - Feriado",
    date: "2025-07-28",
    pdfUrl: "https://example.com/boletim-feriado.pdf",
  },
];

export default function Boletins() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [bulletins] = useState<Bulletin[]>(mockBulletins);

  const filtered = bulletins.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const openPdf = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      alert("Não foi possível abrir o link do PDF.");
    }
  };

  return (
    <View className="flex-1">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={false}
      />

      {/* Cabeçalho */}
      <HeaderBack title="Boletins" />

      <View className="flex-1 px-5 py-3 bg-gray-50">
        {/* Campo de busca */}
        <TextInput
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 text-base"
          placeholder="Buscar boletim..."
          value={search}
          onChangeText={setSearch}
        />

        {/* Lista */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text className="text-gray-500 text-center mt-10">
              Nenhum boletim encontrado.
            </Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => openPdf(item.pdfUrl)}
              className="flex-row items-center justify-between bg-gray-100 p-4 rounded-md mb-3"
            >
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-800">
                  {item.title}
                </Text>
                <Text className="text-sm text-gray-500">{item.date}</Text>
              </View>
              <FilePdfIcon size={24} color="#ef4444" />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
