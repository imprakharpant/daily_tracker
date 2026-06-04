import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import api from '../api/axios';
import { Card, Skeleton } from '../components/ui';
import StarBorder from '../components/StarBorder';

export default function Notes() {
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const res = await api.get('/notes');
      return res.data;
    }
  });

  const createNote = useMutation({
    mutationFn: (newContent: string) => api.post('/notes', { content: newContent }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setContent('');
    }
  });

  const deleteNote = useMutation({
    mutationFn: (id: string) => api.delete(`/notes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    }
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    createNote.mutate(content);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-serif mb-2 text-white">My Notes</h1>
        <p className="text-gray-400 font-light">Capture your thoughts and personal reflections.</p>
      </div>

      <Card className="p-4 border-white/5 bg-[#111]">
        <form onSubmit={handleAdd} className="flex flex-col gap-4 relative z-10">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something down..."
            className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-[#D4AF37]/50 min-h-[100px] resize-y text-gray-200 placeholder:text-gray-500 transition-all backdrop-blur-md font-light"
          ></textarea>
          <div className="flex justify-end">
            <StarBorder 
              as="button"
              type="submit" 
              disabled={createNote.isPending || !content.trim()} 
              color="#D4AF37"
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-2 font-medium">
                <Plus size={18} /> Add Note
              </div>
            </StarBorder>
          </div>
        </form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </>
        ) : notes.length === 0 ? (
          <div className="col-span-1 md:col-span-2 text-center py-12 text-gray-500">
            No notes yet. Start writing your thoughts above!
          </div>
        ) : (
          notes.map((note: any, index: number) => (
            <motion.div
              key={note._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Card className="p-6 relative group overflow-hidden border-white/5 bg-[#111] hover:border-white/10 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-gray-300 whitespace-pre-wrap relative z-10 mb-6 font-light">{note.content}</p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5 relative z-10">
                  <span className="text-xs text-gray-500">
                    {new Date(note.createdAt).toLocaleDateString(undefined, { 
                      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                    })}
                  </span>
                  <button 
                    onClick={() => deleteNote.mutate(note._id)}
                    disabled={deleteNote.isPending}
                    className="text-gray-500 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
