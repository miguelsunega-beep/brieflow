import { create } from 'zustand'

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
  forms: [
    {
      id: 'demo-001',
      name: 'Projeto Exemplo — Cafeteria Moderna',
      clientName: 'João Silva',
      clientEmail: 'joao@exemplo.com',
      createdAt: new Date().toISOString(),
      status: 'pending',
      questions: SAMPLE_QUESTIONS,
      responses: null,
    }
  ],
  
  createForm: (data) => {
    const id = `form-${Date.now()}`
    const newForm = {
      id,
      ...data,
      createdAt: new Date().toISOString(),
      status: 'pending',
      questions: [...SAMPLE_QUESTIONS],
      responses: null,
    }
    set(s => ({ forms: [...s.forms, newForm] }))
    return id
  },

  updateForm: (id, updates) => set(s => ({
    forms: s.forms.map(f => f.id === id ? { ...f, ...updates } : f)
  })),

  deleteForm: (id) => set(s => ({ forms: s.forms.filter(f => f.id !== id) })),

  getForm: (id) => get().forms.find(f => f.id === id),

  submitResponses: (formId, responses) => {
    set(s => ({
      forms: s.forms.map(f =>
        f.id === formId
          ? { ...f, responses, status: 'completed', completedAt: new Date().toISOString() }
          : f
      )
    }))
  }
}))
