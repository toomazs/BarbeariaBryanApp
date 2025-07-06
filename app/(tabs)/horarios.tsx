import { useRouter } from 'expo-router';
import { AlertCircle, Calendar, CalendarDays, Clock, Star, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import { StyledText as Text } from '../../components/StyledText';


interface Servico {
    id: number;
    nome: string;
    preco: number;
}

interface Agendamento {
    id: string;
    barberId: number;
    nomeBarbeiro: string;
    imagemBarbeiro: string;
    data: string;
    horario: string;
    servicos: Servico[];
    precoTotal: number;
    status: 'confirmado' | 'passado' | 'cancelado';
    avaliacao: number;
}

// --- DADOS MOCKADOS ---
const dadosAgendamentosMock: Agendamento[] = [
    {
        id: '1',
        barberId: 1,
        nomeBarbeiro: 'Bryan Gonçalves',
        imagemBarbeiro: 'https://d2zdpiztbgorvt.cloudfront.net/region1/br/123287/resource_photos/fc6063207d224cd8ab0db8ef2c422f-barbearia-bryan-bryan-goncalves-6dc0088f30d648a5851b1d374bad65-booksy.jpeg',
        data: '2025-07-12',
        horario: '14:00',
        servicos: [
            { id: 6, nome: 'Corte + Barba', preco: 60.00 },
            { id: 5, nome: 'Sobrancelha', preco: 10.00 }
        ],
        precoTotal: 70.00,
        status: 'confirmado',
        avaliacao: 5.0,
    },
    {
        id: '2',
        barberId: 2,
        nomeBarbeiro: 'Allan Corleone',
        imagemBarbeiro: 'https://d2zdpiztbgorvt.cloudfront.net/region1/br/123287/resource_photos/4e56f59ebf0243b899ec00ef446a39-barbearia-bryan-allan-corleone-506dc1d586604993ab4f2acae5b75e-booksy.jpeg',
        data: '2025-07-15',
        horario: '11:30',
        servicos: [
            { id: 1, nome: 'Corte Clássico', preco: 40.00 }
        ],
        precoTotal: 40.00,
        status: 'confirmado',
        avaliacao: 4.9,
    },
    {
        id: '3',
        barberId: 1,
        nomeBarbeiro: 'Bryan Gonçalves',
        imagemBarbeiro: 'https://d2zdpiztbgorvt.cloudfront.net/region1/br/123287/resource_photos/fc6063207d224cd8ab0db8ef2c422f-barbearia-bryan-bryan-goncalves-6dc0088f30d648a5851b1d374bad65-booksy.jpeg',
        data: '2025-07-01',
        horario: '16:00',
        servicos: [
            { id: 8, nome: 'Corte + Barba + Sobrancelha', preco: 65.00 }
        ],
        precoTotal: 65.00,
        status: 'passado',
        avaliacao: 5.0,
    },
    {
        id: '4',
        barberId: 3,
        nomeBarbeiro: 'Gustavo Galdino',
        imagemBarbeiro: 'https://d2zdpiztbgorvt.cloudfront.net/region1/br/123287/resource_photos/8555661abc264c8786e6e8a3146a59-barbearia-bryan-gustavo-galdino-a7a3f23aed24431a8471d65edd5e29-booksy.jpeg',
        data: '2025-06-28',
        horario: '15:30',
        servicos: [
            { id: 1, nome: 'Corte Clássico', preco: 40.00 },
            { id: 3, nome: 'Barba Tradicional', preco: 25.00 }
        ],
        precoTotal: 65.00,
        status: 'cancelado',
        avaliacao: 4.8,
    },
];

export default function TelaAgenda() {
    const router = useRouter();
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>(dadosAgendamentosMock);
    const [mostrarModalCancelamento, setMostrarModalCancelamento] = useState(false);
    const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<Agendamento | null>(null);

    const lidarComCancelamento = (agendamento: Agendamento) => {
        setAgendamentoSelecionado(agendamento);
        setMostrarModalCancelamento(true);
    };

    const confirmarCancelamento = () => {
        if (agendamentoSelecionado) {
            setAgendamentos(agendamentosAtuais =>
                agendamentosAtuais.map(ag =>
                    ag.id === agendamentoSelecionado.id ? { ...ag, status: 'cancelado' } : ag
                )
            );
            setMostrarModalCancelamento(false);
            setAgendamentoSelecionado(null);

            Alert.alert(
                'Agendamento Cancelado',
                'Seu agendamento foi cancelado com sucesso.',
                [{ text: 'OK' }]
            );
        }
    };

    const proximosAgendamentos = agendamentos.filter(
        ag => ag.status === 'confirmado'
    );
    const agendamentosPassados = agendamentos.filter(
        ag => ag.status === 'passado' || ag.status === 'cancelado'
    );

    const formatarData = (stringData: string): string => {
        const data = new Date(stringData);
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatarPreco = (preco: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(preco);
    };

    interface CardAgendamentoProps {
        agendamento: Agendamento;
        eProximo: boolean;
        indice: number;
    }

    const CardAgendamento: React.FC<CardAgendamentoProps> = ({ agendamento, eProximo, indice }) => {
        const [animacaoCard] = useState(new Animated.Value(0));
        const [animacaoEscala] = useState(new Animated.Value(1));

        useEffect(() => {
            Animated.timing(animacaoCard, {
                toValue: 1,
                duration: 600,
                delay: indice * 100,
                useNativeDriver: true,
            }).start();
        }, []);

        const lidarComPressao = () => {
            Animated.spring(animacaoEscala, {
                toValue: 0.98,
                useNativeDriver: true,
            }).start();
        };

        const lidarComSoltura = () => {
            Animated.spring(animacaoEscala, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        };

        const obterCorStatus = (status: string): string => {
            switch (status) {
                case 'confirmado':
                    return '#FFFFFF';
                case 'cancelado':
                    return '#888888';
                case 'passado':
                    return '#AAAAAA';
                default:
                    return '#AAAAAA';
            }
        };

        const obterTextoStatus = (status: string): string => {
            switch (status) {
                case 'confirmado':
                    return 'Confirmado';
                case 'cancelado':
                    return 'Cancelado';
                case 'passado':
                    return 'Finalizado';
                default:
                    return '';
            }
        };

        return (
            <Animated.View
                style={[
                    {
                        opacity: animacaoCard,
                        transform: [
                            {
                                translateY: animacaoCard.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [30, 0],
                                }),
                            },
                            { scale: animacaoEscala }
                        ],
                    },
                ]}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPressIn={lidarComPressao}
                    onPressOut={lidarComSoltura}
                    style={[
                        estilos.card,
                        agendamento.status === 'cancelado' && estilos.cardCancelado,
                        agendamento.status === 'passado' && estilos.cardPassado,
                    ]}
                >
                    <View style={estilos.cabecalhoCard}>
                        <View style={estilos.containerImagemBarbeiro}>
                            <Image source={{ uri: agendamento.imagemBarbeiro }} style={estilos.imagemBarbeiro} />
                            <View style={[estilos.indicadorStatus, { backgroundColor: obterCorStatus(agendamento.status) }]} />
                        </View>

                        <View style={estilos.infoBarbeiro}>
                            <Text bold style={estilos.nomeBarbeiro}>{agendamento.nomeBarbeiro}</Text>
                            <View style={estilos.containerAvaliacao}>
                                <Star color="#FFFFFF" size={14} fill="#FFFFFF" />
                                <Text style={estilos.textoAvaliacao}>{agendamento.avaliacao}</Text>
                            </View>
                            <Text style={estilos.textoServicos}>
                                {agendamento.servicos.map(servico => servico.nome).join(' • ')}
                            </Text>
                        </View>

                        {eProximo && (
                            <TouchableOpacity
                                style={estilos.botaoCancelar}
                                onPress={() => lidarComCancelamento(agendamento)}
                                activeOpacity={0.7}
                            >
                                <X color="#888888" size={18} />
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={estilos.corpoCard}>
                        <View style={estilos.containerPreco}>
                            <Text style={estilos.labelPreco}>Total:</Text>
                            <Text bold style={estilos.valorPreco}>{formatarPreco(agendamento.precoTotal)}</Text>
                        </View>
                    </View>

                    <View style={estilos.rodapeCard}>
                        <View style={estilos.linhaDataHora}>
                            <View style={estilos.containerDataHora}>
                                <Calendar color="#888888" size={16} />
                                <Text style={estilos.textoDataHora}>{formatarData(agendamento.data)}</Text>
                            </View>
                            <View style={estilos.containerDataHora}>
                                <Clock color="#888888" size={16} />
                                <Text style={estilos.textoDataHora}>{agendamento.horario}</Text>
                            </View>
                        </View>

                        <View style={[estilos.badgeStatus, { backgroundColor: obterCorStatus(agendamento.status) }]}>
                            <Text bold style={[estilos.textoStatus, { color: agendamento.status === 'confirmado' ? '#000000' : '#FFFFFF' }]}>
                                {obterTextoStatus(agendamento.status)}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <View style={estilos.container}>
            <View style={estilos.header}>
                <CalendarDays size={36} color="#DAB362" />
                <Text bold style={estilos.mainTitle}>Meus Agendamentos</Text>
                <Text style={estilos.subtitle}>
                    Gerencie seus horários confirmados e seu histórico.
                </Text>
            </View>

            <ScrollView
                style={estilos.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={estilos.conteudoScroll}
            >
                <View style={estilos.secao}>
                    <View style={estilos.cabecalhoSecao}>
                        <Text bold style={estilos.tituloSecao}>Próximos</Text>
                        <View style={estilos.badgeSecao}>
                            <Text bold style={estilos.textoBadgeSecao}>{proximosAgendamentos.length}</Text>
                        </View>
                    </View>

                    {proximosAgendamentos.length > 0 ? (
                        proximosAgendamentos.map((ag, indice) => (
                            <CardAgendamento
                                key={ag.id}
                                agendamento={ag}
                                eProximo={true}
                                indice={indice}
                            />
                        ))
                    ) : (
                        <View style={estilos.containerVazio}>
                            <AlertCircle color="#888888" size={48} />
                            <Text bold style={estilos.textoVazio}>Nenhum agendamento futuro</Text>
                            <Text style={estilos.subtextoVazio}>Que tal agendar um novo corte?</Text>
                        </View>
                    )}
                </View>

                <View style={estilos.secao}>
                    <View style={estilos.cabecalhoSecao}>
                        <Text bold style={estilos.tituloSecao}>Histórico</Text>
                        <View style={estilos.badgeSecao}>
                            <Text bold style={estilos.textoBadgeSecao}>{agendamentosPassados.length}</Text>
                        </View>
                    </View>

                    {agendamentosPassados.length > 0 ? (
                        agendamentosPassados.map((ag, indice) => (
                            <CardAgendamento
                                key={ag.id}
                                agendamento={ag}
                                eProximo={false}
                                indice={indice}
                            />
                        ))
                    ) : (
                        <View style={estilos.containerVazio}>
                            <Clock color="#888888" size={48} />
                            <Text bold style={estilos.textoVazio}>Nenhum histórico</Text>
                            <Text style={estilos.subtextoVazio}>Seus agendamentos passados aparecerão aqui</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <Modal
                animationType="fade"
                transparent={true}
                visible={mostrarModalCancelamento}
                onRequestClose={() => setMostrarModalCancelamento(false)}
            >
                <View style={estilos.sobreposicaoModal}>
                    <View style={estilos.conteudoModal}>
                        <View style={estilos.cabecalhoModal}>
                            <AlertCircle color="#888888" size={24} />
                            <Text bold style={estilos.tituloModal}>Cancelar Agendamento</Text>
                        </View>

                        <Text style={estilos.textoModal}>
                            Tem certeza que deseja cancelar este agendamento?
                        </Text>

                        {agendamentoSelecionado && (
                            <View style={estilos.infoAgendamentoModal}>
                                <Text style={estilos.textoInfoModal}>
                                    {agendamentoSelecionado.nomeBarbeiro} • {formatarData(agendamentoSelecionado.data)} às {agendamentoSelecionado.horario}
                                </Text>
                            </View>
                        )}

                        <View style={estilos.botoesModal}>
                            <Pressable
                                style={[estilos.botaoModal, estilos.botaoModalCancelar]}
                                onPress={() => setMostrarModalCancelamento(false)}
                            >
                                <Text style={estilos.textoBotaoModalCancelar}>Voltar</Text>
                            </Pressable>

                            <Pressable
                                style={[estilos.botaoModal, estilos.botaoModalConfirmar]}
                                onPress={confirmarCancelamento}
                            >
                                <Text style={estilos.textoBotaoModalConfirmar}>Sim, Cancelar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

// --- ESTILOS ---
const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 24,
    },
    mainTitle: {
        fontSize: 32,
        color: '#FFFFFF',
        marginTop: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#CCCCCC',
        marginTop: 12,
        textAlign: 'center',
        lineHeight: 22,
    },
    scrollView: {
        flex: 1,
    },
    conteudoScroll: {
        paddingBottom: 20,
    },
    secao: {
        marginBottom: 32,
        paddingHorizontal: 20,
    },
    cabecalhoSecao: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    tituloSecao: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    badgeSecao: {
        backgroundColor: '#333333',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        minWidth: 24,
        alignItems: 'center',
    },
    textoBadgeSecao: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    card: {
        backgroundColor: '#1A1A1A',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#333333',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    cardCancelado: {
        backgroundColor: '#1A1A1A',
        opacity: 0.7,
        borderColor: '#888888',
    },
    cardPassado: {
        backgroundColor: '#0F0F0F',
        borderColor: '#555555',
    },
    cabecalhoCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    containerImagemBarbeiro: {
        position: 'relative',
        marginRight: 16,
    },
    imagemBarbeiro: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#333333',
    },
    indicadorStatus: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#000000',
    },
    infoBarbeiro: {
        flex: 1,
    },
    nomeBarbeiro: {
        color: '#FFFFFF',
        fontSize: 18,
        marginBottom: 4,
    },
    containerAvaliacao: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    textoAvaliacao: {
        color: '#FFFFFF',
        fontSize: 14,
        marginLeft: 4,
    },
    textoServicos: {
        color: '#888888',
        fontSize: 14,
        lineHeight: 20,
    },
    botaoCancelar: {
        backgroundColor: '#333333',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#555555',
    },
    corpoCard: {
        marginBottom: 16,
    },
    containerPreco: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#333333',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    labelPreco: {
        color: '#888888',
        fontSize: 14,
    },
    valorPreco: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    rodapeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#333333',
        paddingTop: 16,
    },
    linhaDataHora: {
        flex: 1,
    },
    containerDataHora: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    textoDataHora: {
        color: '#888888',
        fontSize: 14,
        marginLeft: 8,
    },
    badgeStatus: {
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    textoStatus: {
        fontSize: 12,
        textTransform: 'uppercase',
    },
    containerVazio: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    textoVazio: {
        color: '#888888',
        fontSize: 18,
        marginTop: 16,
        marginBottom: 8,
    },
    subtextoVazio: {
        color: '#666666',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
    sobreposicaoModal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    conteudoModal: {
        backgroundColor: '#1A1A1A',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        borderWidth: 1,
        borderColor: '#333333',
    },
    cabecalhoModal: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    tituloModal: {
        color: '#FFFFFF',
        fontSize: 20,
        marginLeft: 12,
    },
    textoModal: {
        color: '#888888',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
    },
    infoAgendamentoModal: {
        backgroundColor: '#333333',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    textoInfoModal: {
        color: '#FFFFFF',
        fontSize: 14,
        textAlign: 'center',
    },
    botoesModal: {
        flexDirection: 'row',
        gap: 12,
    },
    botaoModal: {
        flex: 1,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    botaoModalCancelar: {
        backgroundColor: '#333333',
        borderWidth: 1,
        borderColor: '#555555',
    },
    botaoModalConfirmar: {
        backgroundColor: '#888888',
    },
    textoBotaoModalCancelar: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    textoBotaoModalConfirmar: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
