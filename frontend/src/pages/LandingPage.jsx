import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BarChart3, ShieldCheck, Bot, FileText, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  const features = [
    { icon: BarChart3, title: 'Финансовая аналитика', text: 'Доходы, расходы и прибыль в реальном времени.' },
    { icon: FileText, title: 'Налоги РК', text: 'Подготовка форм 200 / 220 и расчёты.' },
    { icon: Bot, title: 'AI помощник', text: 'Подсказывает риски и точки роста.' },
    { icon: ShieldCheck, title: 'Безопасность', text: 'Надёжное хранение данных.' },
  ];

  return (
    <div className='min-h-screen bg-slate-950 text-white overflow-hidden'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.22),transparent_30%),radial-gradient(circle_at_left,rgba(168,85,247,0.18),transparent_30%)]' />

      <header className='relative max-w-7xl mx-auto flex items-center justify-between p-6'>
        <div className='text-2xl font-bold'>FinX</div>
        <nav className='hidden md:flex gap-8 text-slate-300'>
          <a href='#features'>Возможности</a>
          <a href='#why'>Почему мы</a>
        </nav>
        <Link to='/app/' className='px-5 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 transition'>Войти</Link>
      </header>

      <section className='relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center'>
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className='inline-block px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm mb-6'>Для ИП и малого бизнеса Казахстана</div>
          <h1 className='text-5xl md:text-7xl font-bold leading-tight'>Умный учёт и налоги <span className='text-blue-400'>без стресса</span></h1>
          <p className='text-slate-300 text-lg mt-6 max-w-xl'>Современный сервис для предпринимателей: финансы, отчёты, декларации и AI аналитика в одном месте.</p>
          <div className='flex flex-wrap gap-4 mt-8'>
            <Link to='/app/' className='px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition'>Начать бесплатно</Link>
            <a href='#features' className='px-8 py-4 rounded-2xl border border-slate-600 hover:bg-white/5 transition'>Подробнее</a>
          </div>
          <div className='grid grid-cols-3 gap-6 mt-10 text-sm text-slate-300'>
            <div><div className='text-3xl font-bold text-white'>6+</div>пользователей</div>
            <div><div className='text-3xl font-bold text-white'>24/7</div>AI помощь</div>
            <div><div className='text-3xl font-bold text-white'>12ч</div>экономии</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <div className='rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl p-6 shadow-2xl'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='p-4 rounded-2xl bg-slate-900/70'>
                <div className='text-slate-400 text-sm'>Доход</div>
                <div className='text-2xl font-bold'>₸ 4.2M</div>
              </div>
              <div className='p-4 rounded-2xl bg-slate-900/70'>
                <div className='text-slate-400 text-sm'>Прибыль</div>
                <div className='text-2xl font-bold text-emerald-400'>₸ 1.6M</div>
              </div>
            </div>
            <div className='h-40 rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-500/20 flex items-end gap-2 p-4 mt-4'>
              <div className='h-12 w-full bg-white/20 rounded'></div>
              <div className='h-20 w-full bg-white/20 rounded'></div>
              <div className='h-28 w-full bg-white/20 rounded'></div>
              <div className='h-16 w-full bg-white/20 rounded'></div>
              <div className='h-32 w-full bg-white/20 rounded'></div>
            </div>
            <div className='p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-sm mt-4'>AI совет: сократите лишние расходы на 12%.</div>
          </div>
        </motion.div>
      </section>

      <section id='features' className='relative max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {features.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className='rounded-3xl bg-white/5 border border-white/10 p-6'>
              <Icon className='text-blue-400 mb-4' />
              <h3 className='font-semibold text-lg mb-2'>{item.title}</h3>
              <p className='text-slate-300 text-sm'>{item.text}</p>
            </div>
          );
        })}
      </section>

      <section id='why' className='relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-10'>
        <div>
          <h2 className='text-4xl font-bold mb-6'>Почему выбирают нас</h2>
          <div className='space-y-4'>
            {['Под Казахстан', 'Простой интерфейс', 'Автоматизация рутины', 'Подходит новичкам', 'Рост вместе с бизнесом'].map((text, i) => (
              <div key={i} className='flex gap-3 items-center'>
                <CheckCircle2 className='text-emerald-400' />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-8'>
          <h3 className='text-3xl font-bold mb-4'>Готово к работе</h3>
          <p className='text-white/90 mb-6'>Подключайтесь сегодня и автоматизируйте финансовый учёт вашего бизнеса.</p>
          <Link to='/app/' className='px-8 py-4 rounded-2xl bg-white text-slate-900 font-semibold inline-block'>Попробовать</Link>
        </div>
      </section>

      <footer className='border-t border-white/10'>
        <div className='max-w-7xl mx-auto px-6 py-8 text-slate-400 text-sm'>© 2026 FinX</div>
      </footer>
    </div>
  );
}