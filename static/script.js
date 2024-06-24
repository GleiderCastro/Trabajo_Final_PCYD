document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('upload-form');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const fileInput = document.querySelector('input[type="file"]');
        const clustersInput = document.getElementById('clusters');
        const iterationsInput = document.getElementById('iterations');

        if (fileInput.files.length === 0) {
            showMessage('Por favor, selecciona un archivo.', 'error');
            return;
        }

        formData.append('csvfile', fileInput.files[0]);
        formData.append('clusters', clustersInput.value);
        formData.append('iterations', iterationsInput.value);
        showMessage('Subiendo archivo...', 'info');

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const url = window.URL.createObjectURL(await response.blob());
                const a = document.createElement('a');
                a.href = url;
                a.download = 'resultados.csv';
                document.body.appendChild(a);
                a.click();
                a.remove();
                showMessage('Archivo procesado exitosamente. Descargando resultados...', 'success');
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            showMessage(`Error: ${error.message}`, 'error');
        }
    });

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = '';
        messageDiv.classList.add(type);
    }
});
