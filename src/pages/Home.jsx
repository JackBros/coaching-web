import React, { useState, useEffect } from 'react';
import WorkoutItem from '../components/WorkoutItem';

const Home = () => {
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem('workouts');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Hipertrofi Odaklı Göğüs & Kol', category: 'Hipertrofi', duration: '45', calories: '320' },
      { id: 2, title: 'Yağ Yakımı Odaklı Tüm Vücut', category: 'Kardiyo', duration: '30', calories: '400' },
      { id: 3, title: 'Alt Vücut Güç & Kuvvet', category: 'Güç', duration: '60', calories: '550' }
    ];
  });

  const [formData, setFormData] = useState({ title: '', category: 'Hipertrofi', duration: '', calories: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  // Dinamik İstatistik Hesaplamaları
  const totalDuration = workouts.reduce((acc, curr) => acc + Number(curr.duration || 0), 0);
  const totalCalories = workouts.reduce((acc, curr) => acc + Number(curr.calories || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.duration) return alert('Lütfen başlık ve süre giriniz!');

    if (editingId) {
      setWorkouts(workouts.map(item => item.id === editingId ? { ...formData, id: editingId } : item));
      setEditingId(null);
    } else {
      setWorkouts([...workouts, { ...formData, id: Date.now() }]);
    }
    setFormData({ title: '', category: 'Hipertrofi', duration: '', calories: '' });
  };

  const handleDelete = (id) => {
    setWorkouts(workouts.filter(item => item.id !== id));
  };

  const handleEdit = (workout) => {
    setFormData(workout);
    setEditingId(workout.id);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ÜST İSTATİSTİK BARı (Yeni Eklendi) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-center space-x-4 shadow-lg">
          <div className="p-3 bg-teal-500/10 text-teal-400 rounded-xl text-2xl border border-teal-500/20">🏋️‍♂️</div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-medium">Toplam Program</p>
            <p className="text-2xl font-black text-white">{workouts.length} <span className="text-xs font-normal text-teal-400">Adet</span></p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-center space-x-4 shadow-lg">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl text-2xl border border-indigo-500/20">⏱️</div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-medium">Toplam Süre</p>
            <p className="text-2xl font-black text-white">{totalDuration} <span className="text-xs font-normal text-indigo-400">Dakika</span></p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-center space-x-4 shadow-lg">
          <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl text-2xl border border-rose-500/20">🔥</div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-medium">Hedef Kalori</p>
            <p className="text-2xl font-black text-white">{totalCalories} <span className="text-xs font-normal text-rose-400">kcal</span></p>
          </div>
        </div>
      </div>

      {/* ANA İSKELET (1 Kolon Form - 2 Kolon Liste) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* SOL: FORM ALANI */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl lg:sticky lg:top-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>{editingId ? '🔄' : '➕'}</span>
              <span>{editingId ? 'Programı Düzenle' : 'Yeni Plan Oluştur'}</span>
            </h2>
            {editingId && (
              <button onClick={() => {setEditingId(null); setFormData({title:'', category:'Hipertrofi', duration:'', calories:''})}} className="text-xs text-rose-400 hover:underline">
                İptal Et
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Antrenman Adı</label>
              <input 
                type="text" 
                placeholder="Örn: Biceps & Triceps Hipertrofi" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-slate-950 text-white rounded-xl p-3 text-sm border border-slate-800 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Kategori Seçimi</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-slate-950 text-white rounded-xl p-3 text-sm border border-slate-800 focus:border-teal-400 outline-none transition-all"
              >
                <option value="Hipertrofi">Hipertrofi Odaklı</option>
                <option value="Kardiyo">Kardiyo & Kondisyon</option>
                <option value="Güç">Güç & Kuvvet</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Tahmini Süre</label>
                <div className="relative">
                  <input 
                    type="number" placeholder="45" value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full bg-slate-950 text-white rounded-xl p-3 text-sm border border-slate-800 focus:border-teal-400 outline-none pr-8"
                  />
                  <span className="absolute right-3 top-3 text-xs text-slate-500">Dk</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Yakılacak Kalori</label>
                <div className="relative">
                  <input 
                    type="number" placeholder="320" value={formData.calories}
                    onChange={(e) => setFormData({...formData, calories: e.target.value})}
                    className="w-full bg-slate-950 text-white rounded-xl p-3 text-sm border border-slate-800 focus:border-teal-400 outline-none pr-8"
                  />
                  <span className="absolute right-3 top-3 text-xs text-slate-500">kcal</span>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full mt-2 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 text-slate-950 font-extrabold py-3.5 rounded-xl transition-all text-sm shadow-lg shadow-teal-500/10 active:scale-[0.99]">
              {editingId ? 'Değişiklikleri Güncelle' : 'AI Listesine Ekle 🚀'}
            </button>
          </form>
        </div>

        {/* SAĞ: LİSTE ALANI (2 Kolon Genişliğinde) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-end pb-2 border-b border-slate-800/60">
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">Aktif Antrenman Akışı</h2>
              <p className="text-sm text-slate-400">Yapılan değişiklikler tarayıcı hafızasında (LocalStorage) korunur.</p>
            </div>
            <span className="text-xs font-mono bg-slate-900 border border-slate-800 text-slate-400 py-1 px-2.5 rounded-lg">
              Canlı Akış
            </span>
          </div>

          <div className="space-y-3.5">
            {workouts.length === 0 ? (
              <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-slate-400 font-medium text-base">Listeniz şu an boş görünüyor.</p>
                <p className="text-slate-600 text-sm mt-1">Sol taraftaki formu kullanarak ilk planınızı oluşturun.</p>
              </div>
            ) : (
              workouts.map(item => (
                <WorkoutItem key={item.id} workout={item} onDelete={handleDelete} onEdit={handleEdit} />
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;