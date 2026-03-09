import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";

interface BabysitterCardProps {
  id: number;
  name: string;
  photo: string;
  rating: number;
  hourlyRate: number;
  experience: string;
  location: string;
  onViewProfile: (id: number) => void;
}

function BabysitterCard({
  id,
  name,
  photo,
  rating,
  hourlyRate,
  experience,
  location,
  onViewProfile,
}: BabysitterCardProps) {
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        {/* Avatar */}
        <View style={{ marginRight: 12 }}>
          <Image
            source={{ uri: photo }}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 14,
              height: 14,
              backgroundColor: "#22C55E",
              borderRadius: 7,
              borderWidth: 2,
              borderColor: "white",
            }}
          />
        </View>

        {/* Info */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, color: "#2E2E2E", marginBottom: 4 }}>
            {name}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
            <FontAwesome name="star" size={14} color="#FF768A" />
            <Text style={{ marginLeft: 4, fontSize: 12 }}>{rating}</Text>
            <Text style={{ marginLeft: 6, fontSize: 12, color: "gray" }}>
              • {experience}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
            <Ionicons name="location-outline" size={14} color="gray" />
            <Text style={{ marginLeft: 4, fontSize: 12, color: "gray" }}>
              {location}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="clock" size={14} color="#886BC1" />
            <Text style={{ marginLeft: 4, fontSize: 12, color: "#886BC1" }}>
              ${hourlyRate}/hora
            </Text>
          </View>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity
        onPress={() => onViewProfile(id)}
        style={{
          marginTop: 12,
          backgroundColor: "#FF768A",
          paddingVertical: 12,
          borderRadius: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Ver perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
}

interface HomeScreenProps {
  onViewProfile: (id: number) => void;
  onNavigate: (screen: string) => void;
}

export default function HomeScreen({
  onViewProfile,
  onNavigate,
}: HomeScreenProps) {
  const babysitters = [
    {
      id: 1,
      name: "María González",
      photo:
        "https://images.unsplash.com/photo-1584446456661-1039ed1a39d7?w=200&h=200&fit=crop",
      rating: 4.9,
      hourlyRate: 15,
      experience: "5 años exp.",
      location: "Centro, Ciudad",
    },
    {
      id: 2,
      name: "Ana Rodríguez",
      photo:
        "https://images.unsplash.com/photo-1565310561974-f2dc282230d9?w=200&h=200&fit=crop",
      rating: 4.8,
      hourlyRate: 18,
      experience: "3 años exp.",
      location: "Norte, Ciudad",
    },
    {
      id: 3,
      name: "Sofia Martínez",
      photo:
        "https://images.unsplash.com/photo-1668752741330-8adc5cef7485?w=200&h=200&fit=crop",
      rating: 5.0,
      hourlyRate: 20,
      experience: "7 años exp.",
      location: "Sur, Ciudad",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: "#886BC1",
          paddingTop: 40,
          paddingHorizontal: 16,
          paddingBottom: 20,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}
      >
        <Text style={{ color: "white", fontSize: 24, marginBottom: 12 }}>
          Hola, Jairo 👋
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 10,
          }}
        >
          <Ionicons name="search" size={18} color="gray" />
          <Text style={{ marginLeft: 8, color: "gray" }}>
            Buscar niñera...
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text
          style={{
            fontSize: 18,
            color: "#2E2E2E",
            marginBottom: 12,
          }}
        >
          Niñeras disponibles
        </Text>

        {babysitters.map((b) => (
          <BabysitterCard
            key={b.id}
            {...b}
            onViewProfile={onViewProfile}
          />
        ))}
      </ScrollView>
    </View>
  );
}