import React from 'react';

const WorkoutItem = ({ workout, onDelete, onEdit }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-slate-600 transition-all">
      <div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
          {workout.category}
        </span>
        <h3 className="text-lg font-bold text-white mt-2">{workout.title}</h3>
        <p className="text-slate-400 text-sm mt-1">⏳ {workout.duration} Dakika • 🔥 {workout.calories} kcal</p>
      </div>
      
      <div className="flex space-x-2 w-full md:w-auto justify-end">
        <button 
          onClick={() => onEdit(workout)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
        >
          Düzenle
        </button>
        <button 
          onClick={() => onDelete(workout.id)}
          className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-sm border border-red-500/30 transition-all"
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default WorkoutItem;