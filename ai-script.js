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
      if (rightContainer.children[index]) {
        rightContainer.children[index].value = ''; // Remove default value when typing
      }
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
  Array.from(leftContainer.querySelectorAll('.remove-input')).forEach((button) => {
    button.addEventListener('click', () => {
      removeInput(button.parentElement, leftContainer);
    });
  });
}

// Function to remove an input field
function removeInput(leftInputContainer, rightContainer) {
  const index = Array.from(leftInputContainer.parentElement.children).indexOf(leftInputContainer);
  leftInputContainer.remove(); // Remove the left input container
  if (index !== -1 && rightContainer.children[index]) {
    rightContainer.children[index].remove(); // Remove the corresponding right input
  }
  // Update the "Remove Pi Terms" button state
  const removePiTermsButton = document.getElementById('remove-pi-terms');
  const rawQueryInput = document.getElementById('raw-query');
  toggleRemovePiTermsButton(removePiTermsButton, leftContainer.parentElement, rawQueryInput);
}

// Function to toggle the "Remove Pi Terms" button state
function toggleRemovePiTermsButton(button, leftContainer, rawQueryInput) {
  const hasTextInputs = leftContainer.querySelectorAll('.input-left').length > 0;
  const rawQueryHasText = rawQueryInput.value.length > 2 && rawQueryInput.value !== rawQueryInput.dataset.default;
  button.disabled = !(hasTextInputs && rawQueryHasText);
}

// Function to handle "Remove Pi Terms" action
function removePiTerms(leftContainer, rightContainer, rawQueryInput, resolvedQueryInput) {
  if (rawQueryInput.value.length <= 2) return;

  const leftInputs = leftContainer.querySelectorAll('.input-left');
  const rightInputs = rightContainer.querySelectorAll('.input-right');

  let query = rawQueryInput.value;

  leftInputs.forEach((leftInput, index) => {
    const searchTerm = leftInput.value;
    const replaceTerm = rightInputs[index].value;
    if (searchTerm && replaceTerm) {
      query = query.replace(new RegExp(searchTerm, 'g'), replaceTerm);
    }
  });

  resolvedQueryInput.value = query;
}

// Initialize the application
window.addEventListener('DOMContentLoaded', init);
