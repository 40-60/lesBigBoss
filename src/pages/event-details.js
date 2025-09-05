require("../animations/steps-reveal.js")();
require("../animations/accordion-steps.js")();
require("../animations/custom-cursor.js")();
require("../animations/line-highlight.js")();
require("../animations/images-parallax.js")();
require("../animations/program.js")();

// Select all elements with the 'event-date' attribute
const eventDateElements = document.querySelectorAll("[event-date]");
const eventDay = document.getElementById("event_day");
const eventHour = document.getElementById("event_hour");
const eventMin = document.getElementById("event_min");

if (!eventDateElements.length || !eventDay || !eventHour || !eventMin) return;

// Use the first event-date element for countdown reference
const rawDate = eventDateElements[0].textContent.trim(); // Ex: "11/1/2025"
let [day, month, year] = rawDate.split("/").map(Number);
// Corrige l'année sur 2 chiffres : 25 => 2025, 24 => 2024, etc.
if (year < 100) {
  year += 2000;
}
const eventDate = new Date(year, month - 1, day);

// Formaté : Samedi 11 janvier 2025
const jours = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];
const mois = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

const jourNom = jours[eventDate.getDay()];
const moisNom = mois[eventDate.getMonth()];
const jour = eventDate.getDate();
const annee = eventDate.getFullYear();

// Set formatted date to all elements with 'event-date' attribute
const formattedDate = `${jourNom} ${jour} ${moisNom} ${annee}`;
eventDateElements.forEach((el) => {
  el.textContent = formattedDate;
});

// Fonction de mise à jour du compte à rebours
function updateCountdown() {
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    eventDay.textContent = "0";
    eventHour.textContent = "0";
    eventMin.textContent = "0";
    return;
  }

  const totalMinutes = Math.floor(diff / 60000); // 1000*60
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  eventDay.textContent = days;
  eventHour.textContent = hours;
  eventMin.textContent = minutes;
}

updateCountdown();
setInterval(updateCountdown, 60000); // Mise à jour toutes les minutes
