'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { apiRequest } from '@/lib/api';
import { format, addDays, startOfToday, isSameDay, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  LogOut,
  ArrowRight,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Home() {
  const { data: session, status } = useSession();
  const [step, setStep] = useState(1); // 1: Service, 2: Calendar, 3: Confirm
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [selectedService, setSelectedService] = useState({
    id: 'serv-1',
    name: 'Corte de Cabelo Premium',
    price: '50,00',
    duration: '60 min'
  });

  // Load available slots when date changes
  useEffect(() => {
    if (selectedDate && step === 2) {
      const fetchSlots = async () => {
        try {
          const dateStr = format(selectedDate, 'yyyy-MM-dd');
          const slots = await apiRequest(`/availability?professionalId=prof-1&date=${dateStr}&slotDuration=60`);
          setAvailableSlots(slots);
          setSelectedSlot(null);
        } catch (err) {
          console.error('Failed to fetch slots', err);
        }
      };
      fetchSlots();
    }
  }, [selectedDate, step]);

  const handleConfirmBooking = async () => {
    if (!session) {
      signIn('google'); // Force login if not authenticated
      return;
    }

    setLoading(true);
    setError('');

    try {
      await apiRequest('/appointments', {
        method: 'POST',
        body: JSON.stringify({
          tenantId: 'tenant-1',
          professionalId: 'prof-1',
          customerId: 'cust-1', // In real app, this would be tied to session email/id
          serviceId: selectedService.id,
          startTime: selectedSlot,
        }),
      });
      setSuccess(true);
      setStep(4);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center bg-white text-gray-900">Carregando...</div>;
  }

  // Success State
  if (success) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
              <CheckCircle2 size={40} />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Agendamento Realizado!</CardTitle>
            <CardDescription className="text-gray-500">Tudo pronto para o seu atendimento.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-2">Resumo</p>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-gray-900">{selectedService.name}</span>
                <span className="text-gray-600">R$ {selectedService.price}</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-600 font-bold">
                <CalendarIcon size={16} />
                <span>{selectedDate ? format(selectedDate, "dd 'de' MMMM", { locale: ptBR }) : ''} às {selectedSlot ? format(new Date(selectedSlot), 'HH:mm') : ''}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center">
              Enviamos um lembrete para o seu e-mail: {session?.user?.email}
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700 rounded-xl"
              onClick={() => { setSuccess(false); setStep(1); }}
            >
              Voltar ao Início
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-xl tracking-tighter text-indigo-600">
            <CalendarIcon size={24} strokeWidth={3} />
            <span>AGENDA FÁCIL</span>
          </div>
          
          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3 bg-gray-50 p-1 pl-3 rounded-full border border-gray-200">
                <span className="text-sm font-bold text-gray-700 hidden sm:inline">{session.user?.name}</span>
                <Button variant="ghost" size="icon" onClick={() => signOut()} className="rounded-full hover:bg-red-50 hover:text-red-600">
                  <LogOut size={18} />
                </Button>
              </div>
            ) : (
              <Button onClick={() => signIn('google')} variant="outline" className="rounded-full font-bold border-gray-300 hover:bg-gray-50">
                Entrar
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Step Navigator (Visual) */}
          <div className="lg:col-span-12 flex items-center justify-center gap-4 mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step === i ? 'bg-indigo-600 text-white scale-110 shadow-lg ring-4 ring-indigo-100' : 
                  step > i ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {step > i ? <CheckCircle2 size={20} /> : i}
                </div>
                {i < 3 && <div className={`h-1 w-8 sm:w-16 rounded ${step > i ? 'bg-green-500' : 'bg-gray-100'}`} />}
              </div>
            ))}
          </div>

          {/* Sidebar - Context */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-black tracking-tighter leading-tight text-gray-900">
                Reserve sua <span className="text-indigo-600 underline decoration-indigo-200">experiência</span> em segundos.
              </h2>
              <p className="text-lg text-gray-500 font-medium">
                Escolha o serviço, a data e o horário. Simples assim.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Segurança Total</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Seus dados e horários são protegidos com autenticação verificada.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                  <Smartphone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Gestão Fácil</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Cancele ou remarque com um clique pela sua conta.</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <div className="lg:col-span-8">
            
            {/* Step 1: Services */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  1. Qual serviço você deseja?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'serv-1', name: 'Corte de Cabelo Premium', price: '50,00', duration: '60 min', desc: 'Lavagem, corte e finalização com pomada.' },
                    { id: 'serv-2', name: 'Barba e Toalha Quente', price: '35,00', duration: '30 min', desc: 'Barba completa com alinhamento e hidratação.' },
                    { id: 'serv-3', name: 'Combo (Corte + Barba)', price: '75,00', duration: '90 min', desc: 'O pacote completo para o seu visual.' }
                  ].map((s) => (
                    <Card 
                      key={s.id} 
                      className={`cursor-pointer transition-all hover:border-indigo-500 border-2 ${selectedService.id === s.id ? 'border-indigo-600 bg-indigo-50/50 ring-4 ring-indigo-50' : 'border-gray-200'}`}
                      onClick={() => setSelectedService({ id: s.id, name: s.name, price: s.price, duration: s.duration })}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-bold">{s.name}</CardTitle>
                          <span className="bg-white px-2 py-1 rounded-md text-sm font-black border border-gray-100 shadow-sm text-indigo-600">R$ {s.price}</span>
                        </div>
                        <CardDescription className="text-gray-500">{s.desc}</CardDescription>
                      </CardHeader>
                      <CardFooter className="text-sm text-gray-400 font-bold flex items-center gap-1">
                        <Clock size={14} /> {s.duration}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="pt-4 flex justify-end">
                  <Button 
                    className="h-14 px-8 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 rounded-2xl group shadow-xl shadow-indigo-100"
                    onClick={() => setStep(2)}
                  >
                    Próximo Passo
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Calendar & Slots */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  2. Escolha o melhor horário
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <Card className="border-gray-200 shadow-lg">
                    <CardHeader className="p-4 border-b">
                      <CardTitle className="text-sm uppercase tracking-tighter text-gray-400 font-black">Calendário</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        locale={ptBR}
                        disabled={(date) => isBefore(date, startOfToday())}
                        className="rounded-md border-none w-full"
                      />
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-700 flex items-center gap-2">
                      <Clock size={18} className="text-indigo-600" />
                      Disponibilidade: {selectedDate ? format(selectedDate, "dd/MM") : ''}
                    </h4>
                    
                    <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                      {availableSlots.length > 0 ? availableSlots.map((slot: any, i: number) => (
                        <Button
                          key={i}
                          variant={selectedSlot === slot.start ? 'default' : 'outline'}
                          className={`h-12 font-bold text-base transition-all ${
                            selectedSlot === slot.start ? 'bg-indigo-600 hover:bg-indigo-700 scale-105 shadow-md' : 'text-gray-700 border-gray-200 hover:border-indigo-600'
                          }`}
                          onClick={() => setSelectedSlot(slot.start)}
                        >
                          {format(new Date(slot.start), 'HH:mm')}
                        </Button>
                      )) : (
                        <div className="col-span-3 py-12 text-center text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed">
                          Selecione um dia no calendário
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(1)} className="font-bold text-gray-500">Voltar</Button>
                  <Button 
                    disabled={!selectedSlot}
                    className="h-14 px-8 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-xl shadow-indigo-100"
                    onClick={() => setStep(3)}
                  >
                    Revisar Agendamento
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Login Requirement */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  3. Quase lá! Revise e Confirme.
                </h3>

                <Card className="border-2 border-indigo-100 shadow-xl overflow-hidden">
                  <div className="bg-indigo-600 p-6 text-white">
                    <p className="text-xs uppercase font-bold tracking-widest opacity-80 mb-2">Você está agendando</p>
                    <h4 className="text-2xl font-black tracking-tight">{selectedService.name}</h4>
                  </div>
                  <CardContent className="p-8 space-y-6 bg-white">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-black uppercase">DATA</span>
                        <span className="text-xl font-bold">{selectedDate ? format(selectedDate, "dd 'de' MMMM", { locale: ptBR }) : ''}</span>
                      </div>
                      <div className="w-px h-8 bg-gray-100" />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-black uppercase">HORÁRIO</span>
                        <span className="text-xl font-bold">{selectedSlot ? format(new Date(selectedSlot), 'HH:mm') : ''}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <User size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Profissional: João Barbeiro</p>
                        <p className="text-xs text-gray-500 font-medium">Unidade: Barbearia Premium</p>
                      </div>
                    </div>

                    {!session ? (
                      <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100 space-y-4">
                        <div className="flex items-center gap-2 text-yellow-800 font-bold">
                          <ShieldCheck size={20} />
                          <span>Autenticação Necessária</span>
                        </div>
                        <p className="text-sm text-yellow-700 leading-relaxed font-medium">
                          Para garantir a sua vaga e evitar agendamentos falsos, precisamos que você entre com sua conta Google. É rápido e seguro.
                        </p>
                        <Button 
                          className="w-full h-12 bg-white text-gray-900 hover:bg-gray-50 border border-gray-200 font-black flex gap-3 rounded-xl shadow-sm"
                          onClick={() => signIn('google')}
                        >
                          <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.056-1.251-.16-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.259h2.908c1.702-1.567 2.684-3.874 2.684-6.617z" fill="#4285f4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34a853"/><path d="M3.964 10.71a5.41 5.41 0 0 1-.282-1.71c0-.604.105-1.189.282-1.71V4.958H.957A8.996 8.997 0 0 0 0 9c0 1.452.293 2.835.815 4.093l3.149-2.383z" fill="#fbbc05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L4.106 7.34c.708-2.127 2.692-3.71 5.036-3.71z" fill="#ea4335"/></svg>
                          Entrar com Google
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                        <CheckCircle2 className="text-green-600" size={20} />
                        <span className="text-sm font-bold text-green-800 tracking-tight">Logado como {session.user?.email}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="bg-gray-50 p-6 flex flex-col gap-4">
                    <div className="flex justify-between w-full text-lg font-black text-gray-900 px-2">
                      <span>Total</span>
                      <span>R$ {selectedService.price}</span>
                    </div>
                    <Button 
                      disabled={loading || !session}
                      className="w-full h-14 text-xl font-black bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-2xl shadow-indigo-100 disabled:opacity-30"
                      onClick={handleConfirmBooking}
                    >
                      {loading ? 'Processando...' : 'Confirmar Agora'}
                    </Button>
                    <Button variant="ghost" onClick={() => setStep(2)} className="font-bold text-gray-400">Alterar Data/Hora</Button>
                  </CardFooter>
                </Card>
                {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}
              </div>
            )}

          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ddd;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ccc;
        }
      `}</style>
    </div>
  );
}
