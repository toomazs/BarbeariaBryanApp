import { useRouter } from 'expo-router';
import { Calendar, Clock, Heart, Scissors, Star } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { StyledText as Text } from '../../components/StyledText';

const { width } = Dimensions.get('window');

interface Barbeiro {
  id: number;
  nome: string;
  imagem: string;
  especialidade: string;
  avaliacao: number;
  experiencia: string;
  status: string;
}

export const barbeiros: Barbeiro[] = [
  { id: 1, nome: 'Bryan Gonçalves', imagem: 'https://d2zdpiztbgorvt.cloudfront.net/region1/br/123287/resource_photos/fc6063207d224cd8ab0db8ef2c422f-barbearia-bryan-bryan-goncalves-6dc0088f30d648a5851b1d374bad65-booksy.jpeg', especialidade: 'Especialista Premium', avaliacao: 5.0, experiencia: '8 anos', status: 'disponivel' },
  { id: 2, nome: 'Allan Corleone', imagem: 'https://d2zdpiztbgorvt.cloudfront.net/region1/br/123287/resource_photos/4e56f59ebf0243b899ec00ef446a39-barbearia-bryan-allan-corleone-506dc1d586604993ab4f2acae5b75e-booksy.jpeg', especialidade: 'Barbeiro Profissional', avaliacao: 4.9, experiencia: '5 anos', status: 'disponivel' },
  { id: 3, nome: 'Gustavo Galdino', imagem: 'https://d2zdpiztbgorvt.cloudfront.net/region1/br/123287/resource_photos/8555661abc264c8786e6e8a3146a59-barbearia-bryan-gustavo-galdino-a7a3f23aed24431a8471d65edd5e29-booksy.jpeg', especialidade: 'Especialista em Fade', avaliacao: 4.8, experiencia: '4 anos', status: 'disponivel' },
  { id: 4, nome: 'Rhian Correa', imagem: 'https://d2zdpiztbgorvt.cloudfront.net/region1/br/123287/resource_photos/415527d169044b4b862dd04c067e45-barbearia-bryan-rhian-7d41a5b2ec944c32a9a311b4fd9e2b-booksy.jpeg', especialidade: 'Barbeiro Artístico', avaliacao: 4.9, experiencia: '6 anos', status: 'disponivel' },
  { id: 5, nome: 'Gerson Souza', imagem: 'https://d2zdpiztbgorvt.cloudfront.net/region1/br/123287/resource_photos/143c6e0a6ebc4af5974db451261e13-barbearia-bryan-gerson-01d6766983724634b023cfabba0411-booksy.jpeg', especialidade: 'Barbeiro Tradicional', avaliacao: 4.7, experiencia: '10 anos', status: 'disponivel' }
];

const galeriasBarbeiros: { [key: number]: string[] } = {
  1: [
    "https://i.imgur.com/xCHdv2Q.png", "https://i.imgur.com/q7O1W5k.png",
    "https://i.imgur.com/r3zrNIo.png", "https://i.imgur.com/wNKHQUX.png"
  ],
  2: [
    "https://i.imgur.com/aeqkXbH.png", "https://i.imgur.com/At11cGI.png",
    "https://i.imgur.com/qW38WK2.png", "https://i.imgur.com/TO8liY0.png"
  ],
  3: [
    "https://i.imgur.com/yjE4cgp.jpeg", "https://i.imgur.com/4wTVkK8.png",
    "https://i.imgur.com/zlCuRMa.png", "https://i.imgur.com/JqV8La5.png"
  ],
  4: [
    "https://i.imgur.com/xCHdv2Q.png", "https://i.imgur.com/q7O1W5k.png",
    "https://i.imgur.com/r3zrNIo.png", "https://i.imgur.com/wNKHQUX.png"
  ],
  5: [
    "https://i.imgur.com/aeqkXbH.png", "https://i.imgur.com/At11cGI.png",
    "https://i.imgur.com/qW38WK2.png", "https://i.imgur.com/TO8liY0.png"
  ]
};

const descricoesBarbeiros: { [key: number]: string } = {
  1: 'Especialista Premium com mais de 8 anos de experiência. Domino técnicas avançadas de visagismo e cortes clássicos, sempre buscando o estilo perfeito para cada cliente.',
  2: 'Barbeiro profissional apaixonado por técnicas modernas e estilos únicos. Especializado em cortes contemporâneos e atendimento personalizado.',
  3: 'Mestre em fade e degradês perfeitos. Com 4 anos de experiência, transformo cada corte em uma obra de arte com precisão e criatividade.',
  4: 'Barbeiro artístico focado em criações únicas e personalizadas. Cada corte é uma expressão da personalidade do cliente.',
  5: 'Barbeiro tradicional com 10 anos de experiência. Especialista em técnicas clássicas e cuidados tradicionais com barba e cabelo.'
};

