export const exportData = (gigs, jobs) => {
  const data = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    gigs,
    jobs,
  };

  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `cyberdeck-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importData = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // Validate data structure
        if (!data.gigs || !data.jobs || !Array.isArray(data.gigs) || !Array.isArray(data.jobs)) {
          throw new Error('Invalid backup file format');
        }
        
        resolve(data);
      } catch (error) {
        reject(new Error('Failed to parse backup file: ' + error.message));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

