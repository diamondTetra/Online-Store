window.addEventListener('DOMContentLoaded', () => {
    const clientsParagraph = document.getElementById('clients');
    const displayButton = document.getElementById('displayButton');
  
    displayButton.addEventListener('click', () => {
      fetch('data/clients.txt')
        .then(response => response.text())
        .then(data => {
          clientsParagraph.innerHTML = ''; // Clear the existing content
  
          const lines = data.split('\n');
          lines.forEach(line => {
            const [name, age] = line.split(',');
  
            const clientSpan = document.createElement('span');
            clientSpan.textContent = `${name.trim()} - ${age.trim()} years old`;
  
            clientsParagraph.appendChild(clientSpan);
            clientsParagraph.appendChild(document.createElement('br'));
          });
        })
        .catch(error => console.log('Error:', error));
    });
  });
  