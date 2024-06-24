document.addEventListener('DOMContentLoaded', init);

function init() {
    const addPiTermButton = document.getElementById('add-pi-term');
    const removePiTermsButton = document.getElementById('remove-pi-terms');
    const inputPairsContainer = document.getElementById('input-pairs');
    const rawQueryInput = document.getElementById('raw-query');
    const resolvedQueryInput = document.getElementById('resolved-query');

    // Attach click event to the "Add Another Pi Term" button
    addPiTermButton.addEventListener('click', () => addPiTerm(inputPairsContainer));

    // Attach initial event listeners for removing inputs and managing input focus
    setupRemoveButtons(inputPairsContainer);
    setupInputFocus(inputPairsContainer);
    setupInputFocusForTextArea(rawQueryInput);

    // Make sure the "Remove Pi Terms" button is always enabled
    removePiTermsButton.disabled = false;

    // Attach click event to the "Remove Pi Terms" button
    removePiTermsButton.addEventListener('click', () => removePiTerms(inputPairsContainer, rawQueryInput, resolvedQueryInput));
}

// Function to add a new pair of input fields
function addPiTerm(container) {
    // Create a new input row
    const newInputRow = document.createElement('div');
    newInputRow.className = 'input-row';

    // Create the input group for the left panel
    const newLeftInputGroup = document.createElement('div');
    newLeftInputGroup.className = 'input-group';

    // Create new input for the left panel
    const newLeftInput = document.createElement('input');
    newLeftInput.type = 'text';
    newLeftInput.className = 'input-left';
    newLeftInput.value = 'What needs to disappear';
    newLeftInput.dataset.default = 'What needs to disappear';
    newLeftInputGroup.appendChild(newLeftInput);

    // Create the remove button 'x' for the left panel
    const removeButton = document.createElement('span');
    removeButton.className = 'remove-input';
    removeButton.textContent = 'x';
    removeButton.addEventListener('click', () => removeInputRow(newInputRow));
    newLeftInputGroup.appendChild(removeButton);

    // Append the new input group to the left side of the row
    newInputRow.appendChild(newLeftInputGroup);

    // Create new input for the right panel
    const newRightInput = document.createElement('input');
    newRightInput.type = 'text';
    newRightInput.className = 'input-right';
    newRightInput.value = 'How to obfuscate';
    newRightInput.dataset.default = 'How to obfuscate';

    // Append the new input to the right side of the row
    newInputRow.appendChild(newRightInput);

    // Append the new input row to the container
    container.appendChild(newInputRow);

    // Re-setup focus events for new inputs
    setupInputFocusForInput(newLeftInput);
    setupInputFocusForInput(newRightInput);

    // The "Remove Pi Terms" button is now always enabled, so no need to update its state
}

// Function to set up focus behavior for input fields in the entire container
function setupInputFocus(container) {
    Array.from(container.querySelectorAll('.input-left, .input-right')).forEach(input => {
        setupInputFocusForInput(input);
    });
}

// Function to set up focus behavior for a single input field
function setupInputFocusForInput(input) {
    input.addEventListener('focus', () => {
        if (input.value === input.dataset.default) {
            input.select();
        }
    });
    input.addEventListener('input', () => {
        if (input.value !== input.dataset.default) {
            input.dataset.default = '';
        }
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
        if (textArea.value !== textArea.dataset.default) {
            textArea.dataset.default = '';
        }
        // The "Remove Pi Terms" button is now always enabled, so no need to update its state
    });
}

// Function to set up remove button actions for the entire container
function setupRemoveButtons(container) {
    Array.from(container.querySelectorAll('.remove-input')).forEach(button => {
        const inputRow = button.parentElement.parentElement;
        button.addEventListener('click', () => removeInputRow(inputRow));
    });
}

// Function to remove an input row
function removeInputRow(row) {
    row.remove();
    // The "Remove Pi Terms" button is now always enabled, so no need to update its state
}

// Function to replace PI terms in the raw query and display the resolved query
function removePiTerms(container, queryInput, resolvedOutput) {
    let resolvedQuery = queryInput.value;
    const inputPairs = container.querySelectorAll('.input-row');

    inputPairs.forEach(pair => {
        const leftInput = pair.querySelector('.input-left');
        const rightInput = pair.querySelector('.input-right');

        if (leftInput && rightInput && leftInput.value !== '' && rightInput.value !== '') {
            const termToReplace = new RegExp(leftInput.value, 'g');
            resolvedQuery = resolvedQuery.replace(termToReplace, rightInput.value);
        }
    });

    resolvedOutput.value = resolvedQuery;
}
