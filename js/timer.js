// задаем дату окончания таймера
const countDownDate = new Date("June 13, 2023 00:00:00").getTime();

// обновление таймера каждую секунду
setInterval(function() {

  // получаем текущую дату и время
  const now = new Date().getTime();

  // вычисляем разницу между текущим временем и датой окончания таймера
  const distance = countDownDate - now;

  // вычисляем дни, часы, минуты и секунды
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // выводим оставшееся время в таймер
  const timer = document.querySelector('.timer');
  timer.innerHTML = `До сессии осталось: ${days}d : ${hours}h: ${minutes}m: ${seconds}s`;

  // когда таймер заканчивается
  if (distance < 0) {
    clearInterval();
    timer.innerHTML = "СЕССИЯ НАЧАЛАСЬ!";
  }
}, 1000);


