import React, { useState, useEffect } from 'react';
import WorkoutItem from '../components/WorkoutItem';

const Home = () => {
  // Yönerge Şartı: LocalStorage kullanımı
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem('workouts');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Hipertrofi Odaklı Göğüs & Kol', category: 'Hipertrofi', duration: '45', calories: '320' },
      { id: 2, title: 'Yağ Yakımı Odaklı Tüm Vücut', category: 'Kardiyo', duration: '30', calories: '400' }
    ];
  });

  const [formData, setFormData] = useState({ title: '', category: 'Hipertrofi', duration: '', calories: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  // CREATE (Ekleme) & UPDATE (Güncelleme)
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

  // DELETE (Silme)
  const handleDelete = (id) => {
    setWorkouts(workouts.filter(item => item.id !== id));
  };

  // EDIT (Güncelleme Moduna Alma)
  const handleEdit = (workout) => {
    setFormData(workout);
    setEditingId(workout.id);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Form Alanı */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl h-fit">
        <h2 className="text-white font-bold mb-4">{editingId ? '🔄 Programı Güncelle' : '➕ Yeni Program Ekle'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Antrenman Adı</label>
            <input 
              type="text" 
              placeholder="Örn: Biceps & Triceps" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-slate-800 text-white rounded-lg p-2.5 text-sm border border-slate-700 focus:border-teal-400 outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Kategori</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full bg-slate-800 text-white rounded-lg p-2.5 text-sm border border-slate-700 outline-none"
            >
              <option value="Hipertrofi">Hipertrofi</option>
              <option value="Kardiyo">Kardiyo</option>
              <option value="Güç">Güç</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Süre (Dk)</label>
              <input 
                type="number" placeholder="45" value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full bg-slate-800 text-white rounded-lg p-2.5 text-sm border border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Kalori</label>
              <input 
                type="number" placeholder="300" value={formData.calories}
                onChange={(e) => setFormData({...formData, calories: e.target.value})}
                className="w-full bg-slate-800 text-white rounded-lg p-2.5 text-sm border border-slate-700 outline-none"
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold py-2.5 rounded-lg transition-colors text-sm shadow-lg shadow-teal-400/10">
            {editingId ? 'Değişiklikleri Kaydet' : 'Listeye Ekle'}
          </button>
        </form>
      </div>

      {/* Liste Alanı */}
      <div className="md:col-span-2 space-y-3">
        <h2 className="text-white font-bold mb-2">📋 Kayıtlı AI Programları ({workouts.length})</h2>
        {workouts.length === 0 ? (
          <p className="text-slate-500 text-sm">Henüz eklenmiş bir program yok.</p>
        ) : (
          workouts.map(item => (
            <WorkoutItem key={item.id} workout={item} onDelete={handleDelete} onEdit={handleEdit} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;