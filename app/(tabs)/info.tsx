import { Clock, Instagram, LogOut, MapPin, MessageCircle, Navigation, User } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
    Alert,
    Animated,
    Image,
    ImageBackground,
    Linking,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { StyledText as Text } from '../../components/StyledText';


export default function TelaContato() {
    const animacaoFade = useRef(new Animated.Value(0)).current;
    const animacaoSlide = useRef(new Animated.Value(50)).current;
    const animacaoScale = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(animacaoFade, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(animacaoSlide, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(animacaoScale, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const horarios = [
        { dia: 'Segunda', horas: 'Fechado', aberto: false },
        { dia: 'Terça-feira', horas: '09:00 - 20:00', aberto: true },
        { dia: 'Quarta-feira', horas: '09:00 - 20:00', aberto: true },
        { dia: 'Quinta-feira', horas: '09:00 - 20:00', aberto: true },
        { dia: 'Sexta-feira', horas: '08:00 - 21:00', aberto: true },
        { dia: 'Sábado', horas: '08:00 - 19:00', aberto: true },
        { dia: 'Domingo', horas: '09:00 - 14:00', aberto: true }
    ];

    const estatisticas = [
        { numero: '1200+', rotulo: 'Clientes' },
        { numero: '5', rotulo: 'Barbeiros' },
        { numero: '3', rotulo: 'Anos' }
    ];

    const abrirLink = (url:string) => {
        Linking.openURL(url).catch(() => Alert.alert("Erro", "Não foi possível abrir o link."));
    }

    const lidarComLogout = () => {
        Alert.alert(
            "Deslogar",
            "Tem certeza que deseja sair?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Sair", onPress: () => console.log("Usuário deslogado") }
            ]
        );
    }

    return (
        <ScrollView style={estilos.container}>
            <View style={estilos.cabecalho}>
                <User size={36} color="#DAB362" />
                <Text bold style={estilos.tituloPrincipal}>Informações</Text>
                <Text style={estilos.subtitulo}>
                    Veja nossas informações ou deslogue da sua conta.
                </Text>
            </View>

            <Animated.View style={[
                estilos.cartao,
                {
                    opacity: animacaoFade,
                    transform: [{ scale: animacaoScale }]
                }
            ]}>
                <View style={estilos.cabecalhoCartao}>
                    <MessageCircle color="white" size={20} />
                    <Text bold style={estilos.tituloCartao}>Redes Sociais e Contato</Text>
                </View>
                <View style={estilos.grupoInfo}>
                    <TouchableOpacity onPress={() => abrirLink('https://wa.me/5511949643319')} style={estilos.linhaInfo}>
                        <MessageCircle size={18} color="#25D366" />
                        <View>
                            <Text style={estilos.textoInfo}>(11) 94964-3319</Text>
                            <Text style={estilos.subtextoInfo}>WhatsApp</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => abrirLink('https://instagram.com/barbearia_bryan_')} style={estilos.linhaInfo}>
                        <Instagram size={18} color="#E1306C" />
                        <View>
                            <Text style={estilos.textoInfo}>@barbearia_bryan_</Text>
                            <Text style={estilos.subtextoInfo}>Instagram</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>

            <Animated.View style={[
                estilos.cartao,
                {
                    opacity: animacaoFade,
                    transform: [{ translateY: animacaoSlide }]
                }
            ]}>
                <View style={estilos.cabecalhoCartao}>
                    <MapPin color="white" size={20} />
                    <Text bold style={estilos.tituloCartao}>Localização</Text>
                </View>
                <Text style={estilos.textoEndereco}>Av. Prof. Manoel José Pedroso, 503{"\n"}Cotia - SP, 06703-270</Text>
                
                <View style={estilos.containerMiniMapa}>
                    <ImageBackground 
                        source={{ uri: 'https://i.imgur.com/Mpx3pVx.png' }}
                        style={estilos.miniMapa}
                    >
                        <View style={estilos.sobreposicaoMapa}>
                            <Image 
                                source={require('../../assets/images/bryanlogo.png')}
                                style={estilos.logoMapa}
                            />
                        </View>
                    </ImageBackground>
                </View>

                <View style={estilos.containerBotoes}>
                    <TouchableOpacity onPress={() => abrirLink('http://maps.google.com/?q=Av. Prof. Manoel José Pedroso, 503, Cotia')} style={[estilos.botao, estilos.botaoPrimario]}>
                        <Navigation size={16} color="#000" />
                        <Text bold style={estilos.textoBotaoPrimario}>Abrir no Maps</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => abrirLink('https://ul.waze.com/ul?place=ChIJNZ_X1ogHz5QRoP4LLcF_w_Q&ll=-23.60757080%2C-46.92199700&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location')} 
                        style={[estilos.botao, estilos.botaoWaze]}
                    >
                        <Navigation size={16} color="#fff" />
                        <Text bold style={estilos.textoBotaoWaze}>Abrir no Waze</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>

            <Animated.View style={[
                estilos.cartao,
                {
                    opacity: animacaoFade,
                    transform: [{ scale: animacaoScale }]
                }
            ]}>
                <View style={estilos.cabecalhoCartao}>
                    <Clock color="white" size={20} />
                    <Text bold style={estilos.tituloCartao}>Horário de Funcionamento</Text>
                </View>
                <View style={estilos.containerHorarios}>
                    {horarios.map(horario => (
                        <View key={horario.dia} style={estilos.linhaHorario}>
                            <Text style={estilos.textoDia}>{horario.dia}</Text>
                            <Text bold style={[estilos.textoHoras, horario.aberto ? estilos.horasAberto : estilos.horasFechado]}>{horario.horas}</Text>
                        </View>
                    ))}
                </View>
            </Animated.View>

            <Animated.View style={[
                estilos.cartao,
                {
                    opacity: animacaoFade,
                    transform: [{ translateY: animacaoSlide }]
                }
            ]}>
                <Text bold style={estilos.tituloCartao}>Sobre a Barbearia</Text>
                <Text style={estilos.textoSobre}>
                    A Bryan Barbearia oferece os melhores serviços de corte e barba em Cotia. 
                    Com mais de 3 anos de experiência, nossa equipe de profissionais qualificados 
                    garante qualidade e excelência em cada atendimento.
                </Text>
                <View style={estilos.containerEstatisticas}>
                    {estatisticas.map(estatistica => (
                        <View key={estatistica.rotulo} style={estilos.caixaEstatistica}>
                            <Text bold style={estilos.numeroEstatistica}>{estatistica.numero}</Text>
                            <Text style={estilos.rotuloEstatistica}>{estatistica.rotulo}</Text>
                        </View>
                    ))}
                </View>
            </Animated.View>

            <Animated.View style={[
                estilos.cartaoPerfil,
                {
                    opacity: animacaoFade,
                    transform: [{ translateY: animacaoSlide }]
                }
            ]}>
                <Image 
                    source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }}
                    style={estilos.imagemPerfil}
                />
                <View style={estilos.infoPerfil}>
                    <Text bold style={estilos.nomePerfil}>Eduardo Tomaz</Text>
                    <Text style={estilos.emailPerfil}>mock@email.com</Text>
                </View>
                <TouchableOpacity onPress={lidarComLogout} style={estilos.botaoSair}>
                    <LogOut size={22} color="#f87171" />
                </TouchableOpacity>
            </Animated.View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const estilos = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
    },
    cabecalho: {
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 24,
    },
    tituloPrincipal: {
        fontSize: 32,
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
    cartaoPerfil: {
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 24,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#333',
        flexDirection: 'row',
        alignItems: 'center',
    },
    imagemPerfil: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    infoPerfil: {
        flex: 1,
    },
    nomePerfil: {
        color: '#fff',
        fontSize: 18,
    },
    emailPerfil: {
        color: '#999',
        fontSize: 14,
    },
    botaoSair: {
        padding: 10,
    },
    cartao: {
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 20,
        marginHorizontal: 24,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#333',
    },
    cabecalhoCartao: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    tituloCartao: {
        fontSize: 18,
        color: '#fff',
    },
    grupoInfo: {
        gap: 12,
    },
    linhaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#333',
    },
    textoInfo: {
        color: '#fff',
    },
    subtextoInfo: {
        color: '#999',
        fontSize: 12,
    },
    textoEndereco: {
        color: '#ccc',
        lineHeight: 20,
        marginBottom: 16,
    },
    containerMiniMapa: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    miniMapa: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sobreposicaoMapa: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoMapa: {
        width: 120,
        height: 60,
        borderRadius: 200,
    },
    containerBotoes: {
        flexDirection: 'row',
        gap: 12,
    },
    botao: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    botaoPrimario: {
        backgroundColor: '#fff',
    },
    textoBotaoPrimario: {
        color: '#000',
    },
    botaoWaze: {
        backgroundColor: '#05c8f7',
    },
    textoBotaoWaze: {
        color: '#fff',
    },
    containerHorarios: {
        gap: 8,
    },
    linhaHorario: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#333',
    },
    textoDia: {
        color: '#ccc',
    },
    textoHoras: {
        fontWeight: '500',
    },
    horasAberto: {
        color: '#4ade80',
    },
    horasFechado: {
        color: '#f87171',
    },
    textoSobre: {
        color: '#ccc',
        lineHeight: 22,
        marginBottom: 20,
    },
    containerEstatisticas: {
        flexDirection: 'row',
        gap: 12,
    },
    caixaEstatistica: {
        flex: 1,
        backgroundColor: '#333',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    numeroEstatistica: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 4,
    },
    rotuloEstatistica: {
        fontSize: 12,
        color: '#999',
    }
});
