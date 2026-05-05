import { create } from 'zustand'
import { supabase } from './supabase'

const SAMPLE_QUESTIONS = [
  { id: '1', type: 'text', label: 'Qual é o nome da sua marca ou empresa?', required: true },
  { id: '2', type: 'textarea', label: 'Em uma frase, descreva o que sua empresa faz.', required: true },
  { id: '3', type: 'choice', label: 'Qual público-alvo você quer atingir?', required: true, options: ['Jovens (18-25)', 'Adultos (26-40)', 'Profissionais (35-55)', 'Público geral'] },
  { id: '4', type: 'choice', label: 'Qual é o tom da sua marca?', required: true, options: ['Sério e profissional', 'Jovem e descontraído', 'Luxuoso e exclusivo', 'Amigável e acessível'] },
  { id: '5', type: 'multicolor', label: 'Quais cores combinam com a personalidade da sua marca?', required: false },
  { id: '6', type: 'textarea', label: 'Cite 3 marcas que você admira esteticamente e por quê.', required: false },
  { id: '7', type: 'scale', label: 'Quão moderno vs clássico você quer que o visual seja?', required: true, min: 'Muito clássico', max: 'Muito moderno' },
  { id: '8', type: 'textarea', label: 'Há algo que você definitivamente NÃO quer na sua identidade visual?', required: false },
]

export const useStore = create((set, get) => ({
  forms: [],
  loading: false,

  loadForms: async () => {
    set({ loading: true })
    const { data, error } = await supabase
      .from('forms')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) {
      const forms = data.map(f => ({
        id: f.id,
        name: f.name,
        clientName: f.client_name,
        clientEmail: f.client_email,
        status: f.status,
        questions: f.questions || SAMPLE_QUESTIONS,
        responses: f.responses,
        createdAt: f.created_at,
        completedAt: f.completed_at,
      }))
      set({ forms, loading: false })
      return forms
    }
    set({ loading: false })
    return []
  },

  createForm: async (data) => {
    const id = `form-${Date.now()}`
    const { error } = await supabase.from('forms').insert({
      id,
      name: data.name,
      client_name: data.clientName,
      client_email: data.clientEmail || '',
      status: 'pending',
      questions: SAMPLE_QUESTIONS,
    })
    if (!error) await get().loadForms()
    return id
  },

  updateForm: async (id, updates) => {
    const dbUpdates = {}
    if (updates.questions !== undefined) dbUpdates.questions = updates.questions
    if (updates.status !== undefined) dbUpdates.status = updates.status
    if (updates.responses !== undefined) dbUpdates.responses = updates.responses
    if (updates.completedAt !== undefined) dbUpdates.completed_at = updates.completedAt
    await supabase.from('forms').update(dbUpdates).eq('id', id)
    await get().loadForms()
  },

  deleteForm: async (id) => {
    await supabase.from('forms').delete().eq('id', id)
    set(s => ({ forms: s.forms.filter(f => f.id !== id) }))
  },

  getForm: (id) => get().forms.find(f => f.id === id),

  submitResponses: async (formId, responses) => {
    await supabase.from('forms').update({
      responses,
      status: 'completed',
      completed_at: new Date().toISOString(),
    }).eq('id', formId)
    await get().loadForms()
  },
}))