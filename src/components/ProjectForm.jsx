import { useState } from 'react'

export default function ProjectForm({ project, onSubmit, onCancel, loading = false }) {
  const [formData, setFormData] = useState({
    name: project?.name || '',
    type: project?.type || 'inner',
    product_manager: project?.product_manager || '',
    project_manager: project?.project_manager || '',
    epic: project?.epic || '',
    implementation_type: project?.implementation_type || 'Dev',
    start_date: project?.start_date || '',
    end_date: project?.end_date || '',
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (!formData.name.trim()) throw new Error('Название проекта обязательно')
      if (!formData.start_date) throw new Error('Дата старта обязательна')
      if (!formData.end_date) throw new Error('Дата завершения обязательна')

      await onSubmit(formData)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {project ? 'Редактировать проект' : 'Новый проект'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название проекта *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Например: Интеграция с платежной системой"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Тип проекта
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="inner">Internal (Внутренний)</option>
                <option value="cross">Cross-functional (Кроссфункциональный)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Тип реализации
              </label>
              <select
                name="implementation_type"
                value={formData.implementation_type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Discovery">Discovery</option>
                <option value="TA">TA (Technical Architecture)</option>
                <option value="Dev">Dev (Development)</option>
                <option value="Release">Release</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Manager
            </label>
            <input
              type="text"
              name="product_manager"
              value={formData.product_manager}
              onChange={handleChange}
              placeholder="Введите имя PM"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Manager
            </label>
            <input
              type="text"
              name="project_manager"
              value={formData.project_manager}
              onChange={handleChange}
              placeholder="Введите имя Project Manager"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Epic (текст или ссылка)
            </label>
            <input
              type="text"
              name="epic"
              value={formData.epic}
              onChange={handleChange}
              placeholder="https://example.com/epic или описание"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дата старта *
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дата завершения *
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-3 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 font-medium transition"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 font-medium transition"
            >
              {loading ? 'Сохранение...' : project ? 'Обновить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
