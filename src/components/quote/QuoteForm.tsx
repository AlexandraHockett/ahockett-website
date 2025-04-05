// src/components/quote/QuoteForm.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Button from "@/components/ui/Button";
import { useLocale } from "@/contexts/LocaleContext";
import { formatPrice } from "@/utils/pricing";

// Form steps interface
interface FormStep {
  id: number;
  title: string;
  fields: FormField[];
}

// Form field interface
interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  helpText?: string;
}

export default function QuoteForm() {
  // Obter o locale atual do contexto
  const { locale } = useLocale();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({
    // Inicializa todos os campos possíveis com valores vazios
    businessName: "",
    industry: "",
    businessDescription: "",
    websiteType: "",
    existingUrl: "",
    pages: "",
    features: [],
    budget: "",
    timeline: "",
    additionalInfo: "",
    name: "",
    email: "",
    phone: "",
    preferredContact: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formSteps, setFormSteps] = useState<FormStep[]>([]);

  const formRef = useRef<HTMLFormElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  // Efeito para atualizar as opções de orçamento com base na moeda selecionada
  useEffect(() => {
    // Define os passos do formulário com base no locale atual
    setFormSteps([
      {
        id: 1,
        title: "About Your Business",
        fields: [
          {
            id: "businessName",
            label: "Business Name",
            type: "text",
            placeholder: "e.g., Your Company Name",
            required: true,
          },
          {
            id: "industry",
            label: "Industry",
            type: "select",
            options: [
              { value: "", label: "Select your industry" },
              { value: "ecommerce", label: "E-commerce" },
              { value: "business", label: "Business / Corporate" },
              { value: "portfolio", label: "Portfolio / Creative" },
              { value: "blog", label: "Blog / Publishing" },
              { value: "education", label: "Education" },
              { value: "events", label: "Events" },
              { value: "other", label: "Other" },
            ],
            required: true,
          },
          {
            id: "businessDescription",
            label: "Brief Description of Your Business",
            type: "textarea",
            placeholder:
              "Tell me a bit about your business and your target audience...",
            required: true,
          },
        ],
      },
      {
        id: 2,
        title: "Website Details",
        fields: [
          {
            id: "websiteType",
            label: "Website Type",
            type: "radio",
            options: [
              { value: "new", label: "New Website" },
              { value: "redesign", label: "Redesign Existing Website" },
            ],
            required: true,
          },
          {
            id: "existingUrl",
            label: "Existing Website URL (if redesign)",
            type: "text",
            placeholder: "https://",
          },
          {
            id: "pages",
            label: "Estimated Number of Pages",
            type: "select",
            options: [
              { value: "", label: "Select number of pages" },
              { value: "1-5", label: "1-5 pages" },
              { value: "6-10", label: "6-10 pages" },
              { value: "11-20", label: "11-20 pages" },
              { value: "20+", label: "20+ pages" },
            ],
            required: true,
          },
          {
            id: "features",
            label: "Key Features Needed",
            type: "checkbox",
            options: [
              { value: "responsive", label: "Responsive Design" },
              { value: "animations", label: "Custom Animations" },
              { value: "cms", label: "Content Management System" },
              { value: "ecommerce", label: "E-commerce Functionality" },
              { value: "blog", label: "Blog" },
              { value: "forms", label: "Contact/Lead Forms" },
              { value: "seo", label: "SEO Optimization" },
              { value: "social", label: "Social Media Integration" },
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Budget & Timeline",
        fields: [
          {
            id: "budget",
            label: "Budget Range",
            type: "select",
            options: [
              { value: "", label: "Select your budget range" },
              {
                value: "1000-3000",
                label: `${formatPrice(1000, locale)} - ${formatPrice(3000, locale)}`,
              },
              {
                value: "3000-5000",
                label: `${formatPrice(3000, locale)} - ${formatPrice(5000, locale)}`,
              },
              {
                value: "5000-10000",
                label: `${formatPrice(5000, locale)} - ${formatPrice(10000, locale)}`,
              },
              { value: "10000+", label: `${formatPrice(10000, locale)}+` },
              { value: "unsure", label: "Not sure yet" },
            ],
            required: true,
            helpText:
              "This helps me tailor solutions that fit within your budget.",
          },
          {
            id: "timeline",
            label: "Desired Timeline",
            type: "select",
            options: [
              { value: "", label: "Select your timeline" },
              { value: "1month", label: "Less than 1 month" },
              { value: "1-2months", label: "1-2 months" },
              { value: "2-3months", label: "2-3 months" },
              { value: "3months+", label: "3+ months" },
              { value: "flexible", label: "Flexible" },
            ],
            required: true,
          },
          {
            id: "additionalInfo",
            label: "Additional Information",
            type: "textarea",
            placeholder:
              "Anything else you'd like me to know about your project?",
          },
        ],
      },
      {
        id: 4,
        title: "Contact Information",
        fields: [
          {
            id: "name",
            label: "Your Name",
            type: "text",
            placeholder: "Full Name",
            required: true,
          },
          {
            id: "email",
            label: "Email Address",
            type: "email",
            placeholder: "email@example.com",
            required: true,
          },
          {
            id: "phone",
            label: "Phone Number",
            type: "tel",
            placeholder: "+1 (123) 456-7890",
          },
          {
            id: "preferredContact",
            label: "Preferred Contact Method",
            type: "radio",
            options: [
              { value: "email", label: "Email" },
              { value: "phone", label: "Phone" },
            ],
            required: true,
          },
        ],
      },
    ]);
  }, [locale]);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value, type, checked } = e.target as any;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [id]: checked
          ? [...(prev[id] || []), value]
          : (prev[id] || []).filter((item: string) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  // Handle form submission - Versão melhorada com logs detalhados
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Enviando dados:", formData);

      // Adicionar informação da moeda/locale escolhido
      const dataToSend = {
        ...formData,
        locale,
        currency:
          locale === "pt-PT" ? "EUR" : locale === "en-GB" ? "GBP" : "USD",
      };

      // Enviar para a nossa API route de cotação
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      console.log("Resposta do servidor:", data);

      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        // Mostra o erro mais descritivo possível
        const errorMessage =
          data.error || data.details || "Falha no envio do pedido de cotação";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Erro ao submeter formulário:", error);
      // Mostrar o erro no UI em vez de apenas no console
      alert(
        `Erro ao enviar o pedido: ${error instanceof Error ? error.message : "Erro desconhecido"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < formSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Check if current step is valid (all required fields are filled)
  const isStepValid = () => {
    const currentFields =
      formSteps.find((step) => step.id === currentStep)?.fields || [];
    return currentFields.every((field) => {
      if (!field.required) return true;
      return (
        formData[field.id] &&
        (typeof formData[field.id] === "string"
          ? formData[field.id].trim() !== ""
          : formData[field.id].length > 0)
      );
    });
  };

  // Update progress bar
  useEffect(() => {
    if (stepsRef.current) {
      const progress = ((currentStep - 1) / (formSteps.length - 1)) * 100;
      gsap.to(stepsRef.current.querySelector(".progress-bar"), {
        width: `${progress}%`,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [currentStep, formSteps.length]);

  // Animate fields when step changes
  useEffect(() => {
    if (formRef.current) {
      const fields = formRef.current.querySelectorAll(".form-field");

      gsap.fromTo(
        fields,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
        }
      );
    }
  }, [currentStep]);

  // Se os passos do formulário ainda não estiverem carregados, mostrar um estado de carregamento
  if (formSteps.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl p-8 border border-purple-500/30 shadow-xl flex justify-center items-center min-h-[300px]">
        <div className="text-white text-center">
          <svg
            className="animate-spin h-8 w-8 mx-auto mb-4 text-purple-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p>Loading form...</p>
        </div>
      </div>
    );
  }

  // If form is submitted, show success message
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl p-8 border border-green-500/30 shadow-xl"
      >
        <div className="text-center py-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="mx-auto w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </motion.div>

          <h3 className="text-2xl font-bold text-white mb-4">
            Quote Request Submitted!
          </h3>
          <p className="text-gray-300 mb-6">
            Thank you for your inquiry. I'll review your project details and get
            back to you with a comprehensive quote within 48 hours.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button title="Return to Home" href="/" />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl p-8 border border-purple-500/30 shadow-xl"
    >
      {/* Progress Steps */}
      <div ref={stepsRef} className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {formSteps.map((step) => (
            <motion.div
              key={step.id}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                step.id === currentStep
                  ? "bg-purple-600 text-white"
                  : step.id < currentStep
                    ? "bg-green-600 text-white"
                    : "bg-gray-700 text-gray-400"
              }`}
              whileHover={step.id <= currentStep ? { scale: 1.1 } : {}}
              onClick={() => step.id < currentStep && setCurrentStep(step.id)}
              style={{ cursor: step.id < currentStep ? "pointer" : "default" }}
            >
              {step.id < currentStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                step.id
              )}
            </motion.div>
          ))}
        </div>

        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="progress-bar h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
            style={{ width: "0%" }}
          ></div>
        </div>

        <div className="mt-2 text-center">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-1">
            {formSteps.find((step) => step.id === currentStep)?.title}
          </h2>
          <p className="text-gray-400 text-sm">
            Step {currentStep} of {formSteps.length}
          </p>
        </div>
      </div>

      {/* Form */}
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="space-y-6">
          {formSteps
            .find((step) => step.id === currentStep)
            ?.fields.map((field) => (
              <div key={field.id} className="form-field">
                <label
                  htmlFor={field.id}
                  className="block text-white font-medium mb-2"
                >
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                {field.type === "text" ||
                field.type === "email" ||
                field.type === "tel" ? (
                  <input
                    type={field.type}
                    id={field.id}
                    value={formData[field.id] || ""}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 focus:border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  />
                ) : field.type === "textarea" ? (
                  <textarea
                    id={field.id}
                    value={formData[field.id] || ""}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 focus:border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  />
                ) : field.type === "select" ? (
                  <select
                    id={field.id}
                    value={formData[field.id] || ""}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 focus:border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  >
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "radio" ? (
                  <div className="space-y-2">
                    {field.options?.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          id={field.id}
                          name={field.id}
                          value={option.value}
                          checked={formData[field.id] === option.value}
                          onChange={handleChange}
                          required={field.required}
                          className="w-5 h-5 text-purple-600 bg-gray-800 border-gray-700 focus:ring-purple-500/50"
                        />
                        <span className="text-gray-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                ) : field.type === "checkbox" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {field.options?.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id={field.id}
                          name={field.id}
                          value={option.value}
                          checked={
                            Array.isArray(formData[field.id])
                              ? formData[field.id].includes(option.value)
                              : false
                          } // Garante que é sempre um booleano
                          onChange={handleChange}
                          className="w-5 h-5 text-purple-600 bg-gray-800 border-gray-700 rounded focus:ring-purple-500/50"
                        />
                        <span className="text-gray-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                ) : null}

                {field.helpText && (
                  <p className="mt-1 text-sm text-gray-400">{field.helpText}</p>
                )}
              </div>
            ))}
        </div>

        <div className="mt-8 flex justify-between">
          <motion.button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
              currentStep === 1
                ? "opacity-50 cursor-not-allowed bg-gray-700"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            whileHover={currentStep !== 1 ? { scale: 1.05 } : {}}
            whileTap={currentStep !== 1 ? { scale: 0.95 } : {}}
          >
            Previous
          </motion.button>

          {currentStep < formSteps.length ? (
            <motion.button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid()}
              className={`px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                !isStepValid()
                  ? "opacity-50 cursor-not-allowed bg-purple-700"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
              whileHover={isStepValid() ? { scale: 1.05 } : {}}
              whileTap={isStepValid() ? { scale: 0.95 } : {}}
            >
              Next
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              disabled={isSubmitting || !isStepValid()}
              className={`px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                isSubmitting || !isStepValid()
                  ? "opacity-50 cursor-not-allowed bg-green-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              whileHover={!isSubmitting && isStepValid() ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting && isStepValid() ? { scale: 0.95 } : {}}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Quote Request"
              )}
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
}
