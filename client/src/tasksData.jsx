const tasks = [
    {
      id: 1,
      text: 'Assignment of study',
      duration: 'Varies',
      subTasks: [
        { id: '1.1', text: 'Checklist', details: '' },
        { id: '1.2', text: 'Device description', details: '' },
        { id: '1.3', text: 'Material composition of the test device', details: '' },
        { id: '1.4', text: 'Indication for use', details: '' },
        { id: '1.5', text: 'Available size matrix', details: '' },
        { id: '1.6', text: 'Class of the device', details: '' },
        { id: '1.7', text: 'Previous studies, if available', details: '' },
        { id: '1.8', text: 'Studies from similar devices, if available', details: '' },
        { id: '1.9', text: 'Predicate data, if available', details: '' },
        { id: '1.10', text: 'Type of study (Feasibility, GLP and non-GLP)', details: '' },
      ],
    },
    {
      id: 2,
      text: 'Study planning',
      duration: 'Varies',
      subTasks: [
        { id: '2.1', text: 'Standards  - Drug eluting Devices (DES) ISO 25539Refer 25539-2:2020 Clause 8.6 Preclinical in vivo evaluation to derive the objective of the study, protocol consideration and report consideration ', details: '' },
      ],
    },
    {
      id: null,
      text: null,
      duration: '1 day',
      subTasks: [
        { id: 'nan.1', text: 'Standards - Drug eluting Devices (DES) ISO 25539', details: '' },
        { id: 'nan.2', text: 'Refer 25539-2:2020 Clause 8.6 Preclinical in vivo evaluation to derive the objective of the study, protocol consideration and report consideration', details: '' },
      ],
    },
  ];
export  default tasks  