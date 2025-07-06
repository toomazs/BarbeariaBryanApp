export interface Service {
  id: number;
  name: string;
  price: number;
  duration: string;
  category: 'individual' | 'bryan';
  popular?: boolean;
}

export interface Barber {
  id: number;
  name: string;
  image: string;
  specialty: string;
  rating: number;
  experience: string;
  status: 'available' | 'busy';
}

export const services: Service[] = [
  { id: 1, name: 'CORTE CLÁSSICO', price: 40.00, duration: '35min', category: 'individual', popular: true },
  { id: 2, name: 'CORTE INFANTIL', price: 40.00, duration: '40min', category: 'individual' },
  { id: 3, name: 'BARBA TRADICIONAL', price: 25.00, duration: '25min', category: 'individual', popular: true },
  { id: 4, name: 'RASPAGEM DA BARBA', price: 15.00, duration: '15min', category: 'individual' },
  { id: 5, name: 'SOBRANCELHA', price: 10.00, duration: '5min', category: 'individual' },
  { id: 6, name: 'CORTE PREMIUM (Bryan)', price: 60.00, duration: '40min', category: 'bryan' },
  { id: 7, name: 'BARBA PREMIUM (Bryan)', price: 40.00, duration: '25min', category: 'bryan' },
  { id: 8, name: 'CORTE + SOBRANCELHA (Bryan)', price: 70.00, duration: '45min', category: 'bryan', popular: true },
  { id: 9, name: 'CORTE + BARBA (Bryan)', price: 90.00, duration: '1h', category: 'bryan', popular: true },
  { id: 10, name: 'COMBO COMPLETO (Bryan)', price: 100.00, duration: '1h 15min', category: 'bryan' }
];

export const barbers: Barber[] = [
  { id: 1, name: 'Bryan Gonçalves', image: 'https://d2zdpiztbgorvt.cloudfront.net/region1/br/123287/resource_photos/fc6063207d224cd8ab0db8ef2c422f-barbearia-bryan-bryan-goncalves-6dc0088f30d648a5851b1d374bad65-booksy.jpeg', specialty: 'Especialista Premium', rating: 5.0, experience: '8 anos', status: 'available' },
  { id: 2, name: 'Allan Corleone', image: 'https://d2zdpiztbgorvt.cloudfront.net/region1/br/123287/resource_photos/4e56f59ebf0243b899ec00ef446a39-barbearia-bryan-allan-corleone-506dc1d586604993ab4f2acae5b75e-booksy.jpeg', specialty: 'Barbeiro Profissional', rating: 4.9, experience: '5 anos', status: 'available' },
  { id: 3, name: 'Gustavo Galdino', image: 'https://d2zdpiztbgorvt.cloudfront.net/region1/br/123287/resource_photos/8555661abc264c8786e6e8a3146a59-barbearia-bryan-gustavo-galdino-a7a3f23aed24431a8471d65edd5e29-booksy.jpeg', specialty: 'Especialista em Fade', rating: 4.8, experience: '4 anos', status: 'available' },
  { id: 4, name: 'Rhian Correa', image: 'https://d2zdpiztbgorvt.cloudfront.net/region1/br/123287/resource_photos/415527d169044b4b862dd04c067e45-barbearia-bryan-rhian-7d41a5b2ec944c32a9a311b4fd9e2b-booksy.jpeg', specialty: 'Barbeiro Artístico', rating: 4.9, experience: '6 anos', status: 'available' },
  { id: 5, name: 'Gerson Souza', image: 'https://d2zdpiztbgorvt.cloudfront.net/region1/br/123287/resource_photos/143c6e0a6ebc4af5974db451261e13-barbearia-bryan-gerson-01d6766983724634b023cfabba0411-booksy.jpeg', specialty: 'Barbeiro Tradicional', rating: 4.7, experience: '10 anos', status: 'available' }
];

export const timeSlots: string[] = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
];

export const horariosFuncionamento = {
    0: { status: 'Fechado' }, // Domingo
    1: { status: 'Fechado' }, // Segunda-Feira
    2: { status: 'Aberto', horarios: [{ inicio: 9, fim: 12 }, { inicio: 13, fim: 20 }] }, // Terça-Feira
    3: { status: 'Aberto', horarios: [{ inicio: 9, fim: 12 }, { inicio: 13, fim: 20 }] }, // Quarta-Feira
    4: { status: 'Aberto', horarios: [{ inicio: 9, fim: 12 }, { inicio: 13, fim: 20 }] }, // Quinta-Feira
    5: { status: 'Aberto', horarios: [{ inicio: 8, fim: 12 }, { inicio: 13, fim: 21 }] }, // Sexta-Feira
    6: { status: 'Aberto', horarios: [{ inicio: 8, fim: 12 }, { inicio: 13, fim: 19 }] }, // Sábado
};

export const servicosPadroes = [
    { id: 1, nome: "Corte Clássico", imagem: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop", preco: 40.00, categoria: "padroes" },
    { id: 2, nome: "Corte Infantil", imagem: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop", preco: 40.00, categoria: "padroes" },
    { id: 3, nome: "Barba Tradicional", imagem: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop", preco: 25.00, categoria: "padroes" },
    { id: 4, nome: "Raspagem da Barba", imagem: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop", preco: 15.00, categoria: "padroes" },
    { id: 5, nome: "Sobrancelha", imagem: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop", preco: 10.00, categoria: "padroes" },
];

export const servicosCombos = [
    { id: 6, nome: "Corte + Barba", imagem: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop", preco: 60.00, categoria: "combos" },
    { id: 7, nome: "Corte + Sobrancelha", imagem: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop", preco: 45.00, categoria: "combos" },
    { id: 8, nome: "Corte + Barba + Sobrancelha", imagem: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop", preco: 65.00, categoria: "combos" },
];

export const servicosExtras = [
    { id: 9, nome: "Penteado", imagem: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop", preco: 20.00, categoria: "extras" },
    { id: 10, nome: "Penteado Fio a Fio", imagem: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop", preco: 35.00, categoria: "extras" },
    { id: 11, nome: "Pigmentação", imagem: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop", preco: 25.00, categoria: "extras" },
    { id: 12, nome: "Luzes", imagem: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop", preco: 60.00, categoria: "extras" },
    { id: 13, nome: "Platinado Global", imagem: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop", preco: 90.00, categoria: "extras" },
    { id: 14, nome: "Depilação na Cera", imagem: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop", preco: 20.00, categoria: "extras" },
    { id: 15, nome: "Limpeza de Pele", imagem: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop", preco: 20.00, categoria: "extras" },
    { id: 16, nome: "Alisamento", imagem: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop", preco: 25.00, categoria: "extras" },
    { id: 17, nome: "Hidratação", imagem: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop", preco: 20.00, categoria: "extras" },
    { id: 18, nome: "Acabamento - Pezinho", imagem: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop", preco: 10.00, categoria: "extras" },
    { id: 19, nome: "Progressiva", imagem: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop", preco: 40.00, categoria: "extras" },
    { id: 20, nome: "Botox", imagem: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop", preco: 40.00, categoria: "extras" },
];

export const todosServicos = [...servicosPadroes, ...servicosCombos, ...servicosExtras];