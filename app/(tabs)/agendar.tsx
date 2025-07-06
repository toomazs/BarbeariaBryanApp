import { Barber, barbers, timeSlots, todosServicos } from '@/constants/data';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, CheckCircle, Clock, Scissors, Star, User } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { StyledText as Text } from '../../components/StyledText';


const { width, height } = Dimensions.get('window');

interface Servico {
    id: number;
    nome: string;
    imagem: string;
    preco: number;
    categoria: string;
}

export default function TelaAgendamento() {
    const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(null);
    const [barbeiroSelecionado, setBarbeiroSelecionado] = useState<Barber | null>(null);
    const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
    const [horaSelecionada, setHoraSelecionada] = useState<string>('');
    const [exibirSeletorData, setExibirSeletorData] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);

    const animacoesFade = useRef(Array(4).fill(0).map(() => new Animated.Value(0))).current;
    const animacoesSlide = useRef(Array(4).fill(0).map(() => new Animated.Value(50))).current;
    const escalaModal = useRef(new Animated.Value(0)).current;
    const opacidadeModal = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animacoesFade.forEach((anim, index) => {
            Animated.timing(anim, {
                toValue: 1,
                duration: 300,
                delay: index * 100,
                useNativeDriver: true,
            }).start();
        });

        animacoesSlide.forEach((anim, index) => {
            Animated.timing(anim, {
                toValue: 0,
                duration: 400,
                delay: index * 100,
                useNativeDriver: true,
            }).start();
        });
    }, []);

    const animarModal = (exibir: boolean) => {
        if (exibir) {
            setModalAberto(true);
            Animated.parallel([
                Animated.spring(escalaModal, {
                    toValue: 1,
                    useNativeDriver: true,
                    tension: 50,
                    friction: 7,
                }),
                Animated.timing(opacidadeModal, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.spring(escalaModal, {
                    toValue: 0,
                    useNativeDriver: true,
                    tension: 50,
                    friction: 7,
                }),
                Animated.timing(opacidadeModal, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start(() => setModalAberto(false));
        }
    };

    const confirmarAgendamento = () => {
        animarModal(false);
        setTimeout(() => {
            setServicoSelecionado(null);
            setBarbeiroSelecionado(null);
            setDataSelecionada(null);
            setHoraSelecionada('');
            Alert.alert("Sucesso!", "Agendamento confirmado com sucesso!");
        }, 300);
    };

    const lidarComAgendamento = () => {
        if (servicoSelecionado && barbeiroSelecionado && dataSelecionada && horaSelecionada) {
            animarModal(true);
        } else {
            Alert.alert("Atenção", "Por favor, preencha todos os campos.");
        }
    };

    const lidarComMudancaData = (evento: any, data?: Date) => {
        setExibirSeletorData(false);
        if (data) {
            setDataSelecionada(data);
        }
    };

    const formatarData = (data: Date) => {
        return data.toLocaleDateString('pt-BR');
    };

    const progresso = [servicoSelecionado, barbeiroSelecionado, dataSelecionada, horaSelecionada];

    return (
        <View style={estilos.container}>
            <ScrollView style={estilos.scrollView} showsVerticalScrollIndicator={false}>
                
                <View style={estilos.cabecalho}>
                    <Calendar size={36} color="#DAB362" />
                    <Text bold style={estilos.tituloPrincipal}>Agendar Horário</Text>
                    <Text style={estilos.subtitulo}>
                        Siga os passos para garantir o seu horário com nossos mestres da tesoura.
                    </Text>
                </View>

                <View style={estilos.conteudo}>
                    <View style={estilos.containerProgresso}>
                        {progresso.map((etapa, index) => (
                            <React.Fragment key={index}>
                                <Animated.View 
                                    style={[
                                        estilos.pontoProgresso, 
                                        !!etapa && estilos.pontoProgressoAtivo,
                                        { opacity: animacoesFade[index] }
                                    ]}
                                >
                                    {!!etapa && <CheckCircle size={14} color="#000" />}
                                </Animated.View>
                                {index < progresso.length - 1 && (
                                    <View style={[estilos.linhaProgresso, !!etapa && estilos.linhaProgressoAtiva]} />
                                )}
                            </React.Fragment>
                        ))}
                    </View>

                    <Animated.View 
                        style={[
                            estilos.etapa,
                            { 
                                opacity: animacoesFade[0],
                                transform: [{ translateY: animacoesSlide[0] }]
                            }
                        ]}
                    >
                        <View style={estilos.cabecalhoEtapa}>
                            <View style={estilos.numeroEtapa}>
                                <Scissors size={16} color="#fff" />
                            </View>
                            <Text bold style={estilos.tituloEtapa}>Escolha o Serviço</Text>
                        </View>
                        <View style={estilos.gradeServicos}>
                            {todosServicos.map(servico => (
                                <TouchableOpacity 
                                    key={servico.id} 
                                    onPress={() => setServicoSelecionado(servico)} 
                                    style={[
                                        estilos.cartaoServico, 
                                        servicoSelecionado?.id === servico.id && estilos.cartaoServicoSelecionado
                                    ]}
                                    activeOpacity={0.8}
                                >
                                    <Image source={{ uri: servico.imagem }} style={estilos.imagemServico} />
                                    <View style={estilos.infoServico}>
                                        <Text bold style={estilos.nomeServico}>{servico.nome}</Text>
                                        <Text style={estilos.categoriaServico}>{servico.categoria}</Text>
                                        <Text bold style={estilos.precoServico}>R$ {servico.preco.toFixed(2)}</Text>
                                    </View>
                                    {servicoSelecionado?.id === servico.id && (
                                        <View style={estilos.indicadorSelecionado}>
                                            <CheckCircle size={20} color="#fff" />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Animated.View>

                    {servicoSelecionado && (
                        <Animated.View 
                            style={[
                                estilos.etapa,
                                { 
                                    opacity: animacoesFade[1],
                                    transform: [{ translateY: animacoesSlide[1] }]
                                }
                            ]}
                        >
                            <View style={estilos.cabecalhoEtapa}>
                                <View style={estilos.numeroEtapa}>
                                    <User size={16} color="#fff" />
                                </View>
                                <Text bold style={estilos.tituloEtapa}>Escolha o Profissional</Text>
                            </View>
                            <View style={estilos.gradeBarbeiros}>
                                {barbers.map(barbeiro => (
                                    <TouchableOpacity 
                                        key={barbeiro.id} 
                                        onPress={() => setBarbeiroSelecionado(barbeiro)} 
                                        style={[
                                            estilos.cartaoBarbeiro, 
                                            barbeiroSelecionado?.id === barbeiro.id && estilos.cartaoBarbeiroSelecionado
                                        ]}
                                        activeOpacity={0.8}
                                    >
                                        <View style={[
                                            estilos.indicadorStatus, 
                                            { backgroundColor: barbeiro.status === 'available' ? '#10b981' : '#ef4444' }
                                        ]} />
                                        <Image source={{ uri: barbeiro.image }} style={estilos.imagemBarbeiro} />
                                        <Text bold style={estilos.nomeBarbeiro}>{barbeiro.name}</Text>
                                        <Text style={estilos.especialidadeBarbeiro}>{barbeiro.specialty}</Text>
                                        <View style={estilos.avaliacaoBarbeiro}>
                                            <Star size={12} color="#fbbf24" fill="#fbbf24" />
                                            <Text style={estilos.textoAvaliacaoBarbeiro}>{barbeiro.rating.toFixed(1)}</Text>
                                        </View>
                                        {barbeiroSelecionado?.id === barbeiro.id && (
                                            <View style={estilos.indicadorSelecionado}>
                                                <CheckCircle size={20} color="#fff" />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </Animated.View>
                    )}

                    {barbeiroSelecionado && (
                        <Animated.View 
                            style={[
                                estilos.etapa,
                                { 
                                    opacity: animacoesFade[2],
                                    transform: [{ translateY: animacoesSlide[2] }]
                                }
                            ]}
                        >
                            <View style={estilos.cabecalhoEtapa}>
                                <View style={estilos.numeroEtapa}>
                                    <Calendar size={16} color="#fff" />
                                </View>
                                <Text bold style={estilos.tituloEtapa}>Escolha a Data</Text>
                            </View>
                            <TouchableOpacity 
                                onPress={() => setExibirSeletorData(true)} 
                                style={estilos.botaoData}
                                activeOpacity={0.8}
                            >
                                <Calendar size={20} color="#9ca3af" />
                                <Text style={estilos.textoBotaoData}>
                                    {dataSelecionada ? formatarData(dataSelecionada) : 'Selecionar data'}
                                </Text>
                            </TouchableOpacity>
                            {exibirSeletorData && (
                                <DateTimePicker
                                    value={dataSelecionada || new Date()}
                                    mode="date"
                                    display="default"
                                    onChange={lidarComMudancaData}
                                    minimumDate={new Date()}
                                />
                            )}
                        </Animated.View>
                    )}

                    {dataSelecionada && (
                        <Animated.View 
                            style={[
                                estilos.etapa,
                                { 
                                    opacity: animacoesFade[3],
                                    transform: [{ translateY: animacoesSlide[3] }]
                                }
                            ]}
                        >
                            <View style={estilos.cabecalhoEtapa}>
                                <View style={estilos.numeroEtapa}>
                                    <Clock size={16} color="#fff" />
                                </View>
                                <Text bold style={estilos.tituloEtapa}>Escolha o Horário</Text>
                            </View>
                            <View style={estilos.gradeHorarios}>
                                {timeSlots.map(hora => (
                                    <TouchableOpacity 
                                        key={hora} 
                                        onPress={() => setHoraSelecionada(hora)} 
                                        style={[
                                            estilos.horario, 
                                            horaSelecionada === hora && estilos.horarioSelecionado
                                        ]}
                                        activeOpacity={0.8}
                                    >
                                        <Text bold style={[
                                            estilos.textoHorario,
                                            horaSelecionada === hora && estilos.textoHorarioSelecionado
                                        ]}>
                                            {hora}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </Animated.View>
                    )}

                    {horaSelecionada && (
                        <Animated.View 
                            style={[
                                estilos.containerResumo,
                                { 
                                    opacity: animacoesFade[3],
                                    transform: [{ translateY: animacoesSlide[3] }]
                                }
                            ]}
                        >
                            <LinearGradient 
                                colors={['#1a1a1a', '#333333']} 
                                style={estilos.caixaResumo}
                            >
                                <Text bold style={estilos.tituloResumo}>Resumo do Agendamento</Text>
                                <View style={estilos.detalhesResumo}>
                                    <View style={estilos.linhaResumo}>
                                        <Text style={estilos.rotuloResumo}>Serviço:</Text>
                                        <Text bold style={estilos.valorResumo}>{servicoSelecionado?.nome}</Text>
                                    </View>
                                    <View style={estilos.linhaResumo}>
                                        <Text style={estilos.rotuloResumo}>Profissional:</Text>
                                        <Text bold style={estilos.valorResumo}>{barbeiroSelecionado?.name}</Text>
                                    </View>
                                    <View style={estilos.linhaResumo}>
                                        <Text style={estilos.rotuloResumo}>Data:</Text>
                                        <Text bold style={estilos.valorResumo}>{dataSelecionada && formatarData(dataSelecionada)}</Text>
                                    </View>
                                    <View style={estilos.linhaResumo}>
                                        <Text style={estilos.rotuloResumo}>Horário:</Text>
                                        <Text bold style={estilos.valorResumo}>{horaSelecionada}</Text>
                                    </View>
                                    <View style={estilos.divisor} />
                                    <View style={estilos.totalResumo}>
                                        <Text bold style={estilos.rotuloTotalResumo}>Total:</Text>
                                        <Text bold style={estilos.valorTotalResumo}>R$ {servicoSelecionado?.preco.toFixed(2)}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity 
                                    onPress={lidarComAgendamento} 
                                    style={estilos.botaoConfirmar}
                                    activeOpacity={0.9}
                                >
                                    <Text bold style={estilos.textoBotaoConfirmar}>CONFIRMAR AGENDAMENTO</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </Animated.View>
                    )}
                </View>
            </ScrollView>

            <Modal transparent={true} visible={modalAberto} animationType="none">
                <View style={estilos.sobreposicaoModal}>
                    <Animated.View 
                        style={[
                            estilos.containerModal,
                            {
                                opacity: opacidadeModal,
                                transform: [{ scale: escalaModal }]
                            }
                        ]}
                    >
                        <View style={estilos.cabecalhoModal}>
                            <View style={estilos.containerIconeModal}>
                                <CheckCircle size={32} color="#fff" />
                            </View>
                            <Text bold style={estilos.tituloModal}>Confirmar Agendamento</Text>
                            <Text style={estilos.subtituloModal}>Tem certeza que deseja confirmar?</Text>
                        </View>

                        <View style={estilos.resumoModal}>
                            <Text bold style={estilos.tituloResumoModal}>Detalhes:</Text>
                            <Text style={estilos.textoResumoModal}>
                                {servicoSelecionado?.nome} com {barbeiroSelecionado?.name}
                            </Text>
                            <Text style={estilos.textoResumoModal}>
                                {dataSelecionada && formatarData(dataSelecionada)} às {horaSelecionada}
                            </Text>
                            <Text bold style={estilos.precoResumoModal}>
                                R$ {servicoSelecionado?.preco.toFixed(2)}
                            </Text>
                        </View>

                        <View style={estilos.acoesModal}>
                            <TouchableOpacity 
                                style={estilos.botaoCancelarModal} 
                                onPress={() => animarModal(false)}
                                activeOpacity={0.8}
                            >
                                <Text style={estilos.textoBotaoCancelarModal}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={estilos.botaoConfirmarModal} 
                                onPress={confirmarAgendamento}
                                activeOpacity={0.8}
                            >
                                <Text bold style={estilos.textoBotaoConfirmarModal}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
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
    scrollView: {
        flex: 1,
    },
    conteudo: {
        padding: 20,
        paddingTop: 0,
    },
    containerProgresso: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    pontoProgresso: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    pontoProgressoAtivo: {
        backgroundColor: '#fff',
    },
    linhaProgresso: {
        width: 30,
        height: 2,
        backgroundColor: '#333',
    },
    linhaProgressoAtiva: {
        backgroundColor: '#fff',
    },
    etapa: {
        marginBottom: 30,
    },
    cabecalhoEtapa: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    numeroEtapa: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    tituloEtapa: {
        fontSize: 20,
        color: '#fff',
    },
    gradeServicos: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    cartaoServico: {
        width: (width - 52) / 2,
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#333',
        position: 'relative',
    },
    cartaoServicoSelecionado: {
        borderColor: '#fff',
        backgroundColor: '#333',
    },
    imagemServico: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
    },
    infoServico: {
        padding: 12,
    },
    nomeServico: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 4,
    },
    categoriaServico: {
        fontSize: 12,
        color: '#9ca3af',
        marginBottom: 8,
        textTransform: 'capitalize',
    },
    precoServico: {
        fontSize: 16,
        color: '#fff',
    },
    indicadorSelecionado: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#10b981',
        borderRadius: 12,
        padding: 2,
    },
    gradeBarbeiros: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    cartaoBarbeiro: {
        width: (width - 52) / 2,
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333',
        position: 'relative',
    },
    cartaoBarbeiroSelecionado: {
        borderColor: '#fff',
        backgroundColor: '#333',
    },
    indicadorStatus: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    imagemBarbeiro: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 8,
    },
    nomeBarbeiro: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 4,
    },
    especialidadeBarbeiro: {
        fontSize: 12,
        color: '#9ca3af',
        textAlign: 'center',
        marginBottom: 8,
    },
    avaliacaoBarbeiro: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    textoAvaliacaoBarbeiro: {
        fontSize: 12,
        color: '#9ca3af',
    },
    botaoData: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#333',
        gap: 12,
    },
    textoBotaoData: {
        fontSize: 16,
        color: '#fff',
        flex: 1,
    },
    gradeHorarios: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    horario: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333',
        minWidth: 80,
        alignItems: 'center',
    },
    horarioSelecionado: {
        backgroundColor: '#fff',
        borderColor: '#fff',
    },
    textoHorario: {
        fontSize: 14,
        color: '#fff',
    },
    textoHorarioSelecionado: {
        color: '#000',
    },
    containerResumo: {
        marginTop: 20,
    },
    caixaResumo: {
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#333',
    },
    tituloResumo: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    detalhesResumo: {
        marginBottom: 20,
    },
    linhaResumo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    rotuloResumo: {
        fontSize: 14,
        color: '#9ca3af',
    },
    valorResumo: {
        fontSize: 14,
        color: '#fff',
    },
    divisor: {
        height: 1,
        backgroundColor: '#333',
        marginVertical: 12,
    },
    totalResumo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: 12,
        borderRadius: 8,
    },
    rotuloTotalResumo: {
        fontSize: 16,
        color: '#fff',
    },
    valorTotalResumo: {
        fontSize: 18,
        color: '#10b981',
    },
    botaoConfirmar: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    textoBotaoConfirmar: {
        fontSize: 16,
        color: '#000',
    },
    sobreposicaoModal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    containerModal: {
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        borderWidth: 1,
        borderColor: '#333',
    },
    cabecalhoModal: {
        alignItems: 'center',
        marginBottom: 24,
    },
    containerIconeModal: {
        width: 64,
        height: 64,
        backgroundColor: '#10b981',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    tituloModal: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 8,
    },
    subtituloModal: {
        fontSize: 14,
        color: '#9ca3af',
        textAlign: 'center',
    },
    resumoModal: {
        backgroundColor: '#333',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    tituloResumoModal: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 8,
    },
    textoResumoModal: {
        fontSize: 14,
        color: '#9ca3af',
        marginBottom: 4,
    },
    precoResumoModal: {
        fontSize: 18,
        color: '#10b981',
        marginTop: 8,
    },
    acoesModal: {
        flexDirection: 'row',
        gap: 12,
    },
    botaoCancelarModal: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#333',
        alignItems: 'center',
    },
    textoBotaoCancelarModal: {
        fontSize: 16,
        color: '#9ca3af',
    },
    botaoConfirmarModal: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#10b981',
        alignItems: 'center',
    },
    textoBotaoConfirmarModal: {
        fontSize: 16,
        color: '#fff',
    },
});
