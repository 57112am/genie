import { useState } from 'react';

const Project = () => {
  const [currentStep, setCurrentStep] = useState('form'); // Steps: 'form', 'loading', 'animalModel', 'summary'
  const [formData, setFormData] = useState({
    checklist: '',
    deviceDescription: '',
    materialComposition: '',
    indicationForUse: '',
    availableSizeMatrix: '',
    classOfDevice: '',
    previousStudies: '',
    similarDeviceStudies: '',
    predicateData: '',
    typeOfStudy: '',
  });
  const [loadingText, setLoadingText] = useState('');
  const [popupTicks, setPopupTicks] = useState([]);

  const popupFields = [
    'Standards - Drug eluting Devices (DES) ISO 25539',
    'Guidances FDA Guidance for General Considerations/requirements for Animal Studies for Medical Devices',
    'Predicate device data (FDA database)',
    'Literatures (various sources)',
    'Research articles (internet surfing)',
    'Review articles (internet surfing)',
    'Conference papers (internet surfing)',
    'Establish the objectives of the study (For DES)',
  ];

  const formFields = [
    { name: 'predicateData', label: 'Type of study (Feasibility, GLP, and nonGLP)', type: 'text' },
    { name: 'deviceDescription', label: 'Device Description', type: 'text' },
    { name: 'materialComposition', label: 'Material Composition', type: 'text' },
    { name: 'indicationForUse', label: 'Indication for Use', type: 'text' },
    { name: 'availableSizeMatrix', label: 'Available Size Matrix', type: 'text' },
    { name: 'classOfDevice', label: 'Previous studies, if available', type: 'text' },
    { name: 'previousStudies', label: 'Studies from similar devices, if available', type: 'text' },
    { name: 'similarDeviceStudies', label: 'Predicate data, if available', type: 'text' },
    {
      name: 'typeOfStudy',
      label: 'Type of Study',
      type: 'select',
      options: [
        { value: '', label: 'Select Type' },
        { value: 'Feasibility', label: 'Feasibility' },
        { value: 'GLP', label: 'GLP' },
        { value: 'Non-GLP', label: 'Non-GLP' },
      ],
    },
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setCurrentStep('loading');
    setLoadingText('Study Planning in Progress...');
    setPopupTicks([]); // Reset popup ticks
    setTimeout(() => {
      // Start showing ticks in the popup
      popupFields.forEach((_, index) => {
        setTimeout(() => {
          setPopupTicks((prev) => [...prev, index]);
        }, (index + 1) * 1000);
      });
    }, 500);

    // Simulate a delay before moving to the next step
    setTimeout(() => {
      setCurrentStep('animalModel');
    }, popupFields.length * 1000 + 2000);
  };

  const handleDownloadSynopsis = () => {
    const content = `
      Draft Study Synopsis
      ====================
      - Study Objectives: To evaluate the safety and efficacy of the device in accordance with regulatory guidelines.
      - Study Time Points: Initial, mid-term, and final assessments.
      - Assessments: Histopathology, clinical observations, and functional testing.
      - Animal Model: As determined based on predicate literature and guidelines.
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Draft_Study_Synopsis.txt';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center justify-center">
      {currentStep === 'form' && (
        <div className="w-1/2 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-4">Study Planning Form</h2>
          <form onSubmit={handleSubmitForm}>
            {formFields.map((field) => (
              <div className="mb-4" key={field.name}>
                <label className="block text-sm font-medium mb-2" htmlFor={field.name}>
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleFormChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              className="rounded-md bg-blue-500 text-white px-8 py-2 hover:bg-blue-700 transition duration-300 w-full md:w-auto"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {currentStep === 'loading' && (
        <div className="relative w-1/2 p-6 bg-white rounded shadow">
          <p className="text-xl font-bold mb-5">{loadingText}</p>
          <div className="absolute top-4 right-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
          <div className="mt-5 space-y-2">
            {popupFields.map((field, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <span>{field}</span>
                {popupTicks.includes(index) && <span className="text-green-500">✔</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {currentStep === 'animalModel' && (
        <div className="w-1/2 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-4">Animal Model Selection</h2>
          <p className="text-sm">
            Choose the appropriate animal model for testing (e.g., rodents, rabbits, pigs, sheep).
            This depends upon the predicate literature available and the relevant guidelines.
          </p>
          <button
            onClick={() => setCurrentStep('summary')}
            className="rounded-md mt-4 bg-blue-500 text-white px-8 py-2 hover:bg-blue-700 transition duration-300 w-full md:w-auto"
          >
            Proceed to Draft Synopsis
          </button>
        </div>
      )}

      {currentStep === 'summary' && (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Draft Study Synopsis</h2>
          <p>Includes: Study objectives, time points, assessments, and animal models.</p>
          <button
            onClick={handleDownloadSynopsis}
            className="rounded-md mt-4 bg-blue-500 text-white px-8 py-2 hover:bg-blue-700 transition duration-300 w-full md:w-auto"
          >
            Download Synopsis
          </button>
        </div>
      )}
    </div>
  );
};

export default Project;
