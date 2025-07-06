import { barbers, horariosFuncionamento, todosServicos } from '@/constants/data'; // ATUALIZADO
import { useRouter } from 'expo-router';
import { ArrowRight, Calendar, Check, Crown, Heart, Star, X, Zap } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, Modal, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { StyledText as Text } from '../../components/StyledText';

const { width } = Dimensions.get('window');

const planos = [
    { id: 1, nome: "Plano Básico", icone: Check, preco: 120.00, periodo: "mensal", servicos: ["4 Cortes", "2 Barbas", "Produto Capilar"], popular: false },
    { id: 2, nome: "Plano Premium", icone: Crown, preco: 200.00, periodo: "mensal", servicos: ["8 Cortes", "6 Barbas", "Tratamento Capilar", "Produtos Inclusos"], popular: true },
    { id: 3, nome: "Plano VIP", icone: Zap, preco: 300.00, periodo: "mensal", servicos: ["Cortes Ilimitados", "Barbas Ilimitadas", "Tratamentos", "Produtos Premium", "Atendimento Exclusivo"], popular: false },
];

const barbeirosComEspecialidades = [
    {
        ...barbers[0], 
        descricao: "Com mais de 10 anos de experiência, sou especialista em cortes clássicos e visagismo, sempre buscando o estilo que mais combina com você.",
        galeria: [
            "https://i.imgur.com/xCHdv2Q.png",
            "https://i.imgur.com/q7O1W5k.png",
            "https://i.imgur.com/r3zrNIo.png",
            "https://i.imgur.com/wNKHQUX.png"
        ]
    },
    {
        ...barbers[1],
        descricao: "Apaixonado pelas últimas tendências, meu foco é em cortes modernos, fades perfeitos e estilos arrojados. Vamos criar algo único!",
        galeria: [
            "https://i.imgur.com/aeqkXbH.png",
            "https://i.imgur.com/At11cGI.png",
            "https://i.imgur.com/qW38WK2.png",
            "https://i.imgur.com/TO8liY0.png"
        ]
    },
    {
        ...barbers[2],
        descricao: "Mestre na arte da barboterapia, cuido da sua barba com técnicas tradicionais e produtos de alta qualidade para um resultado impecável.",
        galeria: [
            "https://i.imgur.com/yjE4cgp.jpeg",
            "https://i.imgur.com/4wTVkK8.png",
            "https://i.imgur.com/zlCuRMa.png",
            "https://i.imgur.com/JqV8La5.png"            
        ]
    },
    {
        ...barbers[3], 
        descricao: "Especialista em transformações, domino as técnicas de coloração, luzes e platinado para dar uma nova vida ao seu cabelo.",
        galeria: [
            "https://i.imgur.com/VKJqJcC.png",
            "https://i.imgur.com/o1xRVwA.png",
            "https://i.imgur.com/7Y9E0QX.png",
            "https://i.imgur.com/053zifN.png"  
        ]
    },
    {
      ...barbers[4],
        descricao: "Focado na saúde do seu cabelo, sou especialista em hidratação, reconstrução e tratamentos para manter seus fios sempre fortes e saudáveis.",
        galeria: [
            "https://i.imgur.com/dJqDU5r.png",
            "https://i.imgur.com/RBP42yE.png",
            "https://i.imgur.com/ssPo0QO.png",
            "https://i.imgur.com/5ObdcaX.png"  
        ]
    },
];

