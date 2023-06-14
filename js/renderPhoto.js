const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const renderPhoto = (fileChoose, callback) => {
  fileChoose.addEventListener('change', () => {
    const file = fileChoose.files[0];
    const fileType = file.type;

    const matches = FILE_TYPES.some((it) => fileType.endsWith(it))

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const result = reader.result;
        callback(result);
      });

      reader.readAsDataURL(file);
    }
  });
}

export { renderPhoto };