const CartaoApresentacaoBarbeiro = ({ barbeiro, eFavorito, aoAlternarFavorito }: any) => {
    const router = useRouter();
    const nomeCurto = barbeiro.nome.split(' ')[0];
    const galeria = galeriasBarbeiros[barbeiro.id] || [];
    const descricao = descricoesBarbeiros[barbeiro.id] || 'Barbeiro profissional dedicado ao seu estilo.';

    return (
        <View style={estilos.cartaoApresentacao}>
            <View style={estilos.cabecalhoCartao}>
                <View style={estilos.containerImagem}>
                    <Image source={{ uri: barbeiro.imagem }} style={estilos.imagemPerfil} />
                    <View style={[estilos.seloStatus, { backgroundColor: barbeiro.status === 'disponivel' ? '#22C55E' : '#EF4444' }]}>
                        <Text style={estilos.textoStatus}>
                            {barbeiro.status === 'disponivel' ? 'Disponível' : 'Ocupado'}
                        </Text>
                    </View>
                </View>
                
                <View style={estilos.containerTextoCabecalho}>
                    <Text style={estilos.nomeBarbeiro}>{barbeiro.nome}</Text>
                    <Text style={estilos.textoEspecialidade}>{barbeiro.especialidade}</Text>
                    
                    <View style={estilos.containerEstatisticas}>
                        <View style={estilos.containerAvaliacao}>
                            <Star fill="#FFD700" color="#FFD700" size={16} />
                            <Text style={estilos.textoAvaliacao}>{barbeiro.avaliacao.toFixed(1)}</Text>
                        </View>
                        
                        <View style={estilos.containerExperiencia}>
                            <Clock color="#666" size={14} />
                            <Text style={estilos.textoExperiencia}>{barbeiro.experiencia}</Text>
                        </View>
                    </View>
                </View>
                
                <TouchableOpacity style={estilos.botaoCoracao} onPress={aoAlternarFavorito}>
                    <Heart 
                        size={24} 
                        color={eFavorito ? '#EF4444' : '#666'} 
                        fill={eFavorito ? '#EF4444' : 'transparent'} 
                    />
                </TouchableOpacity>
            </View>

            <View style={estilos.secao}>
                <Text style={estilos.tituloSecao}>Sobre o Profissional</Text>
                <Text style={estilos.textoDescricao}>{descricao}</Text>
            </View>

            {galeria.length > 0 && (
                <View style={estilos.secao}>
                    <Text style={estilos.tituloSecao}>Cortes</Text>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false} 
                        contentContainerStyle={estilos.scrollViewGaleria}
                    >
                        {galeria.map((fotoUrl: string, index: number) => (
                            <View key={index} style={estilos.containerImagemGaleria}>
                                <Image source={{ uri: fotoUrl }} style={estilos.imagemGaleria} />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )}

            <TouchableOpacity 
                style={[estilos.botaoAgendar, { opacity: barbeiro.status === 'disponivel' ? 1 : 0.6 }]} 
                onPress={() => router.push('/(tabs)/agendar')}
                disabled={barbeiro.status !== 'disponivel'}
            >
                <Calendar color="#000" size={20} />
                <Text style={estilos.textoBotaoAgendar}>
                    {barbeiro.status === 'disponivel' ? `Agendar com ${nomeCurto}` : 'Indisponível'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default function TelaEquipe() {
    const [favoritos, setFavoritos] = useState(new Set<number>());

    const alternarFavorito = (id: number) => {
        setFavoritos(prev => {
            const novosFavoritos = new Set(prev);
            novosFavoritos.has(id) ? novosFavoritos.delete(id) : novosFavoritos.add(id);
            return novosFavoritos;
        });
    };

    return (
        <ScrollView style={estilos.container} showsVerticalScrollIndicator={false}>
            <View style={estilos.cabecalho}>
                <Scissors size={36} color="#DAB362" />
                <Text style={estilos.tituloPrincipal}>Barbeiros</Text>
                <Text style={estilos.subtitulo}>
                    Profissionais especializados em realçar o seu melhor estilo.
                </Text>
            </View>

            <View style={estilos.containerEquipe}>
                {barbeiros.map(barbeiro => (
                    <CartaoApresentacaoBarbeiro
                        key={barbeiro.id}
                        barbeiro={barbeiro}
                        eFavorito={favoritos.has(barbeiro.id)}
                        aoAlternarFavorito={() => alternarFavorito(barbeiro.id)}
                    />
                ))}
            </View>

            <View style={estilos.rodape}>
                <Text style={estilos.textoRodape}>
                    Todos os nossos profissionais são certificados e experientes
                </Text>
            </View>
        </ScrollView>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    cabecalho: {
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 24,
    },
    tituloPrincipal: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 16,
        textAlign: 'center',
    },
    subtitulo: {
        fontSize: 16,
        color: '#CCCCCC',
        marginTop: 12,
        textAlign: 'center',
        lineHeight: 22,
    },
    containerEquipe: {
        paddingHorizontal: 16,
    },
    cartaoApresentacao: {
        backgroundColor: '#1A1A1A',
        borderRadius: 20,
        marginBottom: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: '#333333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    cabecalhoCartao: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    containerImagem: {
        position: 'relative',
    },
    imagemPerfil: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#333333',
    },
    seloStatus: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#1A1A1A',
    },
    textoStatus: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    containerTextoCabecalho: {
        flex: 1,
        marginLeft: 16,
        marginRight: 8,
    },
    nomeBarbeiro: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    textoEspecialidade: {
        color: '#CCCCCC',
        fontSize: 14,
        marginBottom: 8,
    },
    containerEstatisticas: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    containerAvaliacao: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    textoAvaliacao: {
        color: '#FFD700',
        fontWeight: 'bold',
        fontSize: 14,
    },
    containerExperiencia: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    textoExperiencia: {
        color: '#CCCCCC',
        fontSize: 12,
    },
    botaoCoracao: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#333333',
    },
    secao: {
        marginBottom: 20,
    },
    tituloSecao: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    textoDescricao: {
        color: '#CCCCCC',
        fontSize: 15,
        lineHeight: 22,
    },
    scrollViewGaleria: {
        paddingLeft: 4,
    },
    containerImagemGaleria: {
        marginRight: 12,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#333333',
    },
    imagemGaleria: {
        width: 140,
        height: 160,
    },
    botaoAgendar: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        paddingVertical: 16,
        borderRadius: 12,
        marginTop: 8,
    },
    textoBotaoAgendar: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    rodape: {
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 24,
    },
    textoRodape: {
        color: '#CCCCCC',
        fontSize: 14,
        textAlign: 'center',
        fontStyle: 'italic',
    },
});