const useAnimatedScale = (initialValue = 1) => {
    const animatedValue = useRef(new Animated.Value(initialValue)).current;
    const animatePress = () => {
        Animated.sequence([
            Animated.timing(animatedValue, { toValue: 0.95, duration: 100, useNativeDriver: true }),
            Animated.timing(animatedValue, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start();
    };
    return { animatedValue, animatePress };
};

const useAnimatedOpacity = (initialValue = 1) => {
    const animatedValue = useRef(new Animated.Value(initialValue)).current;
    const animateFade = (toValue: number, duration = 300) => {
        Animated.timing(animatedValue, { toValue, duration, useNativeDriver: true }).start();
    };
    return { animatedValue, animateFade };
};

const useOpenStatus = () => {
    const [status, setStatus] = useState({ isOpen: false, message: 'Verificando...' });

    useEffect(() => {
        const checkStatus = () => {
            const agora = new Date();
            const diaDaSemana = agora.getDay();
            const horaAtual = agora.getHours() + agora.getMinutes() / 60;
            const diaInfo = horariosFuncionamento[diaDaSemana as keyof typeof horariosFuncionamento];

            if (diaInfo.status === 'Fechado' || !('horarios' in diaInfo)) {
                setStatus({ isOpen: false, message: 'Estamos fechados no momento' });
                return;
            }

            let aberto = false;
            for (const intervalo of diaInfo.horarios) {
                if (horaAtual >= intervalo.inicio && horaAtual < intervalo.fim) {
                    aberto = true;
                    break;
                }
            }

            setStatus({
                isOpen: aberto,
                message: aberto ? 'Já estamos abertos!' : 'Estamos fechados no momento'
            });
        };

        checkStatus();
        const interval = setInterval(checkStatus, 60000);

        return () => clearInterval(interval);
    }, []);

    return status;
};

const SectionHeader = ({ title }: { title: string }) => {
    const { animatedValue, animateFade } = useAnimatedOpacity(0);
    useEffect(() => { animateFade(1, 600); }, []);

    return (
        <Animated.View style={[styles.cabecalhoSecao, { opacity: animatedValue }]}>
            <Text style={styles.tituloSecao}>{title}</Text>
            <View style={styles.sublinhaTitulo} />
        </Animated.View>
    );
};

const ServicoCard = ({ servico, isSelected, isFavorito, onSelect, onFavoritoToggle, onAgendar }: any) => {
    const { animatedValue: scaleValue, animatePress } = useAnimatedScale();
    const { animatedValue: opacityValue, animateFade } = useAnimatedOpacity(0);

    useEffect(() => { animateFade(1, 400); }, []);
    useEffect(() => { animateFade(isSelected ? 0.9 : 1, 200); }, [isSelected]);

    return (
        <Animated.View style={[{ opacity: opacityValue, transform: [{ scale: scaleValue }] }]}>
            <TouchableOpacity onPress={() => { animatePress(); onSelect(); }} activeOpacity={0.8}>
                <View style={[styles.cartaoCorte, isSelected && styles.cartaoCortesSelecionado]}>
                    <View style={styles.containerImagemCorte}>
                        <Image source={{ uri: servico.imagem }} style={styles.imagemCorte} />
                        <View style={styles.overlayCorte}>
                            <Text style={styles.nomeCorte}>{servico.nome}</Text>
                            <Text style={styles.precoCorte}>R$ {servico.preco.toFixed(2)}</Text>
                        </View>
                        <TouchableOpacity onPress={() => { animatePress(); onAgendar(); }} style={styles.botaoFlutanteCorte} activeOpacity={0.8}>
                            <Calendar size={18} color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onFavoritoToggle} style={styles.botaoCoracaoFlutuante} activeOpacity={0.8}>
                            <Heart size={16} color={isFavorito ? '#ff4444' : '#ffffff'} fill={isFavorito ? '#ff4444' : 'transparent'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const BarbeiroCard = ({ barbeiro, onFavoritoToggle, isFavorito, onCardPress }: any) => {
    const { animatedValue: scaleValue, animatePress } = useAnimatedScale();
    const { animatedValue: opacityValue, animateFade } = useAnimatedOpacity(0);

    useEffect(() => { animateFade(1, 500); }, []);

    return (
        <Animated.View style={[{ opacity: opacityValue, transform: [{ scale: scaleValue }] }]}>
            <TouchableOpacity onPress={() => { animatePress(); onCardPress(); }} activeOpacity={0.8}>
                <View style={styles.cartaoBarbeiro}>
                    <View style={styles.containerImagemBarbeiro}>
                        <Image source={{ uri: barbeiro.image }} style={styles.imagemGridBarbeiro} />
                        <TouchableOpacity onPress={onFavoritoToggle} style={styles.botaoCoracaoBarbeiro} activeOpacity={0.8}>
                            <Heart size={18} color={isFavorito ? '#ff4444' : '#ffffff'} fill={isFavorito ? '#ff4444' : 'transparent'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoBarbeiro}>
                        <Text style={styles.nomeBarbeiro}>{barbeiro.name}</Text>
                        <View style={styles.avaliacaoBarbeiro}>
                            <Star size={14} fill="#FFD700" color="#FFD700" />
                            <Text style={styles.textoAvaliacaoBarbeiro}>{barbeiro.rating}</Text>
                        </View>
                        <Text style={styles.experienciaBarbeiro}>{barbeiro.specialty}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const PlanoCard = ({ plano, isSelected, isFavorito, onSelect, onFavoritoToggle, onAgendar }: any) => {
    const { animatedValue: scaleValue, animatePress } = useAnimatedScale();
    const { animatedValue: opacityValue, animateFade } = useAnimatedOpacity(0);

    useEffect(() => { animateFade(1, 600); }, []);
    useEffect(() => { animateFade(isSelected ? 0.9 : 1, 200); }, [isSelected]);

    return (
        <Animated.View style={[{ opacity: opacityValue, transform: [{ scale: scaleValue }] }]}>
            <TouchableOpacity onPress={() => { animatePress(); onSelect(); }} activeOpacity={0.8}>
                <View style={[styles.cartaoPlano, isSelected && styles.cartaoPlanoSelecionado, plano.popular && styles.cartaoPlanoPopular]}>
                    {plano.popular && (
                        <View style={styles.badgePopular}>
                            <Text style={styles.textoBadgePopular}>POPULAR</Text>
                        </View>
                    )}
                    <TouchableOpacity onPress={onFavoritoToggle} style={styles.botaoCoracaoPlano} activeOpacity={0.8}>
                        <Heart size={18} color={isFavorito ? '#ff4444' : '#666666'} fill={isFavorito ? '#ff4444' : 'transparent'} />
                    </TouchableOpacity>
                    <View style={styles.containerIconePlano}><plano.icone size={32} color="#ffffff" /></View>
                    <Text style={styles.nomePlano}>{plano.nome}</Text>
                    <View style={styles.containerPrecoPlano}>
                        <Text style={styles.precoPlano}>R$ {plano.preco.toFixed(2)}</Text>
                        <Text style={styles.periodoPlano}>/{plano.periodo}</Text>
                    </View>
                    <View style={styles.servicosPlano}>
                        {plano.servicos.map((servico: string, index: number) => (
                            <View key={index} style={styles.itemServicoPlano}>
                                <Check size={16} color="#4CAF50" />
                                <Text style={styles.textoServicoPlano}>{servico}</Text>
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity onPress={() => { animatePress(); onAgendar(); }} style={[styles.botaoPlano, plano.popular && styles.botaoPlanoPopular]} activeOpacity={0.8}>
                        <Text style={[styles.textoBotaoPlano, plano.popular && styles.textoBotaoPlanoPopular]}>ESCOLHER PLANO</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const BarbeiroModal = ({ barbeiro, visible, onClose }: any) => {
    const router = useRouter();
    if (!barbeiro) return null;

    const handleAgendar = () => {
        onClose();
        router.push('/(tabs)/agendar');
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
                        <X size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Image source={{ uri: barbeiro.image }} style={styles.modalBarberImage} />
                        <Text style={styles.modalBarberName}>{barbeiro.name}</Text>
                        <Text style={styles.modalBarberSpecialty}>{barbeiro.specialty}</Text>

                        <Text style={styles.modalSectionTitle}>Sobre mim</Text>
                        <Text style={styles.modalBarberDescription}>{barbeiro.descricao}</Text>

                        <Text style={styles.modalSectionTitle}>Cortes</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.modalGalleryContainer}>
                            {barbeiro.galeria.map((fotoUrl: string, index: number) => (
                                <Image key={index} source={{ uri: fotoUrl }} style={styles.modalGalleryImage} />
                            ))}
                        </ScrollView>

                        <TouchableOpacity onPress={handleAgendar} style={styles.modalAgendarButton}>
                            <Text style={styles.modalAgendarButtonText}>Agendar com {barbeiro.name.split(' ')[0]}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default function TelaInicial() {
    const [favoritos, setFavoritos] = useState(new Set<number>());
    const [servicosSelecionados, setServicosSelecionados] = useState<number | null>(null);
    const [planoSelecionado, setPlanoSelecionado] = useState<number | null>(null);
    const [planoFavorito, setPlanoFavorito] = useState<number | null>(null);
    const [barbeiroFavorito, setBarbeiroFavorito] = useState<number | null>(null);
    const [categoriaAtiva, setCategoriaAtiva] = useState<string>('padroes');
    const [modalBarber, setModalBarber] = useState(null);

    const router = useRouter();
    const openStatus = useOpenStatus();

    const { animatedValue: heroOpacity, animateFade: animateHeroFade } = useAnimatedOpacity(0);
    const { animatedValue: mainButtonScale, animatePress: animateMainButtonPress } = useAnimatedScale();

    useEffect(() => {
        animateHeroFade(1, 800);
    }, []);

    const alternarFavoritoServico = (id: number) => {
        setFavoritos(favs => {
            const novosFavs = new Set(favs);
            novosFavs.has(id) ? novosFavs.delete(id) : novosFavs.add(id);
            return novosFavs;
        });
    };

    const toggleSelection = (setter: React.Dispatch<React.SetStateAction<number | null>>, id: number) => {
        setter(prev => (prev === id ? null : id));
    };

    const servicosFiltrados = todosServicos.filter(servico => servico.categoria === categoriaAtiva);

    const CategoriaButton = ({ titulo, ativo, onPress }: any) => {
        const { animatedValue: scaleValue, animatePress } = useAnimatedScale();
        return (
            <Animated.View style={[{ transform: [{ scale: scaleValue }] }]}>
                <TouchableOpacity onPress={() => { animatePress(); onPress(); }} style={[styles.botaoCategoria, ativo && styles.botaoCategoriaAtivo]} activeOpacity={0.8}>
                    <Text style={[styles.textoBotaoCategoria, ativo && styles.textoBotaoCategoriaAtivo]}>{titulo}</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            <BarbeiroModal
                barbeiro={modalBarber}
                visible={!!modalBarber}
                onClose={() => setModalBarber(null)}
            />

            <Animated.View style={[styles.secaoHero, { opacity: heroOpacity }]}>
                <View style={styles.conteudoHero}>
                    <View style={styles.logoWrapper}>
                        <Image
                            source={require('../../assets/images/bryanlogo.png')}
                            style={styles.imagemLogo}
                        />
                        <Image
                            source={require('../../assets/images/bryantitle.png')}
                            style={styles.imagemTitleLogo}
                        />
                        <Text style={styles.textoBoasVindas}>Seja bem-vindo, Eduardo!</Text>

                        <View style={[styles.statusContainer, { backgroundColor: openStatus.isOpen ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 68, 68, 0.2)' }]}>
                            <View style={[styles.statusDot, { backgroundColor: openStatus.isOpen ? '#4CAF50' : '#ff4444' }]} />
                            <Text style={styles.statusText}>{openStatus.message}</Text>
                        </View>
                    </View>

                    <Animated.View style={[{ transform: [{ scale: mainButtonScale }] }]}>
                        <TouchableOpacity onPress={() => { animateMainButtonPress(); router.push('/(tabs)/agendar'); }} style={styles.botaoMain} activeOpacity={0.8}>
                            <Calendar color="#000" size={22} />
                            <Text style={styles.textoBotaoMain}>AGENDAR HORÁRIO</Text>
                            <ArrowRight color="#000" size={20} />
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Animated.View>

            <View style={styles.secao}>
                <SectionHeader title="Nossos Serviços" />
                <View style={styles.containerCategorias}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollCategorias}>
                        <CategoriaButton titulo="PADRÕES" ativo={categoriaAtiva === 'padroes'} onPress={() => setCategoriaAtiva('padroes')} />
                        <CategoriaButton titulo="COMBOS" ativo={categoriaAtiva === 'combos'} onPress={() => setCategoriaAtiva('combos')} />
                        <CategoriaButton titulo="EXTRAS" ativo={categoriaAtiva === 'extras'} onPress={() => setCategoriaAtiva('extras')} />
                    </ScrollView>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.containerHorizontal}>
                    {servicosFiltrados.map((servico) => (
                        <ServicoCard
                            key={servico.id}
                            servico={servico}
                            isSelected={servicosSelecionados === servico.id}
                            isFavorito={favoritos.has(servico.id)}
                            onSelect={() => toggleSelection(setServicosSelecionados, servico.id)}
                            onFavoritoToggle={() => alternarFavoritoServico(servico.id)}
                            onAgendar={() => router.push('/(tabs)/agendar')}
                        />
                    ))}
                </ScrollView>
            </View>

            <View style={[styles.secao, { backgroundColor: '#111111' }]}>
                <SectionHeader title="Nossa Equipe" />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.containerHorizontal}>
                    {barbeirosComEspecialidades.map((barbeiro) => (
                        <BarbeiroCard
                            key={barbeiro.id}
                            barbeiro={barbeiro}
                            isFavorito={barbeiroFavorito === barbeiro.id}
                            onFavoritoToggle={() => toggleSelection(setBarbeiroFavorito, barbeiro.id)}
                            onCardPress={() => setModalBarber(barbeiro as any)}
                        />
                    ))}
                </ScrollView>
            </View>

            <View style={styles.secao}>
                <SectionHeader title="Nossos Planos" />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.containerHorizontal}>
                    {planos.map((plano) => (
                        <PlanoCard
                            key={plano.id}
                            plano={plano}
                            isSelected={planoSelecionado === plano.id}
                            isFavorito={planoFavorito === plano.id}
                            onSelect={() => toggleSelection(setPlanoSelecionado, plano.id)}
                            onFavoritoToggle={() => toggleSelection(setPlanoFavorito, plano.id)}
                            onAgendar={() => router.push('/(tabs)/agendar')}
                        />
                    ))}
                </ScrollView>
            </View>

            <View style={styles.espacadorInferior} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    // Estilos Gerais e da Seção Hero
    container: { flex: 1, backgroundColor: '#000000' },
    secaoHero: { backgroundColor: '#000000', paddingBottom: 40, paddingTop: 20 },
    conteudoHero: { paddingHorizontal: 24, alignItems: 'center' },
    logoWrapper: { alignItems: 'center', marginBottom: 24, width: '100%' },
    imagemLogo: { width: 250, height: 120, resizeMode: 'contain', marginBottom: 10 },
    imagemTitleLogo: { width: 250, height: 50, marginBottom: 20 },
    textoBoasVindas: { fontSize: 18, color: '#cccccc', fontWeight: '300', textAlign: 'center', marginBottom: 16 },
    botaoMain: { backgroundColor: '#ffffff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, paddingVertical: 18, paddingHorizontal: 32, borderRadius: 30, shadowColor: "#ffffff", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 },
    textoBotaoMain: { color: '#000000', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },

    // Estilos Status de Funcionamento
    statusContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginBottom: 24 },
    statusDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
    statusText: { color: '#ffffff', fontSize: 14, fontWeight: '500' },

    // Estilos de Seção Genéricos
    secao: { paddingVertical: 32 },
    cabecalhoSecao: { alignItems: 'center', marginBottom: 24 },
    tituloSecao: { fontSize: 26, fontWeight: '700', color: '#ffffff', textAlign: 'center', marginBottom: 8 },
    sublinhaTitulo: { width: 60, height: 3, backgroundColor: '#ffffff', borderRadius: 2 },
    containerHorizontal: { paddingHorizontal: 24, paddingVertical: 10 },

    // Estilos de Categoria
    containerCategorias: { marginBottom: 20 },
    scrollCategorias: { paddingHorizontal: 24 },
    botaoCategoria: { backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25, marginRight: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
    botaoCategoriaAtivo: { backgroundColor: '#ffffff', borderColor: '#ffffff' },
    textoBotaoCategoria: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
    textoBotaoCategoriaAtivo: { color: '#000000' },

    // Estilos do Card de Serviço
    cartaoCorte: { marginRight: 16, width: 180 },
    cartaoCortesSelecionado: { opacity: 0.8 },
    containerImagemCorte: { position: 'relative', borderRadius: 16, overflow: 'hidden', borderWidth: 2, borderColor: 'transparent' },
    imagemCorte: { width: 180, height: 220, backgroundColor: '#1a1a1a' },
    overlayCorte: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: 12 },
    nomeCorte: { color: '#ffffff', fontSize: 16, fontWeight: '600', marginBottom: 6 },
    precoCorte: { color: '#ffffff', fontSize: 18, fontWeight: '700' },
    botaoFlutanteCorte: { position: 'absolute', top: 12, right: 12, backgroundColor: '#ffffff', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', shadowColor: "#ffffff", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
    botaoCoracaoFlutuante: { position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(0, 0, 0, 0.6)', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },

    // Estilos do Card de Barbeiro
    cartaoBarbeiro: { alignItems: 'center', marginRight: 16, width: 180 },
    containerImagemBarbeiro: { position: 'relative', marginBottom: 12 },
    imagemGridBarbeiro: { width: 160, height: 160, borderRadius: 80, backgroundColor: '#1a1a1a', borderWidth: 2, borderColor: '#333' },
    botaoCoracaoBarbeiro: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0, 0, 0, 0.6)', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
    infoBarbeiro: { alignItems: 'center' },
    nomeBarbeiro: { color: '#ffffff', fontSize: 18, fontWeight: '600', marginBottom: 4, textAlign: 'center' },
    avaliacaoBarbeiro: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
    textoAvaliacaoBarbeiro: { color: '#FFD700', fontSize: 14, fontWeight: '600' },
    experienciaBarbeiro: { color: '#999999', fontSize: 14, textAlign: 'center' },

    // Estilos do Card de Plano
    cartaoPlano: { backgroundColor: '#1a1a1a', borderRadius: 16, padding: 24, marginRight: 16, width: 260, borderWidth: 2, borderColor: '#333333', position: 'relative' },
    cartaoPlanoSelecionado: { backgroundColor: '#222222', borderColor: '#555555' },
    cartaoPlanoPopular: { borderColor: '#4CAF50', backgroundColor: '#1a2a1a' },
    badgePopular: { position: 'absolute', top: -8, left: 20, backgroundColor: '#4CAF50', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
    textoBadgePopular: { color: '#000000', fontSize: 10, fontWeight: '800' },
    botaoCoracaoPlano: { position: 'absolute', top: 16, right: 16, padding: 4 },
    containerIconePlano: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255, 255, 255, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
    nomePlano: { color: '#ffffff', fontSize: 20, fontWeight: '700', marginBottom: 8 },
    containerPrecoPlano: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 20 },
    precoPlano: { color: '#ffffff', fontSize: 26, fontWeight: '800' },
    periodoPlano: { color: '#999999', fontSize: 16, marginLeft: 4 },
    servicosPlano: { marginBottom: 24 },
    itemServicoPlano: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
    textoServicoPlano: { color: '#cccccc', fontSize: 14 },
    botaoPlano: { backgroundColor: '#333333', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 25, alignItems: 'center' },
    botaoPlanoPopular: { backgroundColor: '#4CAF50' },
    textoBotaoPlano: { color: '#ffffff', fontSize: 14, fontWeight: '700' },
    textoBotaoPlanoPopular: { color: '#000000' },

    // Estilos do Modal do Barbeiro
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)' },
    modalContainer: { backgroundColor: '#1C1C1E', borderRadius: 24, paddingHorizontal: 20, paddingVertical: 25, width: '90%', maxHeight: '85%' },
    modalCloseButton: { position: 'absolute', top: 15, right: 15, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 15, padding: 4, zIndex: 10 },
    modalBarberImage: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 12, borderWidth: 3, borderColor: '#ffffff' },
    modalBarberName: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', textAlign: 'center' },
    modalBarberSpecialty: { fontSize: 16, color: '#4CAF50', textAlign: 'center', marginBottom: 20 },
    modalSectionTitle: { fontSize: 18, fontWeight: '600', color: '#ffffff', marginBottom: 12, marginTop: 10, borderLeftWidth: 3, borderLeftColor: '#4CAF50', paddingLeft: 8 },
    modalGalleryContainer: { paddingBottom: 16 },
    modalGalleryImage: { width: 250, height: 250, borderRadius: 12, marginRight: 16 },
    modalBarberDescription: { fontSize: 15, color: '#cccccc', lineHeight: 22, marginBottom: 24 },
    modalAgendarButton: { backgroundColor: '#ffffff', paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginTop: 10 },
    modalAgendarButtonText: { color: '#000000', fontSize: 16, fontWeight: '700' },

    // Espaçamento Final
    espacadorInferior: { height: 20 },
});