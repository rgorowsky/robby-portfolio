// script.js

// Function to initialize the input fields and button actions
function init() {
  const addPiTermButton = document.getElementById('add-pi-term');
  const removePiTermsButton = document.getElementById('remove-pi-terms');
  const leftInputsContainer = document.getElementById('left-inputs');
  const rightInputsContainer = document.getElementById('right-inputs');
  const rawQueryInput = document.getElementById('raw-query');
  const resolvedQueryInput = document.getElementById('resolved-query');

  // Attach click event to the "Add Another Pi Term" button
  addPiTermButton.addEventListener('click', () => addPiTerm(leftInputsContainer, rightInputsContainer));

  // Attach initial event listeners for removing inputs and managing input focus
  setupRemoveButtons(leftInputsContainer);
  setupInputFocus(leftInputsContainer, rightInputsContainer);
  setupInputFocusForTextArea(rawQueryInput);

  // Enable or disable the "Remove Pi Terms" button based on the criteria
  rawQueryInput.addEventListener('input', () => toggleRemovePiTermsButton(removePiTermsButton, leftInputsContainer, rawQueryInput));

  // Attach click event to the "Remove Pi Terms" button
  removePiTermsButton.addEventListener('click', () => removePiTerms(leftInputsContainer, rightInputsContainer, rawQueryInput, resolvedQueryInput));
}

// Function to add a new pair of input fields
function addPiTerm(leftContainer, rightContainer) {
  // Create new input for the left panel
  const newLeftInputContainer = document.createElement('div');
  newLeftInputContainer.className = 'input-container';
  const newLeftInput = document.createElement('input');
  newLeftInput.type = 'text';
  newLeftInput.className = 'input-left';
  newLeftInput.value = 'input text here';
  newLeftInput.dataset.default = 'input text here';
  newLeftInputContainer.appendChild(newLeftInput);

  // Create the remove button 'x' for the left panel
  const removeButton = document.createElement('span');
  removeButton.className = 'remove-input';
  removeButton.textContent = 'x';
  removeButton.addEventListener('click', () => removeInput(newLeftInputContainer, rightContainer));
  newLeftInputContainer.appendChild(removeButton);

  // Append the new input container to the left panel
  leftContainer.appendChild(newLeftInputContainer);

  // Create new input for the right panel
  const newRightInput = document.createElement('input');
  newRightInput.type = 'text';
  newRightInput.className = 'input-right';
  newRightInput.value = 'becomes this';
  newRightInput.dataset.default = 'becomes this';

  // Append the new input to the right panel
  rightContainer.appendChild(newRightInput);

  // Re-setup focus and remove button events
  setupInputFocus(leftContainer, rightContainer);
  setupRemoveButtons(leftContainer);
}

// Function to set up focus behavior for input fields
function setupInputFocus(leftContainer, rightContainer) {
  Array.from(leftContainer.querySelectorAll('.input-left')).forEach((input, index) => {
    input.addEventListener('focus', () => {
      if (input.value === input.dataset.default) {
        input.select();
      }
    });
    input.addEventListener('input', () => {
      if (input.dataset.default) {
        input.dataset.default = '';
      }
      rightContainer.children[index].removeAttribute('value');
    });
  });

  Array.from(rightContainer.querySelectorAll('.input-right')).forEach((input) => {
    input.addEventListener('focus', () => {
      if (input.value === input.dataset.default) {
        input.select();
      }
    });
    input.addEventListener('input', () => {
      if (input.dataset.default) {
        input.dataset.default = '';
      }
    });
  });
}

// Function to set up focus behavior for the large textarea
function setupInputFocusForTextArea(textArea) {
  textArea.addEventListener('focus', () => {
    if (textArea.value === textArea.dataset.default) {
      textArea.select();
    }
  });
  textArea.addEventListener('input', () => {
    if (textArea.dataset.default) {
      textArea.dataset.default = '';
    }
  });
}

// Function to set up remove button actions
function setupRemoveButtons(leftContainer) {
  Array.from(leftContainer.querySelectorAll('.remove-input')).forEach((button, index) => {
    button.addEventListener('click', () => {
      removeInput(button.parentElement, leftContainer);
    });
  });
}

// Function to remove an input field
function removeInput(leftInputContainer, rightContainer) {
  const index = Array.from(leftInputContainer.parentElement.children).indexOf(leftInputContainer);
  leftInputContainer.remove(); // Remove the left input container
  if (index !== -1) {
    rightContainer.children[index].remove(); // Remove the corresponding right input
  }
  // Update the "Remove Pi Terms" button state
  const removePiTermsButton = document.getElementById('remove-pi-terms');
  const rawQueryInput = document.getElementById('raw-query');
  toggleRemovePiTermsButton
