import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
let formData = {};

recoveryFormItems('email');
recoveryFormItems('message');

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  formData[e.target.name] = e.target.value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  if (
    !Object.keys(formData).length ||
    form.email.value.trim() === '' ||
    form.message.value.trim() === ''
  ) {
    return alert('Please, fill in all fields');
  }

  console.log(formData);

  form.reset();
  formData = {};
  localStorage.removeItem(STORAGE_KEY);
}

function recoveryFormItems(nameItem) {
  if (!localStorage.getItem(STORAGE_KEY)) {
    return;
  }

  const parsedValue =
    JSON.parse(localStorage.getItem(STORAGE_KEY))[nameItem] ?? '';

  formData[nameItem] = parsedValue;
  form[nameItem].value = parsedValue;
}
