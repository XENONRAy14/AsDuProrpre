import React, { useState } from 'react';
import { MapPin, Phone, User, MessageCircle } from 'lucide-react';
import { OrderFormData } from '../../types';

interface OrderFormProps {
  onSubmit: (data: OrderFormData) => void;
  loading?: boolean;
}

export default function OrderForm({ onSubmit, loading }: OrderFormProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    customer_name: '',
    customer_phone: '',
    customer_address: '',
    delivery_notes: '',
  });

  const [errors, setErrors] = useState<Partial<OrderFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<OrderFormData> = {};

    if (!formData.customer_name.trim()) {
      newErrors.customer_name = 'Le nom est requis';
    }

    if (!formData.customer_phone.trim()) {
      newErrors.customer_phone = 'Le téléphone est requis';
    } else if (!/^[0-9\s\-\+\(\)\.]{10,}$/.test(formData.customer_phone)) {
      newErrors.customer_phone = 'Format de téléphone invalide';
    }

    if (!formData.customer_address.trim()) {
      newErrors.customer_address = 'L\'adresse est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof OrderFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
          <User className="h-4 w-4" />
          <span>Nom complet *</span>
        </label>
        <input
          type="text"
          value={formData.customer_name}
          onChange={(e) => handleChange('customer_name', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.customer_name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Votre nom et prénom"
        />
        {errors.customer_name && (
          <p className="mt-1 text-sm text-red-600">{errors.customer_name}</p>
        )}
      </div>

      <div>
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
          <Phone className="h-4 w-4" />
          <span>Téléphone *</span>
        </label>
        <input
          type="tel"
          value={formData.customer_phone}
          onChange={(e) => handleChange('customer_phone', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.customer_phone ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="06 12 34 56 78"
        />
        {errors.customer_phone && (
          <p className="mt-1 text-sm text-red-600">{errors.customer_phone}</p>
        )}
      </div>

      <div>
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
          <MapPin className="h-4 w-4" />
          <span>Adresse de livraison *</span>
        </label>
        <textarea
          value={formData.customer_address}
          onChange={(e) => handleChange('customer_address', e.target.value)}
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
            errors.customer_address ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Votre adresse complète à Marseille ou alentours"
        />
        {errors.customer_address && (
          <p className="mt-1 text-sm text-red-600">{errors.customer_address}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Livraison uniquement sur Marseille et alentours
        </p>
      </div>

      <div>
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
          <MessageCircle className="h-4 w-4" />
          <span>Notes de livraison (optionnel)</span>
        </label>
        <textarea
          value={formData.delivery_notes}
          onChange={(e) => handleChange('delivery_notes', e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
          placeholder="Instructions spéciales, code d'accès, étage..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
      >
        {loading ? (
          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
        ) : (
          <span>Passer la commande</span>
        )}
      </button>
    </form>
  );
}