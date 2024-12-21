import { useState } from 'react';

const App = () => {
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

  const formFields = [
    { name: 'checklist', label: 'Checklist', type: 'text' },
    { name: 'deviceDescription', label: 'Device Description', type: 'text' },
    { name: 'materialComposition', label: 'Material Composition', type: 'text' },
    { name: 'indicationForUse', label: 'Indication for Use', type: 'text' },
    { name: 'availableSizeMatrix', label: 'Available Size Matrix', type: 'text' },
    { name: 'classOfDevice', label: 'Class of Device', type: 'text' },
    { name: 'previousStudies', label: 'Previous Studies', type: 'text' },
    { name: 'similarDeviceStudies', label: 'Studies from Similar Devices', type: 'text' },
    { name: 'predicateData', label: 'Predicate Data', type: 'text' },
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
    setTimeout(() => {
      setCurrentStep('animalModel');
    }, 10000);
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
    <div className="min-h-screen bg-gray-100  dark:bg-[#202020] text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center">
      {currentStep === 'form' && (
        <div className="w-1/2 p-4 bg-white dark:bg-[#504f4a] rounded shadow">
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
                    className=" w-full text-[#edeef0] block  bg-[#282a2d] px-3 py-2 border border-[#504f4a] rounded-md  shadow-sm focus:outline-none sm:text-sm"

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
                    className="block w-full items-center dark:bg-[#202020] dark:text-[#ffff] scrollbar-hide dark:outline-none dark:rounded-md dark:border-[#504f4a] text-sm text-gray-600 border-b border-gray-300 py-4 px-10"
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              className="rounded-md border dark:border-[#2C2C2C] dark:bg-[#2C2C2C] bg-[#525252] text-white px-8 text-sm py-2 hover:bg-black transition duration-300  w-full md:w-auto"


            >
              Submit
            </button>
          </form>
        </div>
      )}

      {currentStep === 'loading' && (
        <div className="text-center ">
          <p className="text-xl mb-5 font-bold">{loadingText}</p>
          <div className="animate-spin block rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}

      {currentStep === 'animalModel' && (
        <div className="w-1/2 p-4  bg-[#282a2d] rounded shadow">
          <h2 className="text-xl font-bold mb-4">Animal Model Selection</h2>
          <p className="text-sm">
            Choose the appropriate animal model for testing (e.g., rodents, rabbits, pigs, sheep).
            This depends upon the predicate literature available and the relevant guidelines.
          </p>
          <button
            onClick={() => setCurrentStep('summary')}
            className="rounded-md mt-4 border dark:border-[#2C2C2C] dark:bg-[#202020] bg-[#525252] text-white px-8 text-sm py-2 hover:bg-black transition duration-300  w-full md:w-auto"
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
            className="rounded-md mt-4 border dark:border-[#2C2C2C] dark:bg-[#202020] bg-[#525252] text-white px-8 text-sm py-2 hover:bg-black transition duration-300  w-full md:w-auto"
          >
            Download Synopsis
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
