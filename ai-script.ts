// script.ts

// Function to handle adding new input fields
function addPiTerm() {
    const leftInputs = document.getElementById('left-inputs')!;
    const rightInputs = document.getElementById('right-inputs')!;
  
    const newLeftInput = document.createElement('div');
    newLeftInput.className = 'input-container';
    newLeftInput.innerHTML = `
      <input type="text" class="input-left" value="input text here" data-default="input text here">
      <span class="remove-input">x</span>
    `;
    leftInputs.appendChild(newLeftInput);
  
    const newRightInput = document.createElement('input');
    newRightInput.className = 'input-right';
    newRightInput.value = "becomes this";
    newRightInput.setAttribute('data-default', "becomes this");
    rightInputs.appendChild(newRightInput);
  
    updateRemovePiTermsButton();
  
    // Add event listeners for the new inputs and remove buttons
    newLeftInput.querySelector('.remove-input')!.addEventListener('click', removePiTerm);
    newLeftInput.querySelector('.input-left')!.addEventListener('focus', clearDefaultText);
    newRightInput.addEventListener('focus', clearDefaultText);
  }
  
  // Function to handle removing input fields
  function removePiTerm(this: HTMLElement) {
    const leftContainer = this.parentElement!;
    const index = Array.from(leftContainer.parentElement!.children).indexOf(leftContainer);
    
    leftContainer.remove();
    document.getElementById('right-inputs')!.children[index].remove();
  
    updateRemovePiTermsButton();
  }
  
  // Function to clear default text on focus
  function clearDefaultText(this: HTMLInputElement) {
    if (this.value === this.getAttribute('data-default')) {
      this.value = '';
    }
    this.removeEventListener('focus', clearDefaultText);
  }
  
  // Function to check and enable/disable the remove button
  function updateRemovePiTermsButton() {
    const leftInputs = document.querySelectorAll('.input-left');
    const rawQuery = document.getElementById('raw-query') as HTMLTextAreaElement;
  
    const canEnable = Array.from(leftInputs).length > 0 && rawQuery.value.length > 1 && rawQuery.value !== rawQuery.getAttribute('data-default');
    const removeButton = document.getElementById('remove-pi-terms') as HTMLButtonElement;
  
    removeButton.disabled = !canEnable;
  }
  
  // Function to handle raw query replacement
  function processPiTerms() {
    const leftInputs = document.querySelectorAll('.input-left');
    const rightInputs = document.querySelectorAll('.input-right');
    let rawQuery = (document.getElementById('raw-query') as HTMLTextAreaElement).value;
  
    leftInputs.forEach((leftInput, index) => {
      const searchTerm = (leftInput as HTMLInputElement).value;
      const replaceTerm = (rightInputs[index] as HTMLInputElement).value;
  
      if (searchTerm !== (leftInput as HTMLInputElement).getAttribute('data-default')) {
        rawQuery = rawQuery.replace(new RegExp(searchTerm, 'g'), replaceTerm);
      }
    });
  
    (document.getElementById('resolved-query') as HTMLTextAreaElement).value = rawQuery;
  }
  
  // Initializing event listeners
  document.getElementById('add-pi-term')!.addEventListener('click', addPiTerm);
  document.querySelectorAll('.remove-input').forEach(btn => btn.addEventListener('click', removePiTerm));
  document.querySelectorAll('.input-left').forEach(input => input.addEventListener('focus', clearDefaultText));
  document.querySelectorAll('.input-right').forEach(input => input.addEventListener('focus', clearDefaultText));
  document.getElementById('raw-query')!.addEventListener('focus', function() {
    if (this.value === this.getAttribute('data-default')) {
      this.value = '';
    }
    this.removeEventListener('focus', clearDefaultText);
  });
  document.getElementById('remove-pi-terms')!.addEventListener('click', processPiTerms);
  document.getElementById('raw-query')!.addEventListener('input', updateRemovePiTermsButton);
  