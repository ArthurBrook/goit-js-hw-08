import _throttle from 'lodash.throttle';

const refs = {
  formEl: document.querySelector('.feedback-form'),
  inputEl: document.querySelector('input[name="email"]'),
  textAreaEl: document.querySelector('textarea[name="message"]'),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';

populateFormFieldsFromStorage();

refs.formEl.addEventListener('input', _throttle(updateFormData, 500));
refs.formEl.addEventListener('submit', submitFormHandler);

let feedbackData = {};

function updateFormData(evt) {
  const { name, value } = evt.target;
  if (feedbackData[name] !== value) {
    feedbackData[name] = value;
    // console.log(feedbackData); // Видалив console.log
  }
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(feedbackData));
}

function populateFormFieldsFromStorage() {
  const persistedData = localStorage.getItem(LOCALSTORAGE_KEY);
  const parsePersistedData = JSON.parse(persistedData);

  if (!persistedData) return;
  refs.inputEl.value = parsePersistedData.email || '';
  refs.textAreaEl.value = parsePersistedData.message || '';
}

function submitFormHandler(evt) {
  evt.preventDefault();
  const formDataObj = {};
  const formData = new FormData(refs.formEl);

  // const email1 = evt;
  // console.log(email1); // Видалив console.log

  formData.forEach((value, key) => {
    // console.log(key, value); // Видалив console.log
    formDataObj[key] = value;
  });

  console.log('Дані з форми:', formDataObj);
  refs.formEl.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
