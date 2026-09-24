export const handleUploadSubmit = function (handler, formElement) {
  if (!handler || typeof handler !== 'function') return false;
  if (!formElement || typeof formElement !== 'object') return false;

  formElement.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries([...formData]);
    handler(data);
  });

  return true;
};
