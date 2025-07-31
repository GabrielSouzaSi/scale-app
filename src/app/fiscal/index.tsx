import React from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HeaderBack } from "@/components/headerBack";
import { Section } from "@/components/section";
// import { Calendar } from "@/components/calendar";
import { colors } from "@/styles/colors";
import { useEffect, useState } from "react";
import { server } from "@/server/api";
import { useAuth } from "@/hooks/useAuth";
import { Modal } from "@/components/modal";
import { Calendar } from "@/components/calendar";
import { Loading } from "@/components/loading";
import { HeaderMenu } from "@/components/headerMenu";

interface Shift {
  id: number;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
}

interface Status {
  id: number;
  name: string;
  description: string;
}

interface Team {
  id: number;
  name: string;
}

interface Tasks {
  id: number;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
}

interface ScheduleItem {
  id: number;
  user_id: number;
  team_id: number;
  shift_id: number;
  status_id: number;
  reasons_id: number;
  scales_id: number;
  date: string;
  permuta: string | null;
  signed: boolean;
  created_at: string;
  updated_at: string;
  shift: Shift;
  status: Status;
  team: Team;
  tasks: Tasks[];
}

export default function HomeScale() {
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [markedDates, setMarkedDates] = useState<any>();
  const [selectedDay, setSelectedDay] = useState<ScheduleItem>();
  const [isVisible, setIsVisible] = useState(false);
  const [firstDate, setFirstDate] = useState<string>();
  const [lastDate, setLastDate] = useState<string>();

  const currentDate = new Date();

  function statusColors(status: number) {
    if (status == 1) return "#4CAF50";
    if (status == 2) return "#F44336";
    if (status == 3) return "#FFC107";
    if (status == 4) return "#00BCD4";
    if (status == 5) return "#2196F3";
  }

  const transformData = (data: ScheduleItem[]) => {
    const markDates: { [key: string]: any } = {};

    data.forEach((event) => {
      markDates[event.date] = {
        customStyles: {
          container: {
            backgroundColor: statusColors(event.status.id),
          },
          text: {
            color: "#000",
            fontWeight: "bold",
          },
        },
      };
    });

    return markDates;
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 🆕 Quando o usuário troca de mês no calendário
  function handleMonthChange(month: { year: number; month: number }) {
    const firstDay = new Date(month.year, month.month - 1, 1);
    const lastDay = new Date(month.year, month.month, 0);
    setFirstDate(formatDate(firstDay));
    setLastDate(formatDate(lastDay));
  }

  async function getListDates() {
    setIsLoaded(true);
    try {
      const { data } = await server.get(
        `/schedules/user/${user.id}?start_date=${firstDate}&end_date=${lastDate}`
      );
      setMarkedDates(transformData(data));
    } catch (error: any) {
      if (error.message) {
        Alert.alert("Aviso", "Sem informações cadastradas!");
      }
      // console.log(error);
    } finally {
      setIsLoaded(false);
    }
  }

  async function onDayPress(day: any) {
    setIsLoaded(true);
    try {
      const { data } = await server.get(
        `/schedules/user/${user.id}/date/${day.dateString}`
      );
      setSelectedDay(data);
      setIsVisible(true);
    } catch (error: any) {
      if (error.message) {
        Alert.alert("Aviso", "Sem informações cadastradas!");
      }
      // console.log(error);
    } finally {
      setIsLoaded(false);
    }
  }

  const data = [
    { key: "1", label: "Trabalhando", color: "#4CAF50", letter: "T" },
    { key: "2", label: "DRS / Folga", color: "#F44336", letter: "D" },
    { key: "3", label: "Férias", color: "#FFC107", letter: "F" },
    { key: "4", label: "Licença", color: "#00BCD4", letter: "L" },
    { key: "5", label: "Plantão", color: "#2196F3", letter: "P" },
  ];

  const convertDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  // Inicializa com o mês atual
  useEffect(() => {
    const now = new Date();
    handleMonthChange({ year: now.getFullYear(), month: now.getMonth() + 1 });
  }, []);

  // Busca os dados sempre que as datas forem atualizadas
  useEffect(() => {
    if (firstDate && lastDate) {
      getListDates();
    }
  }, [firstDate, lastDate]);

  return (
    <View className="flex-1">
      <HeaderMenu />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <Calendar
          markedDates={markedDates || {}}
          markingType="custom"
          onDayPress={onDayPress}
          onMonthChange={handleMonthChange}
        />
        {markedDates && (
          <View className="p-5">
            <FlatList
              data={data}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <View className="flex-row items-center my-2.5 gap-1">
                  <View
                    className="w-8 h-8 rounded-2xl items-center justify-center"
                    style={{ backgroundColor: item.color }}
                  >
                    <Text style={styles.circleText}>{item.letter}</Text>
                  </View>
                  <Text style={styles.label}>{item.label}</Text>
                </View>
              )}
              horizontal={false}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </ScrollView>

      <Modal
        variant="primary"
        visible={isVisible}
        onClose={() => setIsVisible(false)}
      >
        {selectedDay?.id && (
          <View className="flex-1">
            <Text className="mb-4 text-gray-500 font-regular text-2xl font-bold">
              Escala {convertDate(selectedDay?.date)}
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10 }}
            >
              <View className="bg-white rounded-md p-2 border-2 border-gray-300 mb-4">
                <View className="flex flex-row justify-between mb-4 gap-4">
                  <View className="flex-1">
                    <Text className="text-gray-500 font-regular text-2xl font-bold">
                      Turno:
                    </Text>
                    <View className="bg-gray-300 rounded-md p-3">
                      <Text className="font-semiBold text-lg">
                        {selectedDay?.shift.description}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-500 font-regular text-2xl font-bold">
                      Horário:
                    </Text>
                    <View className="bg-gray-300 rounded-md p-3">
                      <Text className="font-semiBold text-lg">
                        {selectedDay?.shift.start_time.slice(0, 5)}/
                        {selectedDay?.shift.end_time.slice(0, 5)}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="flex flex-row justify-between mb-4 gap-4">
                  <View className="flex-1">
                    <Text className="text-gray-500 font-regular text-2xl font-bold">
                      Status:
                    </Text>
                    <View className="bg-gray-300 rounded-md p-3">
                      <Text className="font-semiBold text-lg">
                        {selectedDay?.status.description}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-500 font-regular text-2xl font-bold">
                      Equipe:
                    </Text>
                    <View className="bg-gray-300 rounded-md p-3">
                      <Text className="font-semiBold text-lg">
                        {selectedDay?.team.name}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="flex flex-row justify-between mb-4 gap-4">
                  <View className="flex-1">
                    <Text className="text-gray-500 font-regular text-2xl font-bold">
                      Demandas:
                    </Text>
                    <FlatList
                      data={selectedDay.tasks}
                      keyExtractor={(item) => item.name}
                      renderItem={({ item }) => (
                        <Text className="text-lg font-semiBold">
                          {item.description}/{item.start_time.slice(0, 5)}-
                          {item.end_time.slice(0, 5)}
                        </Text>
                      )}
                      horizontal={false}
                      scrollEnabled={false}
                      showsVerticalScrollIndicator={false}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </Modal>

      {isLoaded ? <Loading /> : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  circleText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
});
