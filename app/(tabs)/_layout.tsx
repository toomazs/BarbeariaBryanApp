import { Tabs, useRouter } from 'expo-router';
import { Bell, Calendar, CalendarDays, Home, Scissors, User } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const BotaoNotificacao = () => {
  return (
    <TouchableOpacity style={estilos.botaoNotificacao}>
      <Bell color="#FFFFFF" size={24} />
      <View style={estilos.seloNotificacao} />
    </TouchableOpacity>
  );
};

export default function LayoutDeAbas() {
  const roteador = useRouter();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#6B7280',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#000000',
            borderTopColor: '#374151',
            paddingBottom: 5,
            height: 70,
            borderTopWidth: 1,
            elevation: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginBottom: 2,
          },
        }}>
        
        <Tabs.Screen
          name="index"
          options={{
            title: 'Início',
            tabBarIcon: ({ color }) => <Home color={color} size={24} />,
          }}
        />
        
        <Tabs.Screen
          name="barbeiros"
          options={{
            title: 'Barbeiros',
            tabBarIcon: ({ color }) => <Scissors color={color} size={24} />,
          }}
        />
        
        <Tabs.Screen
          name="agendar"
          options={{
            tabBarLabel: () => null,
            tabBarButton: () => (
              <TouchableOpacity
                style={estilos.containerBotaoCentral}
                onPress={() => roteador.push('/agendar')}
              >
                <View style={estilos.botaoCentral}>
                  <View style={estilos.mioloBotaoCentral}>
                    <Calendar color="#000000" size={28} />
                  </View>
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        
        <Tabs.Screen
          name="horarios"
          options={{
            title: 'Horários',
            tabBarIcon: ({ color }) => <CalendarDays color={color} size={24} />,
          }}
        />
        
        <Tabs.Screen
          name="info"
          options={{
            title: 'Informações',
            tabBarIcon: ({ color }) => <User color={color} size={24} />,
          }}
        />
      </Tabs>
      
      <BotaoNotificacao />
    </>
  );
}

const estilos = StyleSheet.create({
  containerBotaoCentral: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoCentral: {
    top: -25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#000000',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 4,
    borderColor: '#000000',
  },
  mioloBotaoCentral: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  botaoNotificacao: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 2,
    borderColor: '#374151',
    zIndex: 1000,
  },
  seloNotificacao: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#000000',
  },
});
